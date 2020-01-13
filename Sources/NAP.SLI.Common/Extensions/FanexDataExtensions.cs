namespace NAP.SLI.Common.Extensions
{
    using Fanex.Data.Repository;
    using System;

    public static class FanexDataExtensions
    {
        public static void ThrowExceptionIsInvalid(this CriteriaBase criteria)
        {
            if (criteria.IsInvalid())
            {
                throw new InvalidOperationException("Invalid criteria");
            }
        }
    }
}
