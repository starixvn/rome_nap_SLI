namespace NAP.SLI.Account
{
    using NAP.SimpleApi.Models;
    using NAP.SLI.Account.Criteria;

    public class SimpleApiProfile : Profile
    {
        public SimpleApiProfile()
            : base("account")
        {
            AddCommand<ChangePasswordCriteria>("change-password");
        }
    }
}
