namespace NAP.SLI.Report.Criteria
{
    using System;
    using Fanex.Data;
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Report.Models;

    public class QueryWinLossDetailCriteria : CriteriaBase
    {
        private readonly BalanceUpDayModel balanceUpDayModel;

        public QueryWinLossDetailCriteria(int roleId, bool isHistory, BalanceUpDayModel balanceUpDayModel)
        {
            RoleId = roleId;
            IsHistory = isHistory;
            this.balanceUpDayModel = balanceUpDayModel;
        }

        [SpParam(Ignored = true)]
        public int RoleId { get; }

        [SpParam(Ignored = true)]
        public bool IsHistory { get; }

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
            switch (RoleId)
            {
                case (int)CustomerLevels.Super:
                    return "SLI_Rpt_WinLossDetail_Master";
                case (int)CustomerLevels.Master:
                    return "SLI_Rpt_WinLossDetail_Agent";
                case (int)CustomerLevels.Agent:
                    return "SLI_Rpt_WinLossDetail_Member";
                default:
                    throw new NotImplementedException(nameof(RoleId));
            }
        }

        public override bool IsValid() => CustId > 0;
    }
}
