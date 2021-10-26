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

        Task<object> QueryByBettype(QueryByBettypeRequest request);
    }

    public class QueryService : IQueryService
    {
        private readonly IAppSettings appSettings;

        public QueryService(IAppSettings appSettings)
        {
            this.appSettings = appSettings;
        }

        public async Task<object> QueryByDate(QueryByDateRequest request)
        {
            var response = await Query(request, appSettings.BetListApiUrl + "/BetListSLIApi/GetByDate").ConfigureAwait(false);
            return response;
        }

        public async Task<object> QueryByMatch(QueryByMatchRequest request)
        {
            var response = await Query(request, appSettings.BetListApiUrl + "/BetListSLIApi/GetByMatch").ConfigureAwait(false);
            return response;
        }

        public async Task<object> QueryByBettype(QueryByBettypeRequest request)
        {
            var response = await Query(request, appSettings.BetListApiUrl + "/BetListSLIApi/GetByBettype").ConfigureAwait(false);
            return response;
        }

        private async Task<object> Query(object request, string url)
        {
            var serializeRequest = JsonConvert.SerializeObject(request);
            var requestContent = new StringContent(serializeRequest, Encoding.UTF8, "application/json");

            using var httpClient = new HttpClient();
            using var response = await httpClient.PostAsync(url, requestContent).ConfigureAwait(false);
            response.EnsureSuccessStatusCode();

            var records = JObject.Parse(await response.Content.ReadAsStringAsync().ConfigureAwait(false));

            return records;
        }
    }

}