namespace NAP.SLI.Results.Criteria
{
    using System;
    using Fanex.Data.Repository;

    public class GetLeaguesCriteria : CriteriaBase
    {
        public DateTime EventDate { get; set; }

        public int SportType { get; set; }

        public override string GetSettingKey() => "U3_Age_Result_LeagueSelByDate";

        public override bool IsValid() => SportType > 0 & EventDate > DateTime.MinValue;
    }
}