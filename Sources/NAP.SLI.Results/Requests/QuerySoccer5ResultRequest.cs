namespace NAP.SLI.Results.Requests
{
    using MediatR;

    public class QuerySoccer5ResultRequest : IRequest<string>
    {
        public int MatchId { get; set; }

        public string Balls { get; set; }

        public bool IsDesktop { get; set; }

        public bool IsDarkMode { get; set; } = false;

        public string Language { get; set; } = "en-US";

        public int BetTypeId { get; set; } = 3604;
    }
}