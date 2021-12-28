namespace NAP.SLI.BetList.Requests
{
    using System.ComponentModel.DataAnnotations;
    using MediatR;

    public class QueryByMatchRequest : IRequest<object>
    {
        [Required]
        public int CustId { get; set; }

        [Required]
        public int RoleId { get; set; }

        [Required]
        public int MatchId { get; set; }

        [Required]
        public int BetType { get; set; }

        [Required]
        public int LiveIndicator { get; set; }
    }
}
