namespace NAP.SLI.Report.Services
{
    using System.Threading.Tasks;
    using Fanex.Data.Repository;
    using NAP.SLI.Report.Criteria;
    using NAP.SLI.Report.Models;

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
