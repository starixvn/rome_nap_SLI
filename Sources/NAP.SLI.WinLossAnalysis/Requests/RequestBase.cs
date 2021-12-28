namespace NAP.SLI.WinLossAnalysis.Requests
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class RequestBase
    {
        [Required]
        public int CustId { get; set; }

        [Required]
        public int RoleId { get; set; }

        [Required]
        public DateTime FromDate { get; set; }

        [Required]
        public DateTime ToDate { get; set; }

        [Required]
        public int ReportType { get; set; }
    }
}
