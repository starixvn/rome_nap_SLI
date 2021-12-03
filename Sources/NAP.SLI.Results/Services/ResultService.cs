namespace NAP.SLI.Results.Services
{
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
        Task<IEnumerable<ResultRecordModel>> GetNumberGameResult(ResultRequest request);
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
                SportType = request.SportId,
                Language = languageCode
            };
            return await dynamicRepositoryEx.FetchAsync<ResultLeagueByDateModel>(criteria).ConfigureAwait(false);
        }

        public async Task<IEnumerable<ResultRecordModel>> GetNumberGameResult(ResultRequest request)
        {
            var languageCode = currentContextService.GetLanguageCode();
            var criteria = new GetResultCriteria
            {
                FromDate = request.FromDate,
                SportType = request.SportType,
                LeagueID = request.LeagueId,
                Language = languageCode
            };
            var results = await dynamicRepositoryEx.FetchAsync<Result>(criteria).ConfigureAwait(false);
            return MappingResults(results, languageCode);
        }

        private IEnumerable<ResultRecordModel> MappingResults(IEnumerable<Result> results, string languageCode)
        {
            return results.GroupBy(match => new { match.LeagueId }).Select(
                leagueGroup =>
                {
                    var leagueName = remotingRefService.GetLeagueName(leagueGroup.Key.LeagueId.ToString(), languageCode);
                    var matches = new List<ResultModel>();

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
                            matches.Add(new ResultModel
                            {
                                LeagueId = match.LeagueId,
                                MatchId = match.MatchId,
                                EventStatus = match.EventStatus,
                                EventDate = match.EventDate,
                                KickOffTime = match.KickOffTime,
                                MatchCode = match.MatchCode,
                                Seq = new List<int> { match.Seq },
                                Ball = new List<int> { match.Number }
                            });
                        }
                    }

                    return new ResultRecordModel { LeagueName = leagueName, Matches = matches };
                }
            );
        }
    }
}