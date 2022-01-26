namespace NAP.SLI.Results.Utilities
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Threading.Tasks;
    using Newtonsoft.Json;

    public interface IJsonWebClient
    {
        Task<TOut> QueryString<TOut>(string address, Dictionary<string, string> requestData, string proxyServer = "", int port = 0);
    }

    public class JsonWebClient : IJsonWebClient, IDisposable
    {
        private readonly WebClient webClient;

        public JsonWebClient(WebClient webClient = null)
        {
            this.webClient = webClient ?? new WebClient();
        }

        public async Task<TOut> QueryString<TOut>(string address, Dictionary<string, string> requestData, string proxyServer = "", int port = 0)
        {
            if (!string.IsNullOrEmpty(proxyServer) && port != 0)
            {
                var proxy = new WebProxy(proxyServer, port);
                webClient.Proxy = proxy;
            }

            foreach (var item in requestData)
            {
                webClient.QueryString.Add(item.Key, item.Value);
            }

            var response = await webClient.DownloadStringTaskAsync(address);
            return JsonConvert.DeserializeObject<TOut>(response);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (webClient != null)
            {
                webClient.Dispose();
            }
        }
    }
}