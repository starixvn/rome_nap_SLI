using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Fanex.NAP.Client.Services;
using MediatR;
using NAP.SLI.Common.Models;
using NAP.SLI.UserManagement.Models;
using NAP.SLI.UserManagement.Requests;

namespace NAP.SLI.UserManagement.Handlers
{
    public class QueryHandler : IRequestHandler<QueryRequest, IEnumerable<UserModel>>
    {
        private readonly IUserService userService;

        public QueryHandler(IUserService userService)
        {
            this.userService = userService;
        }

        public async Task<IEnumerable<UserModel>> Handle(QueryRequest request, CancellationToken cancellationToken)
        {
            var users = await userService.GetAllAsync().ConfigureAwait(false);
            return users.Where(u =>
            {
                if (!u.Username.Contains(request.Username, StringComparison.CurrentCultureIgnoreCase))
                {
                    return false;
                }

                return u.Group?.Name == Constants.GroupName;
            })
            .Select(u => new UserModel
            {
                UserId = u.Id,
                UserName = u.Username,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                Creator = u.Creator?.Username,
                CreatedDate = u.CreatedDate
            });
        }
    }
}