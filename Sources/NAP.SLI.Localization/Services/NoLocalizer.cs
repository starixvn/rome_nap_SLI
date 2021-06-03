using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Localization;

namespace NAP.SLI.Localization.Services
{
    public interface INoLocalizer : IStringLocalizer
    {
        string Localise(string name);
    }

    public class NoLocalizer : INoLocalizer
    {
        public LocalizedString this[string name, params object[] arguments] => new(name, name);

        public LocalizedString this[string name] => new(name, name);

        public IEnumerable<LocalizedString> GetAllStrings(bool includeParentCultures)
        {
            return Enumerable.Empty<LocalizedString>();
        }

        public string Localise(string name) => name;
    }
}