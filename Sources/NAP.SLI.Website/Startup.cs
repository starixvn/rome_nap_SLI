namespace NAP.SLI.Website
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using AutoMapper;
    using Fanex.Data;
    using Fanex.Data.Repository;
    using Fanex.Data.SqlServer;
    using Fanex.Logging;
    using Fanex.Logging.Extensions;
    using Fanex.Logging.Extensions.AspNetCore;
    using Fanex.Logging.Extensions.Database;
    using Fanex.Logging.Sentry;
    using MediatR;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using Microsoft.IdentityModel.Tokens;
    using NAP.SimpleApi;
    using NAP.SLI.Account;
    using NAP.SLI.Account.Models;
    using NAP.SLI.Common;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Customer;
    using NAP.SLI.Report;
    using NAP.SLI.Report.Controllers;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;
    using Sentry;

    public class Startup
    {
        public IConfiguration Configuration { get; }

        public IAppSettings AppSettings { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            AppSettings = new AppSettings(configuration);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            LogManager
                .SetDefaultLogCategory("NAP.SLI")
                .Use(new List<ILogEngine>
                {
                    new SentryLogging(new SentryEngineOptions
                    {
                        Dsn = new Dsn(AppSettings.SentryDsn)
                    })
                });

            ExceptionHandler
                .UseConfig(new LoggingConfiguration().HideSensitiveInfo(
                    new List<string>
                    {
                        "(?:password=)(?<paramValue>[^&|^\\s]+)",
                        "(\"password\":)(?<paramValue>[^,|^\r]+)"
                    })
                .GetHttpHeaderInfo()
                .GetHttpSessionInfo())
                .UseGetDbExceptionInfo(DatabaseInfoGetters.GetDbExceptionInfo);

            services.AddControllersWithViews().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });

            var authenticationSection = Configuration.GetSection("Authentication");
            services.Configure<AuthenticationSettings>(authenticationSection);
            var authenticationSettings = authenticationSection.Get<AuthenticationSettings>();
            ConfigureAuthentication(services, authenticationSettings);

            services.AddOptions();

            ConfigureModules(services);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            logger.LogInformation("Application started");
            AppDomain.CurrentDomain.SetData("DataDirectory", Path.Combine(env.ContentRootPath, "App_Data"));
            ConfigureFanexData();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }

        private void ConfigureAuthentication(IServiceCollection services, AuthenticationSettings authenticationSettings)
        {
            var secretKey = Encoding.ASCII.GetBytes(authenticationSettings.SecretKey);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(secretKey),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }

        private void ConfigureModules(IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddSingleton<IAppSettings>(AppSettings);
            services.AddSingleton<IDynamicRepository, DynamicRepository>();

            services.RegisterCommonModule();

            services.RegisterAccountModule();
            services.AddMediatR(typeof(Account.SimpleApiProfile));
            services.AddSimpleApi(typeof(Account.SimpleApiProfile));
            services.AddAutoMapper(typeof(Account.AutoMapperProfile));

            services.RegisterCustomerModule();
            services.AddMediatR(typeof(Customer.SimpleApiProfile));
            services.AddSimpleApi(typeof(Customer.SimpleApiProfile));

            services.AddSimpleApi(typeof(UserManagement.SimpleApiProfile));

            services.RegisterReportModule();
            services.AddMediatR(typeof(WinLossDetailController));
        }

        private void ConfigureFanexData()
        {
            var connectionStrings = Configuration
                 .GetSection("ConnectionStrings")
                 .GetChildren()
                 .ToDictionary(connection => connection.Key,
                               connection => new ConnectionConfiguration(connection.Key, connection.Value));
            DbSettingProviderManager
              .StartNewSession()
              .WithSqlServer(resourcePath: Path.Combine(AppSettings.AppDataPath, "SPNames", AppSettings.Environment))
              .Use(connectionStrings)
              .Run();
        }
    }
}
