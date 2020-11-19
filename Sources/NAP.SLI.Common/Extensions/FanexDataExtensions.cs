namespace NAP.SLI.Common.Extensions
{
    using System;
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Criteria;

    public static class FanexDataExtensions
    {
        public static void ThrowExceptionIfInvalid(this ICriteria criteria)
        {
            if (!criteria.IsValid())
            {
                throw new InvalidOperationException("Invalid criteria");
            }
        }

        public static void ThrowExceptionIfFailed(this ResultCriteriaBase result)
        {
            if (!result.IsSuccessful)
            {
                throw new InvalidOperationException(result.ErrMsg);
            }
        }
    }
}
