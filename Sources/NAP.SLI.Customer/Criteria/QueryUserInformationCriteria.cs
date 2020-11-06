namespace NAP.SLI.Customer.Criteria
{
    using Fanex.Data.Repository;

    public class QueryUserInformationCriteria : CriteriaBase
    {
        public string Username { get; set; }

        public override string GetSettingKey()
            => "SLI_CustomerSelAllInfo";

        public override bool IsValid()
            => !string.IsNullOrWhiteSpace(Username);
    }
}
