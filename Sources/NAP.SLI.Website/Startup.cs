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
    using NAP.SLI.Account.Models;
    using NAP.SLI.Common.Extensions;
    using NAP.SLI.Common.Services;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;
    using Sentry;
    using NAP.UM.Models;
    using Microsoft.AspNetCore.StaticFiles;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc.Authorization;
    using NAP.SLI.Common.Models;
    using NAP.UM.Web;
    using NAP.SLI.Localization.Extensions;
    using Microsoft.AspNetCore.Localization;
    using ONEbook.SpreadSheets.NPOI;
    using NAP.SLI.WinLossDetail.Controllers;
    using NAP.SLI.WinLossAnalysis.Controllers;
    using Fanex.RemotingRef;
    using NAP.SLI.Account;
    using NAP.SLI.Customer;
    using NAP.SimpleApi;
    using NAP.UM;
    using NAP.SLI.WinLossAnalysis.Extensions;
    using NAP.SLI.WinLossDetail.Extensions;
    using NAP.SLI.MatchWinLossDetail.Controllers;
    using NAP.SLI.MatchWinLossDetail.Extensions;
    using NAP.SLI.WinLossByBetType.Controllers;
    using NAP.SLI.WinLossByBetType.Extensions;
    using NAP.SLI.BetList.Controller;
    using NAP.SLI.BetList.Extensions;
    using Fanex.Logging.RabbitMQ;
    using NAP.SLI.Results.Extensions;
    using NAP.SLI.Results.Controllers;
    using Fanex.NAP.Client;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Fanex.NAP.Client.AspNetCore.Configuration;
    using Fanex.NAP.Client.AspNetCore.Session;
    using NAP.SLI.UserManagement.Controllers;

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
                .SetDefaultLogCategory(AppSettings.DefaultCategory)
                .Use(new List<ILogEngine>
                {
                    new RabbitMQLogging(AppSettings.RabbitMQConnectionString),
                    new SentryLogging(new SentryEngineOptions
                    {
                        Dsn = new Dsn(AppSettings.SentryDsn),
                        FrontEndDsn = new Dsn(AppSettings.FrontEndSentryDsn)
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
            services.AddRedisCache(Configuration.GetSection("Fanex.Caching:Redis"));

            RefDataTypeContainer
                    .ConnectTo(new Uri(Configuration["Fanex.RemotingRef.Service.Url"]))
                    .FromApplication("NAP.SLI");

            services.AddSingleton<IRemotingRefService, RemotingRefService>();
            services.AddSingleton<ISecurityService, SecurityService>();
            services.AddSingleton<IUserService, UserService>();
            services.AddSingleton<INapSettings>(new NapSettings(Configuration));
            services.AddSingleton<INapSession, NapSession>();

            services
                .AddControllersWithViews(config =>
                {
                    config.Filters.Add(new UMFilterAttribute());
                    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                    config.Filters.Add(new AuthorizeFilter(policy));
                })
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                });

            var authenticationSection = Configuration.GetSection("Authentication");
            services.Configure<AuthenticationSettings>(authenticationSection);
            var authenticationSettings = authenticationSection.Get<AuthenticationSettings>();
            AddJwtAuthentication(services, authenticationSettings);

            services.AddAuthorization(config =>
            {
                config.AddPolicy(AuthorizationPolicies.Admin, AuthorizationPolicies.AdminPolicy);
            });

            var umConfigOption = Configuration.GetSection("UM");
            services.Configure<UMConfig>(umConfigOption);
            var umConfig = umConfigOption.Get<UMConfig>();
            services.AddUM(umConfig);

            services.AddOptions();
            services.AddLocalization();

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

            app.UseExceptionHandler("/error");
            if (!env.IsDevelopment())
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseRequestLocalization(option =>
            {
                option.DefaultRequestCulture = new RequestCulture("en-US");
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            var contentTypeProvider = new FileExtensionContentTypeProvider();
            if (AppSettings.Environment == Common.Models.Environments.PROD)
            {
                contentTypeProvider.Mappings.Remove(".map");
            }

            app.UseSpaStaticFiles(new StaticFileOptions
            {
                ContentTypeProvider = contentTypeProvider
            });

            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();
            NapClientManager
                .UseConfig(app.ApplicationServices.GetService<INapSettings>())
                .UseSession(app.ApplicationServices.GetService<INapSession>());

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

        private static void AddJwtAuthentication(IServiceCollection services, AuthenticationSettings authenticationSettings)
        {
            var secretKey = Encoding.ASCII.GetBytes(authenticationSettings.SecretKey);
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
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
            services.AddHttpContextAccessor()
                .AddSingleton<IDynamicRepository, DynamicRepository>()
                .AddSingleton<INpoiWorkbookFactory, NpoiWorkbookFactory>()
                .AddLocalizationModule()
                .AddCommonModule(AppSettings)
                .AddAccountModule()
                .AddCustomerModule()
                .AddMatchWinLossDetailModule()
                .AddWinLossDetailModule()
                .AddWinLossAnalysisModule()
                .AddWinLossByBetTypeModule()
                .AddBetListModule()
                .AddResultsModule();
        }

        private static void AddAutoMapper(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Common.AutoMapperProfile));
            services.AddAutoMapper(typeof(Account.AutoMapperProfile));
            services.AddAutoMapper(typeof(WinLossDetail.AutoMapperProfile));
            services.AddAutoMapper(typeof(WinLossAnalysis.AutoMapperProfile));
            services.AddAutoMapper(typeof(WinLossByBetType.AutoMapperProfile));
            services.AddAutoMapper(typeof(MatchWinLossDetail.AutoMapperProfile));
        }

        private static void AddSimpleApi(IServiceCollection services)
        {
            services.AddSimpleApi(typeof(Account.SimpleApiProfile));
            services.AddSimpleApi(typeof(Customer.SimpleApiProfile));
            services.AddSimpleApi(typeof(CustomerSetting.SimpleApiProfile));
        }

        private static void AddMediatR(IServiceCollection services)
        {
            services.AddMediatR(typeof(Account.SimpleApiProfile));
            services.AddMediatR(typeof(Customer.SimpleApiProfile));
            services.AddMediatR(typeof(WinLossDetailController));
            services.AddMediatR(typeof(WinLossAnalysisController));
            services.AddMediatR(typeof(MatchWinLossDetailController));
            services.AddMediatR(typeof(WinLossByBetTypeController));
            services.AddMediatR(typeof(BetListController));
            services.AddMediatR(typeof(ResultsController));
            services.AddMediatR(typeof(UserManagementController));
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
