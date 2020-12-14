using System;
using Microsoft.Extensions.Configuration;

namespace NAP.SLI.Common.Services
{
    public interface IAppSettings
    {
        string Environment { get; }

        string SentryDsn { get; }

        string SentryDefaultCategory { get; }

        string AppDataPath { get; }
    }

    public class AppSettings : IAppSettings
    {
        private readonly IConfiguration configuration;

        public AppSettings(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string Environment => configuration.GetValue<string>("Environment");

        public string SentryDsn => configuration.GetValue<string>("Sentry:Dsn");

        public string SentryDefaultCategory => configuration.GetValue<string>("Sentry:DefaultCategory");

        public string AppDataPath => AppDomain.CurrentDomain.GetData("DataDirectory").ToString();
    }
}