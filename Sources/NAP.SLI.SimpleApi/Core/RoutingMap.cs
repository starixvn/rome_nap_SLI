namespace NAP.SLI.SimpleApi.Core
{
    using Microsoft.AspNetCore.Http;
    using System.Collections.Generic;
    using System.Linq;

    public class RoutingMap
    {
        public IList<RequestOption> RequestOptions { get; private set; }

        public RoutingMap(IList<RequestOption> requestOptions)
        {
            RequestOptions = requestOptions;
        }

        public bool IsMatchRequest(HttpRequest request, out RequestOption requestOption)
        {
            var requestPath = request.Path.Value;
            var method = request.Method;
            requestOption = RequestOptions.FirstOrDefault(x => x.Path == requestPath && x.Method == method);
            return requestOption != null;
        }
    }
}
