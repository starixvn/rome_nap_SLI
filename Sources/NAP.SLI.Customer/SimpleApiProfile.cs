namespace NAP.SLI.Customer
{
    using NAP.SimpleApi;
    using NAP.SLI.Customer.Criterias;

    public class SimpleApiProfile : Profile
    {
        public SimpleApiProfile()
            :base("customer")
        {
            AddQuery<QueryUsernameCriteria>("query-username"); 
        }
    }
}
