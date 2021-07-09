namespace NAP.SLI.Customer
{
    using NAP.SimpleApi.Models;
    using NAP.SLI.Customer.Criteria;

    public class SimpleApiProfile : Profile
    {
        public SimpleApiProfile()
            : base("customer")
        {
            AddQuery<QueryUsernameSuggestionCriteria>("query-username-suggestion", new OptionExtra
            {
                QueryStrategy = QueryStrategies.SingleAndMultiple
            });
        }
    }
}
