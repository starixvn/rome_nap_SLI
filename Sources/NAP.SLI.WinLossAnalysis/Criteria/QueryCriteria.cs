namespace NAP.SLI.WinLossAnalysis.Criteria
{
    using System;
    using Fanex.Data;
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Models;

    public class QueryCriteria : CriteriaBase
    {
        private readonly BalanceUpDayModel balanceUpDayModel;

        public QueryCriteria(BalanceUpDayModel balanceUpDayModel)
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
            return RoleId switch
            {
                (int)CustomerLevels.Super => "SLI_Rpt_WinLossAnalysis_Master",
                (int)CustomerLevels.Master => "SLI_Rpt_WinLossAnalysis_Agent",
                (int)CustomerLevels.Agent => "SLI_Rpt_WinLossAnalysis_Member",
                _ => throw new NotImplementedException(nameof(RoleId)),
            };
        }

        public override bool IsValid() => CustId > 0 && ReportType > 0;
    }
}
