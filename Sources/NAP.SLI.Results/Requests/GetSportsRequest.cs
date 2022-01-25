namespace NAP.SLI.Results.Requests
{
    using System;
    using System.Collections.Generic;
    using MediatR;
    using NAP.SLI.Results.Models;

    public class GetSportsRequest : IRequest<IEnumerable<SportModel>>
    {
        public DateTime EventDate { get; set; }
    }
}