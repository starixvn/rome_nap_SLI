namespace NAP.SLI.Results.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Results.Criteria;
    using NAP.SLI.Results.Models;
    using NAP.SLI.Results.Requests;

    public interface IResultService
    {
        Task<IEnumerable<SportModel>> GetSports(QuerySportsRequest request);
        Task<IEnumerable<LeagueModel>> GetLeagues(QueryLeaguesRequest request);
        Task<IEnumerable<ResultMatch<NumberGameMatch>>> GetNumberGameResultsByDate(QueryResultsByDateRequest request);
        Task<IEnumerable<ResultMatch<Happy5Match>>> GetHappy5ResultsByDate(QueryResultsByDateRequest request);
        Task<IEnumerable<ResultMatch<NumberGameMatch>>> GetNumberGameResultsByMatch(QueryResultsByMatchRequest request);
    }

    public class ResultService : IResultService
    {
        private readonly IDynamicRepositoryEx dynamicRepositoryEx;
        private readonly IReportService reportService;

        public ResultService(IDynamicRepositoryEx dynamicRepositoryEx, IReportService reportService)
        {
            this.dynamicRepositoryEx = dynamicRepositoryEx;
            this.reportService = reportService;
        }

        public async Task<IEnumerable<SportModel>> GetSports(QuerySportsRequest request)
        {
            var criteria = new QuerySportsCriteria
            {
                EventDate = request.EventDate
            };
            return await dynamicRepositoryEx.FetchAsync<SportModel>(criteria).ConfigureAwait(false);
        }

        public async Task<IEnumerable<LeagueModel>> GetLeagues(QueryLeaguesRequest request)
        {
            var criteria = new QueryLeaguesCriteria
            {
                EventDate = request.EventDate,
                SportType = request.SportType
            };
            return await dynamicRepositoryEx.FetchAsync<LeagueModel>(criteria).ConfigureAwait(false);
        }

        public async Task<IEnumerable<ResultMatch<NumberGameMatch>>> GetNumberGameResultsByDate(QueryResultsByDateRequest request)
        {
            var results = await GetResultsByDate(request).ConfigureAwait(false);
            return MappingResult<NumberGameMatch>(results);
        }

        public async Task<IEnumerable<ResultMatch<Happy5Match>>> GetHappy5ResultsByDate(QueryResultsByDateRequest request)
        {
            var results = await GetResultsByDate(request).ConfigureAwait(false);
            return MappingResult<Happy5Match>(results);
        }

        public async Task<IEnumerable<ResultMatch<NumberGameMatch>>> GetNumberGameResultsByMatch(QueryResultsByMatchRequest request)
        {
            var criteria = new QueryResultsByMatchCriteria
            {
                MatchId = request.MatchId
            };
            var results = await dynamicRepositoryEx.FetchAsync<ResultModel>(criteria).ConfigureAwait(false);
            return MappingResult<NumberGameMatch>(results);
        }

        private async Task<IEnumerable<ResultModel>> GetResultsByDate(QueryResultsByDateRequest request)
        {
            var criteria = new QueryResultsByDateCriteria
            {
                EventDate = request.EventDate,
                SportType = request.SportType,
                LeagueId = request.LeagueId
            };
            return await dynamicRepositoryEx.FetchAsync<ResultModel>(criteria).ConfigureAwait(false);
        }

        private IEnumerable<ResultMatch<T>> MappingResult<T>(IEnumerable<ResultModel> results) where T : IMatch
        {
            return results.GroupBy(match => new { match.LeagueId }).Select(
                leagueGroup =>
                {
                    var leagueName = reportService.GetLeagueName(leagueGroup.Key.LeagueId);
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

                    return new ResultMatch<T> { LeagueName = leagueName, Matches = matches };
                }
            );
        }
    }
}