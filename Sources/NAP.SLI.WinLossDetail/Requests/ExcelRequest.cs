namespace NAP.SLI.WinLossDetail.Requests
{
    using MediatR;

    public class ExcelRequest : RequestBase, IRequest<byte[]>
    {
        public string Username { get; set; }
    }
}
