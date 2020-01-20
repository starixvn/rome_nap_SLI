namespace NAP.SLI.Common.Extensions
{
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Models;
    using System;

    public static class FanexDataExtensions
    {
        public static void ThrowExceptionIfInvalid(this ICriteria criteria)
        {
            if (!criteria.IsValid())
            {
                throw new InvalidOperationException("Invalid criteria");
            }
        }

        public static void ThrowExceptionIfFailed(this NonQueryResult result)
        {
            if (!result.IsSuccessful)
            {
                throw new InvalidOperationException(result.ErrMsg);
            }
        }
    }
}
