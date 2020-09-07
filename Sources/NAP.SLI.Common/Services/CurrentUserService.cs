namespace NAP.SLI.Common.Services
{
    using Microsoft.AspNetCore.Http;
    using NAP.SLI.Common.Models;
    using System.Linq;
    using System.Security.Claims;

    public interface ICurrentUserService
    {
        string Username { get; }

        int UserId { get; }

        int GroupId { get; }
    }

    public class CurrentUserService: ICurrentUserService
    {
        public string Username { get; private set; }

        public int UserId { get; private set; }

        public int GroupId { get; private set; }

        public CurrentUserService(IHttpContextAccessor context)
        {
            var claims = context.HttpContext.User.Claims;
            Username = claims.First(x => x.Type == ClaimTypes.Name).Value;
            UserId = int.Parse(claims.First(x => x.Type == NapClaimTypes.UserId).Value);
            GroupId = int.Parse(claims.First(x => x.Type == NapClaimTypes.GroupId).Value);
        }
    }
}
