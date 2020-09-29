namespace NAP.SLI.Customer.Criterias
{
    using Fanex.Data.Repository;

    public class QueryCustByUsernameCriteria : CriteriaBase
    {
        public string Username { get; set; }

        public override string GetSettingKey()
            => "SLI_CustomerSelAllInfo";

        public override bool IsValid()
            => true;
    }
}
