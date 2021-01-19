namespace NAP.SLI.WinLossAnalysis.Criteria
{
    using System;
    using Fanex.Data;
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Models;

    public class WinLossAnalysisQueryCriteria : CriteriaBase
    {
        private readonly BalanceUpDayModel balanceUpDayModel;

        public WinLossAnalysisQueryCriteria(BalanceUpDayModel balanceUpDayModel)
        {
            this.balanceUpDayModel = balanceUpDayModel;
        }

        [SpParam(Ignored = true)]
        public int RoleId { get; set; }

        public int CustId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int ReportType { get; set; }

        public DateTime BalanceUpDay => balanceUpDayModel.BalanceUpDay;

        public DateTime MoveBetsDay => balanceUpDayModel.MoveBetsDay;

        public override string GetSettingKey()
        {
            switch (RoleId)
            {
                case (int)CustomerLevels.Super:
                    return "SLI_Rpt_WinLossAnalysis_Master";
                case (int)CustomerLevels.Master:
                    return "SLI_Rpt_WinLossAnalysis_Agent";
                case (int)CustomerLevels.Agent:
                    return "SLI_Rpt_WinLossAnalysis_Member";
                default:
                    throw new NotImplementedException(nameof(RoleId));
            }
        }

        public override bool IsValid() => CustId > 0 && ReportType > 0;
    }
}
