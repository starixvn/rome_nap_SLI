namespace NAP.SLI.Account.Models
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
