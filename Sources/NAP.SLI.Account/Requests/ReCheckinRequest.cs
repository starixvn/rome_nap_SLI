using MediatR;
using NAP.SLI.Common.Models;

namespace NAP.SLI.Account.Requests
{
    public class ReCheckinRequest : IRequest<ResultModel>
    {
        public string ConnectionId { get; set; }
    }
}