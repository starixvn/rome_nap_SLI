namespace NAP.SimpleApi.Helpers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public static class FanexDataExtensions
    {
        public static Task<IEnumerable<IEnumerable<object>>> FetchMultipleAsync(this IDynamicRepository dynamicRepository, ICriteria criteria)
        {
            return FetchMultipleAsync(dynamicRepository, criteria, default);
        }

        public static Task<IEnumerable<IEnumerable<object>>> FetchMultipleAsync(this IDynamicRepository dynamicRepository, ICriteria criteria, CancellationToken cancellationToken)
        {
            if (criteria == null)
            {
                throw new ArgumentNullException(nameof(criteria));
            }

            return FetchMultipleAsync(criteria, cancellationToken);
        }

        private static async Task<IEnumerable<IEnumerable<object>>> FetchMultipleAsync(ICriteria criteria, CancellationToken cancellationToken)
        {
            if (!criteria.IsValid())
            {
                return Enumerable.Empty<IEnumerable<object>>();
            }

            var list = new List<IEnumerable<object>>();
            using var objectDb = ObjectDbFactory.CreateInstance(criteria.GetSettingKey());
            using var multiResultReader = await objectDb.QueryMultipleAsync(criteria, cancellationToken: cancellationToken).ConfigureAwait(false);
            while (!multiResultReader.IsEmptyOrClosed)
            {
                var result = await multiResultReader.ReadAsync<object>().ConfigureAwait(false);
                list.Add(result);
            }

            return list;
        }
    }
}
