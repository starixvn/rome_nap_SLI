namespace NAP.SLI.Results.Criteria
{
    using System;
    using Fanex.Data.Repository;

    public class GetNumberGameResultCriteria : CriteriaBase
    {
        public DateTime FromDate { get; set; }

        public int LeagueID { get; set; }

        public string Language { get; set; }

        public int SportType { get; set; }

        public override string GetSettingKey()
        {
            return "U3_Result_MatchSelNumberGameByLeague";
        }

        public override bool IsValid()
        {
            return FromDate > DateTime.MinValue;
        }
    }
}