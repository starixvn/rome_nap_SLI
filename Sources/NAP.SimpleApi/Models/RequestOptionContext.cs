namespace NAP.SimpleApi.Models
{
    using Fanex.Data.Repository;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.AspNetCore.Http;
    using NAP.SimpleApi.Helpers;
    using NAP.SimpleApi.Requests;
    using System;
    using System.Linq;

    public interface IRequestOptionContext
    {
        ICriteria CreateCriteria(SimpleApiRequest request, ActionTypes actionType);

        ICriteria CreateCriteria(IQueryCollection queryCollection, ActionTypes actionType);
    }

    public class RequestOptionContext: IRequestOptionContext
    {
        private readonly IServiceProvider serviceProvider;

        public RequestOptionContext(IServiceProvider serviceProvider)
            => (this.serviceProvider) = (serviceProvider);

        public virtual ICriteria CreateCriteria(SimpleApiRequest request, ActionTypes actionType)
        {
            var requestOptions = ServiceCollectionExtensions.RequestOptions;
            var requestOption = requestOptions.FirstOrDefault(x => x.ApiKey == request.ApiKey && x.ActionType == actionType);
            if (requestOption == null)
            {
                throw new InvalidOperationException("ApiKey not found");
            }

            var criteria = ActivatorUtilities.CreateInstance(serviceProvider, requestOption.CriteriaType) as ICriteria;
            ObjectHelper.CopyProperties(request.Data, criteria);
            if (!criteria.IsValid())
            {
                throw new InvalidOperationException("Invalid criteria");
            }

            return criteria;
        }

        public virtual ICriteria CreateCriteria(IQueryCollection queryCollection, ActionTypes actionType)
        {
            var requestOptions = ServiceCollectionExtensions.RequestOptions;
            queryCollection.TryGetValue("apiKey", out var apiKey);
            var requestOption = requestOptions.FirstOrDefault(x => x.ApiKey == apiKey && x.ActionType == actionType);
            if (requestOption == null)
            {
                throw new InvalidOperationException("ApiKey not found");
            }

            var criteria = ActivatorUtilities.CreateInstance(serviceProvider, requestOption.CriteriaType) as ICriteria;
            ObjectHelper.CopyProperties(queryCollection, criteria);
            if (!criteria.IsValid())
            {
                throw new InvalidOperationException("Invalid criteria");
            }

            return criteria;
        }
    }
}
