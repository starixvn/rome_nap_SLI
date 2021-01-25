namespace NAP.SLI.Customer.Tests.Criteria
{
    using NAP.SLI.Common.Services;
    using NAP.SLI.Customer.Criteria;
    using NAP.SLI.Tests;
    using Xunit;

    public class QueryUsernameSuggestionCriteriaTests
    {
        [Theory]
        [AutoDomainData]
        public void TestProperties(ICurrentUserService currentUserService)
        {
            //Arrange
            var criteria = new QueryUsernameSuggestionCriteria(currentUserService);

            //Act

            //Assert
            Assert.Equal(criteria.CustId, currentUserService.UserId);
        }
    }
}