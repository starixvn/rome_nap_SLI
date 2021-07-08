using Fanex.Data.Repository;

namespace NAP.SLI.CustomerSetting.Criteria
{
    public class QueryMasterCriteria : CriteriaBase
    {
        public int CustId { get; set; }

        public int Srecommend { get; set; }

        public override string GetSettingKey()
            => "SLI_CustomerSelSCustomer";

        public override bool IsValid()
            => CustId > 0 && Srecommend > 0;
    }
}