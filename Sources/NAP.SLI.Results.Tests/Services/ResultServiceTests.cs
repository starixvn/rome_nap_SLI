namespace NAP.SLI.Results.Tests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoFixture;
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
            IReportService reportService,
            GetSportsRequest request,
            IEnumerable<SportModel> fetchData
            )
        {
            // Arrange
            var service = new ResultService(dynamicRepositoryEx, reportService);
            dynamicRepositoryEx.FetchAsync<SportModel>(Arg.Any<GetSportsCriteria>())
                            .Returns(Task.FromResult(fetchData));

            // Act
            var result = await service.GetSports(request);

            // Assert
            await dynamicRepositoryEx.Received()
                                .FetchAsync<SportModel>(
                                    Arg.Is<GetSportsCriteria>(c => c.EventDate == request.EventDate));
            Assert.Equal(fetchData, result);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_GetResultLeagueByDate(
            IDynamicRepositoryEx dynamicRepositoryEx,
            IReportService reportService,
            GetLeaguesRequest request,
            IEnumerable<LeagueModel> fetchData
            )
        {
            // Arrange
            var service = new ResultService(dynamicRepositoryEx, reportService);
            dynamicRepositoryEx.FetchAsync<LeagueModel>(Arg.Any<GetLeaguesCriteria>())
                            .Returns(Task.FromResult(fetchData));

            // Act
            var result = await service.GetLeagues(request);

            // Assert
            await dynamicRepositoryEx.Received()
                                .FetchAsync<LeagueModel>(
                                    Arg.Is<GetLeaguesCriteria>(c => c.EventDate == request.EventDate && c.SportType == request.SportType));
            Assert.Equal(fetchData, result);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_GetNumberGameResult(
            IDynamicRepositoryEx dynamicRepositoryEx,
            IReportService reportService,
            GetResultsByDateRequest request
        )
        {
            // Arrange
            var leagueName = "NumberGame";
            var leagueId = 15223;
            var matchId = 48419635;
            var matchCode = "0001";
            var eventDate = new DateTime(2021, 12, 24);
            var kickOffTime = new DateTime(2021, 12, 24);
            var eventStatus = "Completed";
            var seq = new List<int> { 1, 2, 3 };
            var number = new List<int> { 10, 20, 30 };
            var (fetchData, expectedResults) = CreateFakeData<NumberGameMatch>(leagueName, leagueId, matchId, matchCode, eventDate, kickOffTime, eventStatus, seq, number);
            var service = new ResultService(dynamicRepositoryEx, reportService);
            reportService.GetLeagueName(Arg.Is(leagueId)).Returns(leagueName);
            dynamicRepositoryEx.FetchAsync<ResultModel>(Arg.Any<GetResultsByDateCriteria>())
                                .Returns(Task.FromResult(fetchData));

            // Act
            var results = await service.GetNumberGameResultsByDate(request);

            // Assert
            await dynamicRepositoryEx.Received()
                                    .FetchAsync<ResultModel>(
                                        Arg.Is<GetResultsByDateCriteria>(
                                            c => c.EventDate == request.EventDate && c.SportType == request.SportType && c.LeagueId == request.LeagueId
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
            IReportService reportService,
            GetResultsByDateRequest request
        )
        {
            // Arrange
            var leagueName = "Happy5";
            var leagueId = 15223;
            var matchId = 48419635;
            var matchCode = "0001";
            var eventDate = new DateTime(2021, 12, 24);
            var kickOffTime = new DateTime(2021, 12, 24);
            var eventStatus = "Completed";
            var seq = new List<int> { 1, 2, 3, 4, 5 };
            var number = new List<int> { 10, 20, 30, 40, 50 };
            var (fetchData, expectedResults) = CreateFakeData<Happy5Match>(leagueName, leagueId, matchId, matchCode, eventDate, kickOffTime, eventStatus, seq, number);
            var service = new ResultService(dynamicRepositoryEx, reportService);
            reportService.GetLeagueName(Arg.Is(leagueId)).Returns(leagueName);
            dynamicRepositoryEx.FetchAsync<ResultModel>(Arg.Any<GetResultsByDateCriteria>())
                                .Returns(Task.FromResult(fetchData));

            // Act
            var results = await service.GetHappy5ResultsByDate(request);

            // Assert
            await dynamicRepositoryEx.Received()
                                    .FetchAsync<ResultModel>(
                                        Arg.Is<GetResultsByDateCriteria>(
                                            c => c.EventDate == request.EventDate && c.SportType == request.SportType && c.LeagueId == request.LeagueId
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

        public static (IEnumerable<ResultModel> fetchedResults, IEnumerable<ResultMatch<T>> expectedResults) CreateFakeData<T>(
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
            var fetchedResults = new List<ResultModel>();

            for (var i = 0; i < number.Count; i++)
            {
                fetchedResults.Add(new ResultModel()
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
            var expectedResults = fixture.Build<ResultMatch<T>>()
                                    .With(c => c.LeagueName, leagueName)
                                    .With(c => c.Matches, new List<T>() { numberGame })
                                    .CreateMany(1);

            return (fetchedResults, expectedResults);
        }
    }
}
