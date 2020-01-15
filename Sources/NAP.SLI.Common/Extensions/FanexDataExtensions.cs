namespace NAP.SLI.Common.Extensions
{
    using Fanex.Data.Repository;
    using System;

    public static class FanexDataExtensions
    {
        public static void ThrowExceptionIsInvalid(this ICriteria criteria)
        {
            if (!criteria.IsValid())
            {
                throw new InvalidOperationException("Invalid criteria");
            }
        }
    }
}
