namespace NAP.SimpleApi.Models
{
    using System;

    public class RequestOption
    {
        public string ApiKey { get; private set; }

        public ActionTypes ActionType { get; private set; }

        public Type CriteriaType { get; private set; }

        public RequestOption(string apiKey, Type criteriaType, ActionTypes actionType)
        {
            ApiKey = apiKey;
            CriteriaType = criteriaType;
            ActionType = actionType;
        }
    }
}
