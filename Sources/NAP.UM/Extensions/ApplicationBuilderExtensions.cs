using Microsoft.AspNetCore.Builder;
using NAP.UM.Web;

namespace NAP.UM.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseUM(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<UMMiddleware>();
        }
    }
}