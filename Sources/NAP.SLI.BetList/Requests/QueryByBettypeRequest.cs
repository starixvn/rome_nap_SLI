
namespace NAP.SLI.BetList.Requests
{
    using System.ComponentModel.DataAnnotations;
    using MediatR;

    public class QueryByBetTypeRequest : RequestBase, IRequest<object>
    {
        [Required]
        public int Bettype { get; set; }

        [Required]
        public int RoleId { get; set; }
    }
}