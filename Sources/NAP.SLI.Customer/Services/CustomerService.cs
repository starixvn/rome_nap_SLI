namespace NAP.SLI.Customer.Services
{
    using System.Linq;
    using System.Threading.Tasks;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Customer.Criteria;
    using NAP.SLI.Customer.Models;

    public interface ICustomerService
    {
        Task<CustomerModel> GetInformation(string username);
    }

    public class CustomerService : ICustomerService
    {
        private readonly IDynamicRepositoryEx dynamicRepositoryEx;

        public CustomerService(IDynamicRepositoryEx dynamicRepositoryEx)
        {
            this.dynamicRepositoryEx = dynamicRepositoryEx;
        }

        public async Task<CustomerModel> GetInformation(string username)
        {
            var criteria = new GetInformationCriteria
            {
                Username = username
            };
            var (firstResultSet, secondResultSet) = await dynamicRepositoryEx.FetchMultipleAsync<GeneralInformationModel, HeadlineModel>(criteria).ConfigureAwait(false);
            if (criteria.IsSuccess)
            {
                return new CustomerModel
                {
                    ErrCode = criteria.ErrCode,
                    ErrMsg = criteria.ErrMsg,
                    GeneralInformation = firstResultSet.First(),
                    Headline = secondResultSet.First()
                };
            }

            return new CustomerModel
            {
                ErrCode = criteria.ErrCode,
                ErrMsg = criteria.ErrMsg
            };
        }
    }
}
