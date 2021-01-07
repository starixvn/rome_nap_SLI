namespace NAP.SLI.Common.Services
{
    using System.Threading.Tasks;
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Criteria;
    using NAP.SLI.Common.Models;

    public interface IReportService
    {
        Task<BalanceUpDayModel> GetBalanceUpDay();
    }

    public class ReportService : IReportService
    {
        private readonly IDynamicRepository dynamicRepository;

        public ReportService(IDynamicRepository dynamicRepository)
        {
            this.dynamicRepository = dynamicRepository;
        }

        public async Task<BalanceUpDayModel> GetBalanceUpDay()
        {
            return await dynamicRepository.GetAsync<BalanceUpDayModel>(new GetBalanceUpDayCriteria()).ConfigureAwait(false);
        }
    }
}
