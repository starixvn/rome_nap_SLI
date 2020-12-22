namespace NAP.SimpleApi.Models
{
    using System;
    using Microsoft.AspNetCore.Authorization;

    public class RequestOption
    {
        public string ApiKey { get; private set; }

        public ActionTypes ActionType { get; private set; }

        public Type CriteriaType { get; private set; }

        public AuthorizationPolicy Policy { get; private set; }

        public RequestOption(string apiKey, Type criteriaType, ActionTypes actionType, AuthorizationPolicy policy)
        {
            ApiKey = apiKey;
            CriteriaType = criteriaType;
            ActionType = actionType;
            Policy = policy;
        }
    }
}
