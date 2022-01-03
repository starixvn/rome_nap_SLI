namespace NAP.SLI.Results.Criteria
{
    using System;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetResultCriteria : CriteriaBase
    {
        [SpParam(SqlParamName = "FromDate")]
        public DateTime EventDate { get; set; }

        public int LeagueID { get; set; }

        public string Language { get; set; }

        public int SportType { get; set; }

        public override string GetSettingKey() => "U3_Result_MatchSelNumberGameByLeague";

        public override bool IsValid() => EventDate > DateTime.MinValue;
    }
}