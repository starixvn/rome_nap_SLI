namespace NAP.SLI.WinLossDetail.Criteria
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

        [SpParam(Ignored = true)]
        public bool IsHistory { get; set; }

        public int CustId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public DateTime BalanceUpDay => balanceUpDayModel.BalanceUpDay;

        public DateTime MoveBetsDay => balanceUpDayModel.MoveBetsDay;

        public string ProductIds => ((int)Common.Models.ProductIds.NumberGame).ToString();

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public int TotalRecords { get; set; }

        public override string GetSettingKey() => RoleId switch
        {
            (int)CustomerLevels.Super => "SLI_Rpt_WinLossDetail_Master",
            (int)CustomerLevels.Master => "SLI_Rpt_WinLossDetail_Agent",
            (int)CustomerLevels.Agent => "SLI_Rpt_WinLossDetail_Member",
            _ => throw new NotImplementedException(nameof(RoleId))
        };

        public override bool IsValid() => CustId > 0 && RoleId > 0;
    }
}
