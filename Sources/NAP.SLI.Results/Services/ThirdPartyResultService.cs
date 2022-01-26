namespace NAP.SLI.Results.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Results.Models;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Utilities;
    using Newtonsoft.Json;

    public interface IThirdPartyResultService
    {
        Task<string> QueryHappy5LinkedGameResult(QueryHappy5LinkedGameResultRequest request);
        string QuerySoccer5Result(QuerySoccer5ResultRequest request);
    }

    public class ThirdPartyResultService : IThirdPartyResultService
    {
        private readonly IAppSettings appSettings;
        private readonly IJsonWebClient client;

        public ThirdPartyResultService(IAppSettings appSettings, IJsonWebClient client = null)
        {
            this.appSettings = appSettings;
            this.client = client ?? new JsonWebClient();
        }

        public async Task<string> QueryHappy5LinkedGameResult(QueryHappy5LinkedGameResultRequest request)
        {
            var requestData = new Dictionary<string, string>
            {
                { "SiteId", appSettings.ResultsConfigs.SiteId },
                { "ObCustID", request.CustId },
                { "TranId3rd", request.TranId3rd},
                { "Language", request.Language },
                { "Platform", request.IsDesktop ? "D" : "M" },
                { "DarkMode", request.IsDarkMode ? "1" : "0" },
            };
            if ((DebugMode)appSettings.ResultsConfigs.DebugMode == DebugMode.DontSendRequest)
            {
                throw new Exception("Request data:" + JsonConvert.SerializeObject(requestData));
            }
            else
            {
                var responseData = await client.QueryString<Happy5LinkedGameResultModel>(
                    appSettings.ResultsConfigs.Url,
                    requestData,
                    appSettings.ResultsConfigs.ProxyIPServer,
                    appSettings.ResultsConfigs.ProxyPortServer
                    );

                if (ValidateResponse(requestData, responseData))
                {
                    return RemoveWebProtocol(responseData.Url);
                }
            }

            return await Task.FromResult(string.Empty);
        }

        private bool ValidateResponse(Dictionary<string, string> requestData, Happy5LinkedGameResultModel responseData)
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
                        $" {Helper.ConvertToQueryString(requestData)}; \n Detail response: {JsonConvert.SerializeObject(responseData)}");
                }
            }

            return true;
        }

        public string QuerySoccer5Result(QuerySoccer5ResultRequest request)
        {
            Helper.CheckArgument(request.MatchId.ToString(), "MatchId");
            Helper.CheckArgument(request.Balls, "Balls");

            var requestData = new Dictionary<string, string>
            {
                { "MatchId", request.MatchId.ToString()},
                { "SiteId", appSettings.ResultsConfigs.SiteId },
                { "LangCode" , request.Language },
                { "Balllist" , request.Balls },
                { "BettypeId" , request.BetTypeId.ToString() },
                { "Platform" , request.IsDesktop ? "D" : "M" },
                { "DarkMode" , request.IsDarkMode ? "1" : "0"},
            };
            if ((DebugMode)appSettings.ResultsConfigs.DebugMode == DebugMode.DontSendRequest)
            {
                throw new Exception("Request data:" + JsonConvert.SerializeObject(requestData));
            }
            else
            {
                return $"{appSettings.ResultsConfigs.UrlSoccer5}?{Helper.ConvertToQueryString(requestData)}";
            }
        }

        private static string RemoveWebProtocol(string url)
            => !string.IsNullOrWhiteSpace(url) ? url.Replace("http:", string.Empty) : string.Empty;
    }
}