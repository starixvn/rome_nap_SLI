namespace NAP.SimpleApi.Models
{
    using System;

    public class RequestOption
    {
        public string ApiKey { get; init; }

        public ActionTypes ActionType { get; init; }

        public Type CriteriaType { get; init; }

        public OptionExtra Extra { get; init; }
    }
}
