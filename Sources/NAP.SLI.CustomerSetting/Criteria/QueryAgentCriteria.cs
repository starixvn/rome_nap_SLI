using Fanex.Data.Repository;

namespace NAP.SLI.CustomerSetting.Criteria
{
    public class QueryAgentCriteria : CriteriaBase
    {
        public int CustId { get; set; }

        public int Mrecommend { get; set; }

        public override string GetSettingKey()
            => "SLI_CustomerSelMCustomer";

        public override bool IsValid()
            => CustId > 0 && Mrecommend > 0;
    }
}