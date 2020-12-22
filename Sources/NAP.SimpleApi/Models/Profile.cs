namespace NAP.SimpleApi.Models
{
    using System;
    using System.Collections.Generic;
    using Fanex.Data.Repository;
    using Microsoft.AspNetCore.Authorization;

    public abstract class Profile
    {
        public string Prefix { get; private set; }

        public IList<RequestOption> RequestOptions { get; private set; }

        protected Profile()
            : this(null)
        {
        }

        protected Profile(string prefix)
        {
            Prefix = prefix;
            RequestOptions = new List<RequestOption>();
        }

        public void AddQuery<T>(string apiKey) where T : ICriteria
        {
            AddQuery<T>(apiKey, null);
        }

        public void AddQuery<T>(string apiKey, AuthorizationPolicy policy) where T : ICriteria
        {
            Add(apiKey, typeof(T), ActionTypes.Query, policy);
        }

        public void AddCommand<T>(string apiKey) where T : ICriteria
        {
            AddCommand<T>(apiKey, null);
        }

        public void AddCommand<T>(string apiKey, AuthorizationPolicy policy) where T : ICriteria
        {
            Add(apiKey, typeof(T), ActionTypes.Command, policy);
        }

        private void Add(string apiKey, Type criteriaType, ActionTypes actionType, AuthorizationPolicy policy)
        {
            RequestOptions.Add(new RequestOption(apiKey, criteriaType, actionType, policy));
        }
    }
}
