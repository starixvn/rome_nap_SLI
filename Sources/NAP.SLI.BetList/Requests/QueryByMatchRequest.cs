namespace NAP.SLI.BetList.Requests
{
    using MediatR;
    public class QueryByMatchRequest : IRequest<object>
    {
        public int CustId { get; set; }
        public int RoleId { get; set; }
        public int MatchId { get; set; }
        public int Bettype { get; set; }
        public int LiveIndicator { get; set; }
    }
}
