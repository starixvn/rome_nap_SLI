namespace NAP.SLI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(options =>
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

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        private void ConfigureModules(IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IDynamicRepository, DynamicRepository>();
            services.RegisterCommonModule();
            services.RegisterAccountModule();
            services.AddSimpleApi(typeof(Account.SimpleApiProfile));
            services.AddMediatR(typeof(Account.AutoMapperProfile));
            services.AddAutoMapper(typeof(Account.AutoMapperProfile));
            services.AddSimpleApi(typeof(UserManagement.SimpleApiProfile));
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

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
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
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
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

        private void ConfigureFanexData()
        {
            var connectionStrings = Configuration
                 .GetSection("ConnectionStrings")
                 .GetChildren()
                 .ToDictionary(connection => connection.Key,
                               connection => new ConnectionConfiguration(connection.Key, connection.Value));
            var appDataPath = AppDomain.CurrentDomain.GetData("DataDirectory").ToString();
            DbSettingProviderManager
              .StartNewSession()
              .WithSqlServer(resourcePath: Path.Combine(appDataPath, "SPNames"))
              .Use(connectionStrings)
              .Run();
        }
    }
}
