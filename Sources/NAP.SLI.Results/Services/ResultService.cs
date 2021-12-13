namespace NAP.SLI.Results.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.RemotingRef;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Results.Criteria;
    using NAP.SLI.Results.Models;
    using NAP.SLI.Results.Requests;

    public interface IResultService
    {
        Task<IEnumerable<ResultSportByDateModel>> GetResultSportByDate(ResultSportByDateRequest request);
        Task<IEnumerable<ResultLeagueByDateModel>> GetResultLeagueByDate(ResultLeagueByDateRequest request);
        Task<IEnumerable<ResultRecord<NumberGameMatch>>> GetNumberGameResult(ResultRequest request);
        Task<IEnumerable<ResultRecord<Happy5Match>>> GetHappy5Result(ResultRequest request);
    }

    public class ResultService : IResultService
    {
        private readonly IDynamicRepositoryEx dynamicRepositoryEx;
        private readonly ICurrentContextService currentContextService;
        private readonly IRemotingRefService remotingRefService;

        public ResultService(IDynamicRepositoryEx dynamicRepositoryEx, ICurrentContextService currentContextService, IRemotingRefService remotingRefService)
        {
            this.dynamicRepositoryEx = dynamicRepositoryEx;
            this.currentContextService = currentContextService;
            this.remotingRefService = remotingRefService;
        }

        public async Task<IEnumerable<ResultSportByDateModel>> GetResultSportByDate(ResultSportByDateRequest request)
        {
            var criteria = new GetResultSportByDateCriteria
            {
                EventDate = request.FromDate
            };
            return await dynamicRepositoryEx.FetchAsync<ResultSportByDateModel>(criteria).ConfigureAwait(false);
        }

        public async Task<IEnumerable<ResultLeagueByDateModel>> GetResultLeagueByDate(ResultLeagueByDateRequest request)
        {
            var languageCode = currentContextService.GetLanguageCode();
            var criteria = new GetResultLeagueByDateCriteria
            {
                EventDate = request.FromDate,
                SportType = request.SportType,
                Language = languageCode
            };
            return await dynamicRepositoryEx.FetchAsync<ResultLeagueByDateModel>(criteria).ConfigureAwait(false);
        }

        public async Task<IEnumerable<ResultRecord<NumberGameMatch>>> GetNumberGameResult(ResultRequest request)
        {
            var languageCode = currentContextService.GetLanguageCode();
            var results = await GetResult(request, languageCode).ConfigureAwait(false);
            return MappingResult<NumberGameMatch>(results, languageCode);
        }

        public async Task<IEnumerable<ResultRecord<Happy5Match>>> GetHappy5Result(ResultRequest request)
        {
            var languageCode = currentContextService.GetLanguageCode();
            var results = await GetResult(request, languageCode).ConfigureAwait(false);
            return MappingResult<Happy5Match>(results, languageCode);
        }

        private async Task<IEnumerable<Result>> GetResult(ResultRequest request, string languageCode)
        {
            var criteria = new GetResultCriteria
            {
                FromDate = request.FromDate,
                SportType = request.SportType,
                LeagueID = request.LeagueId,
                Language = languageCode
            };
            return await dynamicRepositoryEx.FetchAsync<Result>(criteria).ConfigureAwait(false);
        }

        private IEnumerable<ResultRecord<T>> MappingResult<T>(IEnumerable<Result> results, string languageCode) where T : IMatch
        {
            return results.GroupBy(match => new { match.LeagueId }).Select(
                leagueGroup =>
                {
                    var leagueName = remotingRefService.GetLeagueName(leagueGroup.Key.LeagueId.ToString(), languageCode);
                    var matches = new List<T>();

                    foreach (var match in leagueGroup)
                    {
                        var existMatch = matches.SingleOrDefault(res => res.MatchId == match.MatchId);
                        if (existMatch != null)
                        {
                            existMatch.Seq.Add(match.Seq);
                            existMatch.Ball.Add(match.Number);
                        }
                        else
                        {
                            matches.Add((T)Activator.CreateInstance(typeof(T), new object[] { match }));
                        }
                    }

                    return new ResultRecord<T> { LeagueName = leagueName, Matches = matches };
                }
            );
        }
    }
}