using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using NAP.UM.Services;
using System.Linq;
using NAP.UM.Models;

namespace NAP.UM.Web
{
    public class UMFilterAttribute : ActionFilterAttribute
    {
        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var svc = context.HttpContext.RequestServices;
            var maintenanceService = svc.GetService<IMaintenanceService>();
            var umConfig = svc.GetService<UMConfig>();
            var isCheckUM = await IsCheckUM(context, maintenanceService, umConfig).ConfigureAwait(false);
            if (isCheckUM)
            {
                var umTime = await maintenanceService.GetUMTimeAsync().ConfigureAwait(false);
                if (umTime.IsUnderMaintenanceTime)
                {
                    var response = context.HttpContext.Response;
                    response.Clear();
                    response.StatusCode = StatusCodes.Status503ServiceUnavailable;
                    await response.WriteAsJsonAsync(umTime).ConfigureAwait(false);
                    return;
                }
            }

            await next().ConfigureAwait(false);
        }

        private static async Task<bool> IsCheckUM(ActionExecutingContext context, IMaintenanceService maintenanceService, UMConfig umConfig)
        {
            if (!maintenanceService.IsEnabled)
            {
                return false;
            }

            if (context.ActionDescriptor.EndpointMetadata.Any(x => x is UncheckUMFilterAttribute))
            {
                return false;
            }

            var request = context.HttpContext.Request;
            var umToken = request.Headers[umConfig.HeaderKey];
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