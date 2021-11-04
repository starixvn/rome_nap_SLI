using System;
using Microsoft.Extensions.Configuration;

namespace NAP.SLI.Common.Services
{
    public interface IAppSettings
    {
        string Environment { get; }

        string DefaultCategory { get; }

        string SentryDsn { get; }

        string RabbitMQConnectionString { get; }

        string AppDataPath { get; }

        string BetListApiUrl { get; }
    }

    public class AppSettings : IAppSettings
    {
        private readonly IConfiguration configuration;

        public AppSettings(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string Environment => configuration.GetValue<string>("Environment");

        public string DefaultCategory => configuration.GetValue<string>("Fanex.Logging:DefaultCategory");

        public string SentryDsn => configuration.GetValue<string>("Fanex.Logging:SentryDsn");

        public string RabbitMQConnectionString => configuration.GetValue<string>("Fanex.Logging:RabbitMQConnectionString");

        public string BetListApiUrl => configuration.GetValue<string>("BetListAPI:URL");

        public string AppDataPath => AppDomain.CurrentDomain.GetData("DataDirectory").ToString();
    }
}