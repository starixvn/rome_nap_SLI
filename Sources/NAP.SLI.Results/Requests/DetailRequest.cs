namespace NAP.SLI.Results.Requests
{
    using MediatR;

    public class DetailRequest : IRequest<string>
    {
        public string TranId3rd { get; set; }

        public string ObCustId { get; set; }

        public bool IsDesktop { get; set; }

        public bool IsDarkmode { get; set; } = false;

        public string Language { get; set; } = "en-US";
    }
}