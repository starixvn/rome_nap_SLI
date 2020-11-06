namespace NAP.SLI.Customer
{
    using NAP.SimpleApi;
    using NAP.SLI.Customer.Criteria;

    public class SimpleApiProfile : Profile
    {
        public SimpleApiProfile()
            : base("customer")
        {
            AddQuery<QueryUsernameSuggestionCriteria>("query-username-suggestion");
            AddQuery<QueryUserInformationCriteria>("query-user-information");
        }
    }
}
