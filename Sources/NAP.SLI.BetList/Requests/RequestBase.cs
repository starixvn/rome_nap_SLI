namespace NAP.SLI.BetList.Requests
{
    using System;

    public class RequestBase
    {
        public int CustId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }
}