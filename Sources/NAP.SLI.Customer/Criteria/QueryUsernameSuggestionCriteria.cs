namespace NAP.SLI.Customer.Criteria
{
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Services;

    public class QueryUsernameSuggestionCriteria : CriteriaBase
    {
        private readonly ICurrentUserService currentUserService;

        public QueryUsernameSuggestionCriteria(ICurrentUserService currentUserService)
        {
            this.currentUserService = currentUserService;
        }

        public int CustId => currentUserService.UserId;

        public string Username { get; set; }

        public override string GetSettingKey()
            => "Acc_CustomerSelUserSearch";

        public override bool IsValid()
            => CustId > 0 && !string.IsNullOrWhiteSpace(Username) && Username.Length >= 2;
    }
}
