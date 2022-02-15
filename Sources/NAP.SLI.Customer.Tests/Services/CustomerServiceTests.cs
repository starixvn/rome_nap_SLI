namespace NAP.SLI.Customer.Tests.Services
{
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using AutoFixture;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Customer.Criteria;
    using NAP.SLI.Customer.Models;
    using NAP.SLI.Customer.Services;
    using NAP.SLI.Tests;
    using NSubstitute;
    using Xunit;
    using System.Linq;

    public class CustomerServiceTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_GetInformation_Success(
            IDynamicRepositoryEx dynamicRepositoryEx,
            string username,
            (IEnumerable<GeneralInformationModel>, IEnumerable<HeadlineModel>) fetchData)
        {
            //Arrange
            var service = new CustomerService(dynamicRepositoryEx);

            dynamicRepositoryEx
                .FetchMultipleAsync<GeneralInformationModel, HeadlineModel>(Arg.Is<GetInformationCriteria>(x => x.Username == username))
                .Returns(fetchData);

            //Act
            var result = await service.GetInformation(username);

            //Assert
            await dynamicRepositoryEx.Received().FetchMultipleAsync<GeneralInformationModel, HeadlineModel>(Arg.Is<GetInformationCriteria>(criteria => criteria.Username == username));
            Assert.Equal(fetchData.Item1.First(), result.GeneralInformation);
            Assert.Equal(fetchData.Item2.First(), result.Headline);
        }
    }
}