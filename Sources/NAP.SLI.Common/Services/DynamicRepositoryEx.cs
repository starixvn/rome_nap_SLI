namespace NAP.SLI.Common.Services
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using Fanex.Data;
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Criteria;
    using NAP.SLI.Common.Extensions;

    public interface IDynamicRepositoryEx
    {
        Task<(IEnumerable<TFirst> firstResultSet, IEnumerable<TSecond> secondResultSet)> FetchMultipleAsync<TFirst, TSecond>(ICriteria criteria);
    }

    public class DynamicRepositoryEx : IDynamicRepositoryEx
    {
        public Task<(IEnumerable<TFirst> firstResultSet, IEnumerable<TSecond> secondResultSet)> FetchMultipleAsync<TFirst, TSecond>(ICriteria criteria)
            => FetchMultipleAsync<TFirst, TSecond>(criteria, default);

        public async Task<(IEnumerable<TFirst> firstResultSet, IEnumerable<TSecond> secondResultSet)> FetchMultipleAsync<TFirst, TSecond>(
            ICriteria criteria,
            CancellationToken cancellationToken)
        {
            var mappingTypes = new[] { typeof(TFirst), typeof(TSecond) };
            var fetchedData = await FetchMultipleAsync(criteria, mappingTypes, cancellationToken).ConfigureAwait(false);
            var firstResultSet = fetchedData[0].Cast<TFirst>();
            var secondResultSet = fetchedData[1].Cast<TSecond>();
            return (firstResultSet, secondResultSet);
        }

        private async Task<IEnumerable<object>[]> FetchMultipleAsync(
            ICriteria criteria,
            Type[] mappingTypes,
            CancellationToken cancellationToken)
        {
            var result = InitializeFetchMultipleResultSet(mappingTypes);
            criteria.ThrowExceptionIfInvalid();

            using (var objectDb = ObjectDbFactory.CreateInstance(criteria.GetSettingKey()))
            {
                using (var multiResultReader = await objectDb.QueryMultipleAsync(criteria, cancellationToken: cancellationToken).ConfigureAwait(false))
                {
                    UpdateCriteria(criteria, objectDb.GetOutputParams());
                    var resultCriteria = criteria as ResultCriteriaBase;
                    var index = 0;

                    if (resultCriteria != null && !resultCriteria.IsSuccessful)
                    {
                        while (index < mappingTypes.Length)
                        {
                            result[index] = Enumerable.Empty<object>();
                            index++;
                        }
                    }

                    while (!multiResultReader.IsEmptyOrClosed && index < mappingTypes.Length)
                    {
                        result[index] = await multiResultReader.ReadAsync(mappingTypes[index]).ConfigureAwait(false);
                        index++;
                    }
                }
            }

            return result;
        }

        private static void UpdateCriteria(ICriteria criteria, Hashtable outputParams)
        {
            var properties = criteria.GetType().GetProperties();
            foreach (var key in outputParams.Keys)
            {
                var lowerKey = key.ToString().ToLowerInvariant();
                foreach (var property in properties)
                {
                    if (lowerKey == property.Name.ToLowerInvariant())
                    {
                        property.SetValue(criteria, outputParams[key]);
                        break;
                    }
                }
            }
        }

        private static IEnumerable<object>[] InitializeFetchMultipleResultSet(Type[] mappingTypes)
        {
            if (mappingTypes == null || mappingTypes.Length == 0)
            {
                throw new ArgumentException($"{nameof(mappingTypes)} is null or empty.", nameof(mappingTypes));
            }

            if (mappingTypes.Any(type => type == null))
            {
                throw new ArgumentException($"{nameof(mappingTypes)} must not contain any null value.", nameof(mappingTypes));
            }

            var result = new IEnumerable<object>[mappingTypes.Length];

            for (var index = 0; index < mappingTypes.Length; index++)
            {
                result[index] = Enumerable.Empty<object>();
            }

            return result;
        }

    }
}
