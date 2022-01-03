namespace NAP.SLI.Results.Tests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoFixture;
    using Fanex.RemotingRef;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Results.Criteria;
    using NAP.SLI.Results.Models;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;
    using NAP.SLI.Tests;
    using NSubstitute;
    using Xunit;

    public class ResultServiceTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_GetResultSportByDate(
            IDynamicRepositoryEx dynamicRepositoryEx,
            ICurrentContextService currentContextService,
            IRemotingRefService remotingRefService,
            ResultSportByDateRequest request,
            IEnumerable<ResultSportByDateModel> fetchData
            )
        {
            // Arrange
            var service = new ResultService(dynamicRepositoryEx, currentContextService, remotingRefService);
            dynamicRepositoryEx.FetchAsync<ResultSportByDateModel>(Arg.Any<GetResultSportByDateCriteria>())
                            .Returns(Task.FromResult(fetchData));

            // Act
            var result = await service.GetResultSportByDate(request);

            // Assert
            await dynamicRepositoryEx.Received()
                                .FetchAsync<ResultSportByDateModel>(
                                    Arg.Is<GetResultSportByDateCriteria>(c => c.EventDate == request.EventDate));
            Assert.Equal(fetchData, result);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_GetResultLeagueByDate(
            IDynamicRepositoryEx dynamicRepositoryEx,
            ICurrentContextService currentContextService,
            IRemotingRefService remotingRefService,
            ResultLeagueByDateRequest request,
            IEnumerable<ResultLeagueByDateModel> fetchData
            )
        {
            // Arrange
            var service = new ResultService(dynamicRepositoryEx, currentContextService, remotingRefService);
            currentContextService.GetLanguageCode().Returns("en-US");
            dynamicRepositoryEx.FetchAsync<ResultLeagueByDateModel>(Arg.Any<GetResultLeagueByDateCriteria>())
                            .Returns(Task.FromResult(fetchData));

            // Act
            var result = await service.GetResultLeagueByDate(request);

            // Assert
            await dynamicRepositoryEx.Received()
                                .FetchAsync<ResultLeagueByDateModel>(
                                    Arg.Is<GetResultLeagueByDateCriteria>(c => c.EventDate == request.EventDate && c.SportType == request.SportType && c.Language == "en-US"));
            Assert.Equal(fetchData, result);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_GetNumberGameResult(
            IDynamicRepositoryEx dynamicRepositoryEx,
            ICurrentContextService currentContextService,
            IRemotingRefService remotingRefService,
            ResultRequest request
        )
        {
            // Arrange
            var leagueName = "NumberGame";
            var leagueId = 15223;
            var languageCode = "en-Us";
            var matchId = 48419635;
            var matchCode = "0001";
            var eventDate = new DateTime(2021, 12, 24);
            var kickOffTime = new DateTime(2021, 12, 24);
            var eventStatus = "Completed";
            var seq = new List<int> { 1, 2, 3 };
            var number = new List<int> { 10, 20, 30 };
            var (fetchData, expectedResults) = CreateFakeData<NumberGameMatch>(leagueName, leagueId, matchId, matchCode, eventDate, kickOffTime, eventStatus, seq, number);
            var service = new ResultService(dynamicRepositoryEx, currentContextService, remotingRefService);
            currentContextService.GetLanguageCode().Returns(languageCode);
            remotingRefService.GetLeagueName(Arg.Is(leagueId.ToString()), Arg.Is(languageCode)).Returns(leagueName);
            dynamicRepositoryEx.FetchAsync<Result>(Arg.Any<GetResultCriteria>())
                                .Returns(Task.FromResult(fetchData));

            // Act
            var results = await service.GetNumberGameResult(request);

            // Assert
            await dynamicRepositoryEx.Received()
                                    .FetchAsync<Result>(
                                        Arg.Is<GetResultCriteria>(
                                            c => c.EventDate == request.EventDate && c.SportType == request.SportType && c.LeagueID == request.LeagueId && c.Language == languageCode
                                        ));
            var firstExpectedResult = expectedResults.ElementAt(0);
            var firstResult = results.ElementAt(0);
            var firstExpectedResultMatch = firstExpectedResult.Matches.ElementAt(0);
            var firstResultMatch = firstResult.Matches.ElementAt(0);
            Assert.Equal(firstExpectedResult.LeagueName, firstResult.LeagueName);
            Assert.Equal(firstExpectedResultMatch.MatchId, firstResultMatch.MatchId);
            Assert.Equal(firstExpectedResultMatch.MatchCode, firstResultMatch.MatchCode);
            Assert.Equal(firstExpectedResultMatch.KickOffTime, firstResultMatch.KickOffTime);
            Assert.Equal(firstExpectedResultMatch.EventStatus, firstResultMatch.EventStatus);
            Assert.Equal(firstExpectedResultMatch.FirstBall.Number, firstResultMatch.FirstBall.Number);
            Assert.Equal(firstExpectedResultMatch.SecondBall.Number, firstResultMatch.SecondBall.Number);
            Assert.Equal(firstExpectedResultMatch.ThirdBall.Number, firstResultMatch.ThirdBall.Number);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_GetHappy5Result(
            IDynamicRepositoryEx dynamicRepositoryEx,
            ICurrentContextService currentContextService,
            IRemotingRefService remotingRefService,
            ResultRequest request
        )
        {
            // Arrange
            var leagueName = "Happy5";
            var leagueId = 15223;
            var languageCode = "en-Us";
            var matchId = 48419635;
            var matchCode = "0001";
            var eventDate = new DateTime(2021, 12, 24);
            var kickOffTime = new DateTime(2021, 12, 24);
            var eventStatus = "Completed";
            var seq = new List<int> { 1, 2, 3, 4, 5 };
            var number = new List<int> { 10, 20, 30, 40, 50 };
            var (fetchData, expectedResults) = CreateFakeData<Happy5Match>(leagueName, leagueId, matchId, matchCode, eventDate, kickOffTime, eventStatus, seq, number);
            var service = new ResultService(dynamicRepositoryEx, currentContextService, remotingRefService);
            currentContextService.GetLanguageCode().Returns(languageCode);
            remotingRefService.GetLeagueName(Arg.Is(leagueId.ToString()), Arg.Is(languageCode)).Returns(leagueName);
            dynamicRepositoryEx.FetchAsync<Result>(Arg.Any<GetResultCriteria>())
                                .Returns(Task.FromResult(fetchData));

            // Act
            var results = await service.GetHappy5Result(request);

            // Assert
            await dynamicRepositoryEx.Received()
                                    .FetchAsync<Result>(
                                        Arg.Is<GetResultCriteria>(
                                            c => c.EventDate == request.EventDate && c.SportType == request.SportType && c.LeagueID == request.LeagueId && c.Language == languageCode
                                        ));
            var firstExpectedResult = expectedResults.ElementAt(0);
            var firstResult = results.ElementAt(0);
            var firstExpectedResultMatch = firstExpectedResult.Matches.ElementAt(0);
            var firstResultMatch = firstResult.Matches.ElementAt(0);
            Assert.Equal(firstExpectedResult.LeagueName, firstResult.LeagueName);
            Assert.Equal(firstExpectedResultMatch.MatchId, firstResultMatch.MatchId);
            Assert.Equal(firstExpectedResultMatch.MatchCode, firstResultMatch.MatchCode);
            Assert.Equal(firstExpectedResultMatch.KickOffTime, firstResultMatch.KickOffTime);
            Assert.Equal(firstExpectedResultMatch.EventStatus, firstResultMatch.EventStatus);
            Assert.Equal(firstExpectedResultMatch.FirstBall.Number, firstResultMatch.FirstBall.Number);
            Assert.Equal(firstExpectedResultMatch.SecondBall.Number, firstResultMatch.SecondBall.Number);
            Assert.Equal(firstExpectedResultMatch.ThirdBall.Number, firstResultMatch.ThirdBall.Number);
            Assert.Equal(firstExpectedResultMatch.FourthBall.Number, firstResultMatch.FourthBall.Number);
            Assert.Equal(firstExpectedResultMatch.FifthBall.Number, firstResultMatch.FifthBall.Number);
        }

        public static (IEnumerable<Result> fetchedResults, IEnumerable<ResultRecord<T>> expectedResults) CreateFakeData<T>(
            string leagueName,
            int leagueId,
            int matchId,
            string matchCode,
            DateTime eventDate,
            DateTime kickOffTime,
            string eventStatus,
            List<int> seq,
            List<int> number
        ) where T : IMatch
        {
            var fetchedResults = new List<Result>();

            for (var i = 0; i < number.Count; i++)
            {
                fetchedResults.Add(new Result()
                {
                    LeagueId = leagueId,
                    MatchId = matchId,
                    MatchCode = matchCode,
                    EventDate = eventDate,
                    KickOffTime = kickOffTime,
                    EventStatus = eventStatus,
                    Seq = seq[i],
                    Number = number[i]
                });
            }

            // var numberGame = new NumberGameMatch(fetchedResults[0]);
            var numberGame = (T)Activator.CreateInstance(typeof(T), new object[] { fetchedResults[0] });
            for (var i = 1; i < number.Count; i++)
            {
                numberGame.Seq.Add(seq[i]);
                numberGame.Ball.Add(number[i]);
            }

            var fixture = new Fixture();
            var expectedResults = fixture.Build<ResultRecord<T>>()
                                    .With(c => c.LeagueName, leagueName)
                                    .With(c => c.Matches, new List<T>() { numberGame })
                                    .CreateMany(1);

            return (fetchedResults, expectedResults);
        }
    }
}
