namespace NAP.SLI.Customer.Criteria
{
    using NAP.SLI.Common.Criteria;

    public class GetInformationCriteria : ResultCriteriaBase
    {
        public string Username { get; set; }

        public override string GetSettingKey() => "SLI_CustomerSelAllInfo";

        public override bool IsValid() => !string.IsNullOrWhiteSpace(Username);
    }
}
