using System.Collections.Generic;
using MediatR;
using NAP.SLI.UserManagement.Models;

namespace NAP.SLI.UserManagement.Requests
{
    public class QueryRequest : IRequest<IEnumerable<UserModel>>
    {
        public string Username { get; set; }

        public int? GroupId { get; set; }
    }
}