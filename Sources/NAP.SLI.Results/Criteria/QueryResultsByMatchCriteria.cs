namespace NAP.SLI.Results.Criteria
{
    using Fanex.Data.Repository;

    public class QueryResultsByMatchCriteria : CriteriaBase
    {
        public long MatchId { get; set; }

        public override string GetSettingKey() => "U3_BetList_SelMatchResultNumberGame";

        public override bool IsValid() => MatchId > 0;
    }
}