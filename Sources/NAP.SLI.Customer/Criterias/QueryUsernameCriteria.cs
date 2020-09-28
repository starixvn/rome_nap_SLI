namespace NAP.SLI.Customer.Criterias
{
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Services;

    public class QueryUsernameCriteria : CriteriaBase
    {
        private readonly ICurrentUserService currentUserService;

        public QueryUsernameCriteria(ICurrentUserService currentUserService)
        {
            this.currentUserService = currentUserService;
        }
        
        public int CustId => currentUserService.UserId;

        public string Username { get; set; }

        public override string GetSettingKey()
            => "Acc_CustomerSelUserSearch";

        public override bool IsValid()
            => CustId > 0;
    }
}
