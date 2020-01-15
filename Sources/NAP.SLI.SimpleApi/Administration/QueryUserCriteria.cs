namespace NAP.SLI.SimpleApi.Administration
{
    using Fanex.Data.Repository;

    public class QueryUserCriteria: CriteriaBase
    {
        public string Username { get; set; }

        public int? GroupId { get; set; }

        public override string GetSettingKey() => "SLI_User_Sel";

        public override bool IsValid() => Username == null || Username.Length <= 50;
    }
}
