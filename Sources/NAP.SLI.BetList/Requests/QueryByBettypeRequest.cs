
namespace NAP.SLI.BetList.Requests
{
    using MediatR;

    public class QueryByBettypeRequest : RequestBase, IRequest<object>
    {
        public int Bettype { get; set; }
        public int RoleId { get; set; }
    }
}