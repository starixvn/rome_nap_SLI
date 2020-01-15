namespace NAP.SLI.Common.Services
{
    using Microsoft.AspNetCore.Http;
    using System;
    using System.Globalization;
    using System.Linq;
    using UAParser;

    public interface ICurrentContextService
    {
        string GetIP();

        string GetDomainName();

        string GetBrowserName();

        string GetPlatform();

        string GetCountryCode();
    }

    public class CurrentContextService : ICurrentContextService
    {
        private readonly HttpContext context;

        public CurrentContextService(IHttpContextAccessor httpContextAccessor)
            => (context) = (httpContextAccessor.HttpContext);

        public string GetIP()
        {
            return context.Connection.RemoteIpAddress.ToString();
        }

        public string GetDomainName()
        {
            return context.Request.Host.Value;
        }

        public string GetBrowserName()
        {
            var userAgentString = context.Request.Headers["User-Agent"].ToString();
            var uaParser = Parser.GetDefault();
            var client = uaParser.Parse(userAgentString);
            var userAgent = client.UA;
            return $"{userAgent.Family}/{userAgent.Major}.{userAgent.Minor}";
        }

        public string GetPlatform()
        {
            return context.Request.Headers["User-Agent"].ToString();
        }

        public string GetCountryCode()
        {
            var regionInfo = ResolveCountry(context.Request);
            return regionInfo?.GeoId.ToString(CultureInfo.CurrentCulture);
        }

        private RegionInfo ResolveCountry(HttpRequest request)
        {
            var culture = ResolveCulture(request);
            return culture != null ? new RegionInfo(culture.LCID) : null;
        }

        private CultureInfo ResolveCulture(HttpRequest request)
        {
            var userLangs = request.Headers["Accept-Language"].ToString();
            var firstLang = userLangs.Split(',').FirstOrDefault();
            var language = string.IsNullOrEmpty(firstLang) ? "en" : firstLang;

            try
            {
                return CultureInfo.CreateSpecificCulture(language);
            }
            catch (ArgumentException)
            {
                return null;
            }
        }
    }
}
