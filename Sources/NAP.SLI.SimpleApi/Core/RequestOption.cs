namespace NAP.SLI.SimpleApi.Core
{
    using MediatR;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using System;

    public class RequestOption : IRequest<IActionResult>
    {
        public string Path { get; set; }

        public string Method { get; set; } = HttpMethods.Get;

        public ActionTypes ActionType { get; set; } = ActionTypes.Query;

        public Type CriteriaType { get; set; }
    }
}
