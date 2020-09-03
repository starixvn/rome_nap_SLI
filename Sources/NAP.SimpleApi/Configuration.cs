namespace NAP.SimpleApi
{
    using NAP.SimpleApi.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class Configuration
    {
        public Configuration()
            : this(null, null)
        {
        }

        public Configuration(IEnumerable<RequestOption> requestOptions, IRequestOptionContext requestActivator)
        {
            RequestOptions = requestOptions ?? new List<RequestOption>();
            RequestActivator = requestActivator ?? new RequestOptionContext();
            ValidateDuplicateKeys();
        }

        public IEnumerable<RequestOption> RequestOptions { get; private set; }

        public IRequestOptionContext RequestActivator { get; private set; }

        public void Add(IEnumerable<RequestOption> requestOptions)
        {
            Add(null, requestOptions);
        }

        public void Add(string prefix, IEnumerable<RequestOption> requestOptions)
        {
            requestOptions = requestOptions.Select(x =>
            {
                string apiKey = string.IsNullOrEmpty(prefix) ? x.ApiKey : $"{prefix}:{x.ApiKey}";
                return new RequestOption(apiKey, x.CriteriaType, x.ActionType);
            });
            RequestOptions = RequestOptions.Concat(requestOptions);
            ValidateDuplicateKeys();
        }

        private void ValidateDuplicateKeys()
        {
            var duplicateApiKeys = RequestOptions.GroupBy(x => x.ApiKey).Where(g => g.Count() > 1).Select(g => g.Key);
            if(duplicateApiKeys.Any())
            {
                throw new InvalidOperationException("Duplicate API Keys: " + string.Join(", ", duplicateApiKeys));
            }
        }
    }
}
