namespace NAP.SLI.Report.Criteria
{
    using Fanex.Data.Repository;

    public class GetBalanceUpDayCriteria : CriteriaBase
    {
        public override string GetSettingKey() => "Age_SelBalanceUpDay";

        public override bool IsValid() => true;
    }
}
