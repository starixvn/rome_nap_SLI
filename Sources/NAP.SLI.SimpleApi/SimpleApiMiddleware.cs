namespace NAP.SLI.SimpleApi
{
    using MediatR;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.SimpleApi.Core;
    using Newtonsoft.Json;
    using System.Threading.Tasks;

    public class SimpleApiMiddleware
    {
        private readonly RequestDelegate next;
        private readonly IMediator mediator;

        public SimpleApiMiddleware(RequestDelegate next, IMediator mediator)
            => (this.next, this.mediator) = (next, mediator);

        public async Task Invoke(HttpContext httpContext)
        {
            var configuration = Configuration.Instance;
            if (configuration.RoutingMap.IsMatchRequest(httpContext.Request, out RequestOption requestOption))
            {
                var response = await mediator.Send(requestOption) as JsonResult;
                var json = JsonConvert.SerializeObject(response.Value);
                await httpContext.Response.WriteAsync(json);
            }
            else
            {
                await next(httpContext);
            }
        }
    }
}
