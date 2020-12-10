using Microsoft.Extensions.Configuration;

namespace NAP.SLI.Common.Services
{
    public interface IAppSettings
    {
        string Environment { get; }
    }

    public class AppSettings : IAppSettings
    {
        private readonly IConfiguration configuration;

        public AppSettings(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string Environment => configuration.GetValue<string>("Environment");
    }
}