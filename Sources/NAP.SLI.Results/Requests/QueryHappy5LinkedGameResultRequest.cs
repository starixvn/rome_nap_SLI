namespace NAP.SLI.Results.Requests
{
    using MediatR;

    public class QueryHappy5LinkedGameResultRequest : IRequest<string>
    {
        public string TranId3rd { get; set; }

        public string ObCustId { get; set; }

        public bool IsDesktop { get; set; } = true;

        public bool IsDarkMode { get; set; } = false;

        public string Language { get; set; } = "en-US";
    }
}