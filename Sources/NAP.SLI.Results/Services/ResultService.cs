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
        Task<IEnumerable<NumberGameRecordModel>> GetNumberGameResult(NumberGameResultRequest request);
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

        public async Task<IEnumerable<NumberGameRecordModel>> GetNumberGameResult(NumberGameResultRequest request)
        {
            var languageCode = currentContextService.GetLanguageCode();
            var criteria = new GetNumberGameResultCriteria
            {
                FromDate = request.FromDate,
                SportType = request.SportType,
                LeagueID = request.LeagueId,
                Language = languageCode
            };
            var numberGames = await dynamicRepositoryEx.FetchAsync<NumberGame>(criteria).ConfigureAwait(false);
            return MappingNumberGame(numberGames, languageCode);
        }

        private IEnumerable<NumberGameRecordModel> MappingNumberGame(IEnumerable<NumberGame> numberGames, string languageCode)
        {
            return numberGames.GroupBy(match => new { match.LeagueId }).Select(
                leagueGroup =>
                {
                    var leagueName = remotingRefService.GetLeagueName(leagueGroup.Key.LeagueId.ToString(), languageCode);
                    var matches = new List<NumberGameModel>();

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
                            matches.Add(new NumberGameModel
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

                    return new NumberGameRecordModel { LeagueName = leagueName, Matches = matches };
                }
            );
        }
    }
}