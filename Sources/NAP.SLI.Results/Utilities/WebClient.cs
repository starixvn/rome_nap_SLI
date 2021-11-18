namespace NAP.SLI.Results.Utilities
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Threading.Tasks;

    public interface IWebClient
    {
        Task<TOut> QueryString<TOut>(string address, Dictionary<string, string> requestData, string proxyServer = "", int port = 0);
    }

    public class JsonWebClient : IWebClient, IDisposable
    {
        private readonly WebClient client;
        private readonly ISerializer serializer;

        public JsonWebClient(ISerializer serializer)
        {
            client = new WebClient();
            this.serializer = serializer ?? new JsonSerializer();
        }

        public async Task<TOut> QueryString<TOut>(string address, Dictionary<string, string> requestData, string proxyServer = "", int port = 0)
        {
            if (!string.IsNullOrEmpty(proxyServer) && port != 0)
            {
                var proxy = new WebProxy(proxyServer, port);
                client.Proxy = proxy;
            }

            foreach (var item in requestData)
            {
                client.QueryString.Add(item.Key, item.Value);
            }

            var response = await client.DownloadStringTaskAsync(address);

            return serializer.Deserialize<TOut>(response);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (client != null)
            {
                client.Dispose();
            }
        }
    }
}