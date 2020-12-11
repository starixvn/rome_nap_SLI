namespace NAP.SLI.Website
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using AutoMapper;
    using Fanex.Caching.Redis;
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
    using NAP.SimpleApi.Extensions;
    using NAP.SLI.Account.Extensions;
    using NAP.SLI.Account.Models;
    using NAP.SLI.Common.Extensions;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Customer.Extensions;
    using NAP.SLI.Report.Extensions;
    using NAP.SLI.Report.Controllers;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;
    using ONEbook.UM.AspNetCore;
    using ONEbook.UM.Configurations;
    using ONEbook.UM.Helpers;
    using ONEbook.UM.Services;
    using ONEbook.UM.Transport;
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

            Fanex.Caching.Memory.MemoryCacheServiceCollectionExtensions.AddMemoryCache(services, Configuration.GetSection("Fanex.Caching"));
            services.AddRedisCache(Configuration.GetSection("Fanex.Caching.Redis"));

            services.AddControllersWithViews().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });

            var authenticationSection = Configuration.GetSection("Authentication");
            services.Configure<AuthenticationSettings>(authenticationSection);
            var authenticationSettings = authenticationSection.Get<AuthenticationSettings>();
            AddJwtAuthentication(services, authenticationSettings);

            services.AddOptions();

            AddModules(services);
            AddAutoMapper(services);
            AddSimpleApi(services);
            AddMediatR(services);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            logger.LogInformation("Application started");
            AppDomain.CurrentDomain.SetData("DataDirectory", Path.Combine(env.ContentRootPath, "App_Data"));
            UseFanexDataWithSqlServer();

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

        private void AddJwtAuthentication(IServiceCollection services, AuthenticationSettings authenticationSettings)
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

        private void AddModules(IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddSingleton(new UMClientConfiguration().Initialize(Configuration));
            services.AddSingleton<IUMCacheService, UMCacheService>();
            services.AddSingleton<IUMRestClient, UMRestClient>();
            services.AddSingleton<IMaintenanceService, MaintenanceService>();
            services.AddSingleton<IHttpContextHelper, HttpContextHelper>();
            services.AddSingleton<IDynamicRepository, DynamicRepository>();
            services.AddCommonModule(AppSettings);
            services.AddAccountModule();
            services.AddCustomerModule();
            services.AddReportModule();
        }

        private void AddAutoMapper(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Account.Models.AutoMapperProfile));
        }

        private void AddSimpleApi(IServiceCollection services)
        {
            services.AddSimpleApi(typeof(Account.Models.SimpleApiProfile));
            services.AddSimpleApi(typeof(Customer.Models.SimpleApiProfile));
            services.AddSimpleApi(typeof(UserManagement.Models.SimpleApiProfile));
        }

        private void AddMediatR(IServiceCollection services)
        {
            services.AddMediatR(typeof(Account.Models.SimpleApiProfile));
            services.AddMediatR(typeof(Customer.Models.SimpleApiProfile));
            services.AddMediatR(typeof(WinLossDetailController));
        }

        private void UseFanexDataWithSqlServer()
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
