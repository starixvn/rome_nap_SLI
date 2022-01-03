namespace NAP.SLI.Results.Requests
{
    using MediatR;

    public class ExcelRequest : RequestBase, IRequest<byte[]>
    {
        public string SportName { get; set; }

        public string LeagueName { get; set; }
    }
}