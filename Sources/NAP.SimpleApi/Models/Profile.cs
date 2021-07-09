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

        public void AddQuery<T>(string apiKey, OptionExtra extra) where T : ICriteria
        {
            Add(new RequestOption
            {
                ApiKey = apiKey,
                CriteriaType = typeof(T),
                ActionType = ActionTypes.Query,
                Extra = extra
            });
        }

        public void AddCommand<T>(string apiKey) where T : INonQueryCommand
        {
            AddCommand<T>(apiKey, null);
        }

        public void AddCommand<T>(string apiKey, OptionExtra extra) where T : INonQueryCommand
        {
            Add(new RequestOption
            {
                ApiKey = apiKey,
                CriteriaType = typeof(T),
                ActionType = ActionTypes.Command,
                Extra = extra
            });
        }

        private void Add(RequestOption requestOption)
        {
            RequestOptions.Add(requestOption);
        }
    }
}
