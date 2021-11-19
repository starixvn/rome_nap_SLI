namespace NAP.SLI.Common.Services
{
    using Microsoft.AspNetCore.Http;
    using NAP.SLI.Common.Models;
    using System.Linq;
    using System.Security.Claims;

    public interface ICurrentUserService
    {
        string Username { get; }

        int OnUserId { get; }

        int UserId { get; }

        bool IsAdmin { get; }
    }

    public class CurrentUserService : ICurrentUserService
    {
        public string Username { get; private set; }

        public int OnUserId { get; private set; }

        public int UserId { get; private set; }

        public bool IsAdmin { get; private set; }

        public CurrentUserService(IHttpContextAccessor context)
        {
            var claims = context.HttpContext.User.Claims;
            if (claims.Any())
            {
                Username = claims.First(x => x.Type == ClaimTypes.Name).Value;
                OnUserId = int.Parse(claims.First(x => x.Type == NapClaimTypes.OnUserId).Value);
                UserId = int.Parse(claims.First(x => x.Type == NapClaimTypes.UserId).Value);
                IsAdmin = bool.Parse(claims.First(x => x.Type == NapClaimTypes.IsAdmin).Value);
            }
        }
    }
}
