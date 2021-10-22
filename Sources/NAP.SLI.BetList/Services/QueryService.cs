namespace NAP.SLI.BetList.Services
{
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Configuration;
    using NAP.SLI.BetList.Requests;
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
        private readonly string baseURL;

        public QueryService(IConfiguration configuration)
        {
            baseURL = configuration.GetValue<string>("BetListAPI:URL");
        }

        public async Task<object> QueryByDate(QueryByDateRequest request)
        {
            var response = await Query(request, baseURL + "/BetListSLIApi/GetByDate");
            return response;
        }

        public async Task<object> QueryByMatch(QueryByMatchRequest request)
        {
            var response = await Query(request, baseURL + "/BetListSLIApi/GetByMatch");
            return response;
        }

        public async Task<object> QueryByBettype(QueryByBettypeRequest request)
        {
            var response = await Query(request, baseURL + "/BetListSLIApi/GetByBettype");
            return response;
        }

        private async Task<object> Query(object request, string url)
        {
            var serializeRequest = JsonConvert.SerializeObject(request);
            var requestContent = new StringContent(serializeRequest, Encoding.UTF8, "application/json");

            using var httpClient = new HttpClient();
            using var response = await httpClient.PostAsync(url, requestContent);
            response.EnsureSuccessStatusCode();

            var records = JObject.Parse(await response.Content.ReadAsStringAsync());

            return records;
        }
    }

}