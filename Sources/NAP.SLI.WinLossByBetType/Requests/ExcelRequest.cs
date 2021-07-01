namespace NAP.SLI.WinLossByBetType.Requests
{
    using MediatR;

    public class ExcelRequest : RequestBase, IRequest<byte[]>
    {
        public string Username { get; set; }
    }
}
