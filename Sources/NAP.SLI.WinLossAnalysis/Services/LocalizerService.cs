using Microsoft.Extensions.Localization;

namespace NAP.SLI.WinLossAnalysis.Services
{
    public interface ILocalizeService
    {
        string Localize(string name);
    }

    public class LocalizeService : ILocalizeService
    {
        private readonly IStringLocalizer stringLocalizer;
        private readonly string reportName;

        public LocalizeService(IStringLocalizer stringLocalizer, string reportName)
        {
            this.stringLocalizer = stringLocalizer;
            this.reportName = reportName;
        }

        public string Localize(string name)
        {
            return name == "ReportTypeName" ? reportName : stringLocalizer[name].Value;
        }
    }
}