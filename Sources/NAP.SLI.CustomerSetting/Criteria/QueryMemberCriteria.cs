using Fanex.Data.Repository;

namespace NAP.SLI.CustomerSetting.Criteria
{
    public class QueryMemberCriteria : CriteriaBase
    {
        public int CustId { get; set; }

        public override string GetSettingKey()
            => "SLI_CustomerSelCustomer";

        public override bool IsValid()
            => CustId > 0;
    }
}