using MediatR;

namespace NAP.SLI.Results.Requests
{
    public class QueryResultsByMatchRequest : IRequest<object>
    {
        public long MatchId { get; set; }

        public int SportType { get; set; }
    }
}