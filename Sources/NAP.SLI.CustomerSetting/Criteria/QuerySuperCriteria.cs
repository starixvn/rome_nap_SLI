using Fanex.Data.Repository;

namespace NAP.SLI.CustomerSetting.Criteria
{
    public class QuerySuperCriteria : CriteriaBase
    {
        public int CustId { get; set; }

        public override string GetSettingKey()
            => "SLI_CustomerSelCCustomer";

        public override bool IsValid()
            => CustId > 0;
    }
}