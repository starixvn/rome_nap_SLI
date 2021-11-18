namespace NAP.SLI.Results.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Results.Models;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Utilities;

    public interface IQueryService
    {
        Task<string> QueryDetail(DetailRequest request);
    }

    public class QueryService : IQueryService
    {
        private readonly IAppSettings appSettings;
        private readonly IWebClient client;
        private readonly ISerializer serializer;

        public QueryService(IAppSettings appSettings, IWebClient client = null, ISerializer serializer = null)
        {
            this.appSettings = appSettings;
            this.serializer = serializer ?? new JsonSerializer();
            this.client = client ?? new JsonWebClient(this.serializer);
        }

        public async Task<string> QueryDetail(DetailRequest request)
        {
            Helper.CheckArgument(request.ObCustId, "ObCustId");
            Helper.CheckArgument(request.TranId3rd, "TranId3rd");

            var requestData = GenerateRequestData();
            if ((DebugMode)appSettings.ResultsConfigs.DebugMode == DebugMode.DontSendRequest)
            {
                throw new Exception("Request data:" + serializer.Serialize(requestData));
            }
            else
            {
                var responseData = await client.QueryString<DetailModel>(
                    appSettings.ResultsConfigs.Url,
                    requestData,
                    appSettings.ResultsConfigs.ProxyIPServer,
                    appSettings.ResultsConfigs.ProxyPortServer
                    );

                if (ValidateResponse(responseData))
                {
                    return RemoveWebProtocol(responseData.Url);
                }
            }

            return await Task.FromResult(string.Empty);

            Dictionary<string, string> GenerateRequestData()
            {
                var languageCode = Language.GetLanguageCode(request.Language);
                return new Dictionary<string, string>
                {
                    { "SiteId", appSettings.ResultsConfigs.SiteId },
                    { "ObCustID", request.ObCustId },
                    { "TranId3rd", request.TranId3rd},
                    { "Language", languageCode },
                    { "Platform", request.IsDesktop ? "D" : "M" },
                    { "DarkMode", request.IsDarkmode ? "1" : "0" },
                };
            }

            bool ValidateResponse(DetailModel responseData)
            {
                if (!responseData.IsSuccess)
                {
                    if ((DebugMode)appSettings.ResultsConfigs.DebugMode == DebugMode.None)
                    {
                        throw new Exception(responseData.ErrMsg);
                    }
                    else
                    {
                        throw new Exception($"Url of LinkedGames send request incorrectly! Detail request:" +
                            $" {Helper.DictionaryToString(requestData)}; \n Detail response: {serializer.Serialize(responseData)}");
                    }
                }

                return true;
            }
        }

        private static string RemoveWebProtocol(string url)
            => !string.IsNullOrWhiteSpace(url) ? url.Replace("http:", string.Empty) : string.Empty;
    }
}