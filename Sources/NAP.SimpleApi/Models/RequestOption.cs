namespace NAP.SimpleApi.Models
{
    using System;

    public class RequestOption
    {
        public string ApiKey { get; set; }

        public ActionTypes ActionType { get; set; } = ActionTypes.Query;

        public Type CriteriaType { get; set; }
    }
}
