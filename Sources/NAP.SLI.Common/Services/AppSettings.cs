using System;
using Microsoft.Extensions.Configuration;
using NAP.SLI.Common.Models;

namespace NAP.SLI.Common.Services
{
    public interface IAppSettings
    {
        string Environment { get; }

        string DefaultCategory { get; }

        string SentryDsn { get; }

        string FrontEndSentryDsn { get; }

        string RabbitMQConnectionString { get; }

        string AppDataPath { get; }

        string BetListApiUrl { get; }

        ResultsAPI ResultsConfigs { get; }
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

        public string FrontEndSentryDsn => configuration.GetValue<string>("Fanex.Logging:FrontEndSentryDsn");

        public string RabbitMQConnectionString => configuration.GetValue<string>("Fanex.Logging:RabbitMQConnectionString");

        public string BetListApiUrl => configuration.GetValue<string>("BetListAPI:URL");

        public ResultsAPI ResultsConfigs => configuration.GetSection("ResultsAPI").Get<ResultsAPI>();

        public string AppDataPath => AppDomain.CurrentDomain.GetData("DataDirectory").ToString();
    }
}