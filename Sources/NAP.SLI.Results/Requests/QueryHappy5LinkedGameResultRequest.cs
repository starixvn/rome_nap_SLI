namespace NAP.SLI.Results.Requests
{
    using MediatR;
    using NAP.SLI.Common.Models;

    public class QueryHappy5LinkedGameResultRequest : IRequest<string>
    {
        public string TranId3rd { get; set; }

        public string CustId { get; set; }

        public int BetType { get; } = (int)BetTypes.Soccer5;

        public int SportType { get; } = (int)SportTypes.Happy5_Linked_Game;

        public bool IsDesktop { get; } = true;

        public bool IsDarkMode { get; } = false;

        public string Language { get; } = "en";
    }
}