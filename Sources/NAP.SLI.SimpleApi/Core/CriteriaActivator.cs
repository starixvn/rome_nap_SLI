namespace NAP.SLI.SimpleApi.Core
{
    using Fanex.Data.Repository;
    using System;

    public interface ICriteriaActivator
    {
        ICriteria CreateInstance(RequestOption request);
    }

    public class CriteriaActivator: ICriteriaActivator
    {
        public virtual ICriteria CreateInstance(RequestOption request)
        {
            return (ICriteria)Activator.CreateInstance(request.CriteriaType);
        }
    }
}
