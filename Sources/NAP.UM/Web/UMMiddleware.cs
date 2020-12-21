namespace NAP.UM.Web
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Http.Features;
    using NAP.UM.Services;

    public class UMMiddleware
    {
        private readonly RequestDelegate _next;
        public UMMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext, IMaintenanceService maintenanceService)
        {
            var isCheckUM = await IsCheckUM(httpContext, maintenanceService).ConfigureAwait(false);
            if (isCheckUM)
            {
                var umTime = await maintenanceService.GetUMTimeAsync().ConfigureAwait(false);
                if (umTime.IsUnderMaintenanceTime)
                {
                    httpContext.Response.Clear();
                    httpContext.Response.StatusCode = StatusCodes.Status503ServiceUnavailable;
                    await httpContext.Response.WriteAsJsonAsync(umTime);
                    return;
                }
            }

            await _next(httpContext);
        }

        private async Task<bool> IsCheckUM(HttpContext httpContext, IMaintenanceService maintenanceService)
        {
            if (!maintenanceService.IsEnabled)
            {
                return false;
            }

            var endpointMetadata = httpContext.Features?.Get<IEndpointFeature>()?.Endpoint?.Metadata;
            if (endpointMetadata == null)
            {
                return false;
            }

            var uncheckUMFilter = endpointMetadata.GetMetadata<IUncheckUMFilter>();
            if (uncheckUMFilter != null)
            {
                return false;
            }

            var umToken = httpContext.Request.Headers["UMToken"];
            if (!string.IsNullOrEmpty(umToken))
            {
                var isValidToken = await maintenanceService.IsValidTokenAsync(umToken).ConfigureAwait(false);
                if (isValidToken)
                {
                    return false;
                }
            }

            return true;
        }
    }
}
