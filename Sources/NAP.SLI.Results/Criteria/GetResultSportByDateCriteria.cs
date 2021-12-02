namespace NAP.SLI.Results.Criteria
{
    using System;
    using Fanex.Data.Repository;

    public class GetResultSportByDateCriteria : CriteriaBase
    {
        public DateTime EventDate { get; set; }

        public override string GetSettingKey() => "U3_Result_SportSelByDate";

        public override bool IsValid() => EventDate > DateTime.MinValue;
    }
}