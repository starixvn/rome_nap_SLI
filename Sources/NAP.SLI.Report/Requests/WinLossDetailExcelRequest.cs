namespace NAP.SLI.Report.Requests
{
    using System;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;

    public class WinLossDetailExcelRequest : IRequest<IActionResult>
    {
        public int CustId { get; set; }

        public int RoleId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public bool IsHistory { get; set; }
    }
}
