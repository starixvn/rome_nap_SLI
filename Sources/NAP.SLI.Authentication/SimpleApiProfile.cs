namespace NAP.SLI.Authentication
{
    using NAP.SimpleApi;
    using NAP.SLI.Authentication.Criteria;

    public class SimpleApiProfile : Profile
    {
        public SimpleApiProfile()
            : base("account")
        {
            AddCommand<ChangePasswordCriteria>("change-password");
        }
    }
}
