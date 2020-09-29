namespace NAP.SimpleApi
{
    using Fanex.Data.Repository;
    using NAP.SimpleApi.Models;
    using System;
    using System.Collections.Generic;

    public abstract class Profile
    {
        public string Prefix { get; private set; }

        public IList<RequestOption> RequestOptions { get; private set; }

        protected Profile()
            :this(null)
        {
        }

        protected Profile(string prefix)
        {
            Prefix = prefix;
            RequestOptions = new List<RequestOption>();
        }
        
        public void AddQuery<T>(string apiKey) where T : ICriteria
        {
            Add(apiKey, typeof(T), ActionTypes.Query);
        }

        public void AddCommand<T>(string apiKey) where T : ICriteria
        {
            Add(apiKey, typeof(T), ActionTypes.Command);
        }

        private void Add(string apiKey, Type criteriaType, ActionTypes actionType)
        {
            RequestOptions.Add(new RequestOption(apiKey, criteriaType, actionType));
        }
    }
}
