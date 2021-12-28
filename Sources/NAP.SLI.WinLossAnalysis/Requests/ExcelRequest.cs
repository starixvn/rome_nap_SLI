namespace NAP.SLI.WinLossAnalysis.Requests
{
    using System.ComponentModel.DataAnnotations;
    using MediatR;

    public class ExcelRequest : RequestBase, IRequest<byte[]>
    {
        [Required]
        public string Username { get; set; }
    }
}
