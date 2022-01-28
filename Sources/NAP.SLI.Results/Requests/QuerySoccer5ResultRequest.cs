namespace NAP.SLI.Results.Requests
{
    using MediatR;
    using NAP.SLI.Common.Models;

    public class QuerySoccer5ResultRequest : IRequest<string>
    {
        public int MatchId { get; set; }

        public string Balls { get; set; }

        public bool IsDesktop { get; } = true;

        public bool IsDarkMode { get; } = false;

        public string Language { get; } = "en";

        public int BetTypeId { get; } = (int)BetTypes.Soccer5;
    }
}