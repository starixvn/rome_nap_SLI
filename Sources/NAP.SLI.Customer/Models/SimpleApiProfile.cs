namespace NAP.SLI.Customer.Models
{
    using NAP.SimpleApi.Models;
    using NAP.SLI.Customer.Criteria;

    public class SimpleApiProfile : Profile
    {
        public SimpleApiProfile()
            : base("customer")
        {
            AddQuery<QueryUsernameSuggestionCriteria>("query-username-suggestion");
        }
    }
}
