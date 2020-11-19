namespace NAP.SLI.Report.Services
{
    using Fanex.Data.Repository;
    using NAP.SLI.Report.Criteria;
    using NAP.SLI.Report.Models;

    public interface IReportService
    {
        BalanceUpDayModel GetBalanceUpDay();
    }

    public class ReportService : IReportService
    {
        private readonly IDynamicRepository dynamicRepository;

        public ReportService(IDynamicRepository dynamicRepository)
        {
            this.dynamicRepository = dynamicRepository;
        }

        public BalanceUpDayModel GetBalanceUpDay()
        {
            return dynamicRepository.Get<BalanceUpDayModel>(new GetBalanceUpDayCriteria());
        }
    }
}
