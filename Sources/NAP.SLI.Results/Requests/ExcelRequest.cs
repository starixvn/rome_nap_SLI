namespace NAP.SLI.Results.Requests
{
    using System;
    using MediatR;

    public class ExcelRequest : IRequest<byte[]>
    {
        public DateTime EventDate { get; set; }

        public int LeagueId { get; set; }

        public int SportType { get; set; }

        public string SportName { get; set; }

        public string LeagueName { get; set; }
    }
}