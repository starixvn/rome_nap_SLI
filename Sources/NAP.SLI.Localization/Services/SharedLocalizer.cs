using System.Collections.Generic;
using Microsoft.Extensions.Localization;
using NAP.SLI.Localization.Resources;

namespace NAP.SLI.Localization.Services
{
    public interface ISharedLocalizer : IStringLocalizer
    {
    }

    public class SharedLocalizer : ISharedLocalizer
    {
        private readonly IStringLocalizer _localizer;

        public SharedLocalizer(IStringLocalizer<SharedResource> localizer)
        {
            _localizer = localizer;
        }

        public LocalizedString this[string name, params object[] arguments] => _localizer[name, arguments];

        public LocalizedString this[string name] => _localizer[name];

        public IEnumerable<LocalizedString> GetAllStrings(bool includeParentCultures)
        {
            return _localizer.GetAllStrings(includeParentCultures);
        }
    }
}