namespace NAP.SLI.Results.Criteria
{
    using System;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class QueryResultsByDateCriteria : CriteriaBase
    {
        [SpParam(SqlParamName = "FromDate")]
        public DateTime EventDate { get; set; }

        public int SportType { get; set; }

        public int LeagueId { get; set; }

        public override string GetSettingKey() => "U3_Result_MatchSelNumberGameByLeague";

        public override bool IsValid() => SportType > 0 && EventDate > DateTime.MinValue;
    }
}