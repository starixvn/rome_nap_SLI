using Fanex.Data.Repository;

namespace NAP.SLI.CustomerSetting.Criteria
{
    public class QueryAgentCriteria : CriteriaBase
    {
        public int CustId { get; set; }

        public override string GetSettingKey()
            => "SLI_CustomerSelMCustomer";

        public override bool IsValid()
            => CustId > 0;
    }
}