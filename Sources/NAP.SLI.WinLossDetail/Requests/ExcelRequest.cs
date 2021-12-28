namespace NAP.SLI.WinLossDetail.Requests
{
    using System.ComponentModel.DataAnnotations;
    using MediatR;

    public class ExcelRequest : RequestBase, IRequest<byte[]>
    {
        [Required]
        public string Username { get; set; }
    }
}
