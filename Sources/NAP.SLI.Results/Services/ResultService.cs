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
        Task<IEnumerable<SportModel>> GetSports(GetSportsRequest request);
        Task<IEnumerable<LeagueModel>> GetLeagues(GetLeaguesRequest request);
        Task<IEnumerable<ResultMatch<NumberGameMatch>>> GetNumberGameResultsByDate(GetResultsByDateRequest request);
        Task<IEnumerable<ResultMatch<Happy5Match>>> GetHappy5ResultsByDate(GetResultsByDateRequest request);
        Task<IEnumerable<ResultMatch<NumberGameMatch>>> GetNumberGameResultByMatch(GetResultByMatchRequest request);
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

        public async Task<IEnumerable<SportModel>> GetSports(GetSportsRequest request)
        {
            var criteria = new GetSportsCriteria
            {
                EventDate = request.EventDate
            };
            return await dynamicRepositoryEx.FetchAsync<SportModel>(criteria).ConfigureAwait(false);
        }

        public async Task<IEnumerable<LeagueModel>> GetLeagues(GetLeaguesRequest request)
        {
            var criteria = new GetLeaguesCriteria
            {
                EventDate = request.EventDate,
                SportType = request.SportType
            };
            return await dynamicRepositoryEx.FetchAsync<LeagueModel>(criteria).ConfigureAwait(false);
        }

        public async Task<IEnumerable<ResultMatch<NumberGameMatch>>> GetNumberGameResultsByDate(GetResultsByDateRequest request)
        {
            var results = await GetResultsByDate(request).ConfigureAwait(false);
            return MappingResult<NumberGameMatch>(results);
        }

        public async Task<IEnumerable<ResultMatch<Happy5Match>>> GetHappy5ResultsByDate(GetResultsByDateRequest request)
        {
            var results = await GetResultsByDate(request).ConfigureAwait(false);
            return MappingResult<Happy5Match>(results);
        }

        public async Task<IEnumerable<ResultMatch<NumberGameMatch>>> GetNumberGameResultByMatch(GetResultByMatchRequest request)
        {
            var criteria = new GetResultByMatchCriteria
            {
                MatchId = request.MatchId
            };
            var results = await dynamicRepositoryEx.FetchAsync<ResultModel>(criteria).ConfigureAwait(false);
            return MappingResult<NumberGameMatch>(results);
        }

        private async Task<IEnumerable<ResultModel>> GetResultsByDate(GetResultsByDateRequest request)
        {
            var criteria = new GetResultsByDateCriteria
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