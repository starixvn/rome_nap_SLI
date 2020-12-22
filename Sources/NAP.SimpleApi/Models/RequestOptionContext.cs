namespace NAP.SimpleApi.Models
{
    using Fanex.Data.Repository;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.AspNetCore.Http;
    using NAP.SimpleApi.Helpers;
    using NAP.SimpleApi.Requests;
    using System;
    using System.Linq;
    using NAP.SimpleApi.Extensions;

    public interface IRequestOptionContext
    {
        RequestOption GetRequestOption(SimpleApiRequest request, ActionTypes actionType);

        RequestOption GetRequestOption(IQueryCollection queryCollection, ActionTypes actionType);

        ICriteria CreateCriteria(SimpleApiRequest request, RequestOption requestOption);

        ICriteria CreateCriteria(IQueryCollection queryCollection, RequestOption requestOption);
    }

    public class RequestOptionContext : IRequestOptionContext
    {
        private readonly IServiceProvider serviceProvider;

        public RequestOptionContext(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public RequestOption GetRequestOption(SimpleApiRequest request, ActionTypes actionType)
        {
            var requestOptions = ServiceCollectionExtensions.RequestOptions;
            return requestOptions.FirstOrDefault(x => x.ApiKey == request.ApiKey && x.ActionType == actionType);
        }

        public RequestOption GetRequestOption(IQueryCollection queryCollection, ActionTypes actionType)
        {
            var requestOptions = ServiceCollectionExtensions.RequestOptions;
            queryCollection.TryGetValue("apiKey", out var apiKey);
            return requestOptions.FirstOrDefault(x => x.ApiKey == apiKey && x.ActionType == actionType);
        }

        public virtual ICriteria CreateCriteria(SimpleApiRequest request, RequestOption requestOption)
        {
            var criteria = ActivatorUtilities.CreateInstance(serviceProvider, requestOption.CriteriaType) as ICriteria;
            ObjectHelper.CopyProperties(request.Data, criteria);
            if (!criteria.IsValid())
            {
                throw new InvalidOperationException("Invalid criteria");
            }

            return criteria;
        }

        public virtual ICriteria CreateCriteria(IQueryCollection queryCollection, RequestOption requestOption)
        {
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
