using System.Collections.Generic;
using MediatR;

namespace NAP.SLI.Results.Requests
{
    public class GetResultByMatchRequest : IRequest<object>
    {
        public long MatchId { get; set; }
    }
}