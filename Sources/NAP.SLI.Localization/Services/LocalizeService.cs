using Microsoft.Extensions.Localization;

namespace NAP.SLI.Localization.Services
{
    public interface ILocalizeService
    {
        string Localize(string name);
    }

    public class LocalizeService : ILocalizeService
    {
        private readonly IStringLocalizer stringLocalizer;

        public LocalizeService(IStringLocalizer stringLocalizer)
        {
            this.stringLocalizer = stringLocalizer;
        }

        public string Localize(string name)
        {
            return stringLocalizer[name].Value;
        }
    }
}