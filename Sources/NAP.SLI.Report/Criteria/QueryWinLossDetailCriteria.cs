namespace NAP.SLI.Report.Criteria
{
    using System;
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Report.Models;

    public class QueryWinLossDetailCriteria : CriteriaBase
    {
        private readonly CustomerLevels customerLevel;
        private readonly BalanceUpDayModel balanceUpDayModel;

        public QueryWinLossDetailCriteria(CustomerLevels customerLevel, BalanceUpDayModel balanceUpDayModel)
        {
            this.customerLevel = customerLevel;
            this.balanceUpDayModel = balanceUpDayModel;
        }

        public int CustId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public DateTime BalanceUpDay => balanceUpDayModel.BalanceUpDay;

        public DateTime MoveBetsDay => balanceUpDayModel.MoveBetsDay;

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public int TotalRecords { get; set; }

        public override string GetSettingKey()
        {
            switch (customerLevel)
            {
                case CustomerLevels.Super:
                    return "SLI_Rpt_WinLossDetail_Master";
                case CustomerLevels.Master:
                    return "SLI_Rpt_WinLossDetail_Agent";
                case CustomerLevels.Agent:
                    return "SLI_Rpt_WinLossDetail_Member";
                default:
                    throw new NotImplementedException(nameof(customerLevel));
            }
        }

        public override bool IsValid() => CustId > 0;
    }
}
