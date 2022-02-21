namespace NAP.SLI.BetList.Services
{
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;
    using NAP.SLI.BetList.Requests;
    using NAP.SLI.Common.Services;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    public interface IQueryService
    {
        Task<object> QueryByDate(QueryByDateRequest request);

        Task<object> QueryByMatch(QueryByMatchRequest request);

        Task<object> QueryByBetType(QueryByBetTypeRequest request);
    }

    public class QueryService : IQueryService
    {
        private readonly IAppSettings appSettings;
        private readonly HttpClient httpClient;

        public QueryService(IAppSettings appSettings, HttpClient httpClient)
        {
            this.appSettings = appSettings;
            this.httpClient = httpClient;
        }

        public async Task<object> QueryByDate(QueryByDateRequest request)
        {
            return await Query(request, appSettings.BetListApiUrl + "/BetListSLIApi/GetByDate").ConfigureAwait(false);
        }

        public async Task<object> QueryByMatch(QueryByMatchRequest request)
        {
            return await Query(request, appSettings.BetListApiUrl + "/BetListSLIApi/GetByMatch").ConfigureAwait(false);
        }

        public async Task<object> QueryByBetType(QueryByBetTypeRequest request)
        {
            return await Query(request, appSettings.BetListApiUrl + "/BetListSLIApi/GetByBetType").ConfigureAwait(false);
        }

        private async Task<object> Query(object request, string url)
        {
            var serializeRequest = JsonConvert.SerializeObject(request);
            var requestContent = new StringContent(serializeRequest, Encoding.UTF8, "application/json");

            using var response = await httpClient.PostAsync(url, requestContent).ConfigureAwait(false);
            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
            return JObject.Parse(responseContent);
        }
    }
}