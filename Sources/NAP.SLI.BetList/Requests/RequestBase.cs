namespace NAP.SLI.BetList.Requests
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class RequestBase
    {
        [Required]
        public int CustId { get; set; }

        [Required]
        public DateTime FromDate { get; set; }

        [Required]
        public DateTime ToDate { get; set; }
    }
}