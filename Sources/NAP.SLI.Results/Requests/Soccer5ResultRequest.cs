namespace NAP.SLI.Results.Requests
{
    using MediatR;

    public class Soccer5ResultRequest : IRequest<string>
    {
        public string MatchId { get; set; }

        public string Balls { get; set; }

        public bool IsDesktop { get; set; }

        public bool IsDarkMode { get; set; } = false;

        public string Language { get; set; } = "en-US";

        public int BettypeId { get; set; } = 3604;
    }
}