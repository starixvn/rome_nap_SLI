using Fanex.Data.Repository;

namespace NAP.SLI.CustomerSetting.Criteria
{
    public class QueryAgentCriteria : CriteriaBase
    {
        public int CustId { get; set; }

        public int MRecommend { get; set; }

        public override string GetSettingKey()
            => "SLI_CustomerSelMCustomer";

        public override bool IsValid()
            => CustId > 0 && MRecommend > 0;
    }
}