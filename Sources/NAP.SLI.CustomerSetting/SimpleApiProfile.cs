using NAP.SimpleApi.Models;
using NAP.SLI.CustomerSetting.Criteria;

namespace NAP.SLI.CustomerSetting
{
    public class SimpleApiProfile : Profile
    {
        public SimpleApiProfile()
            : base("customer-setting")
        {
            var optionExtra = new OptionExtra
            {
                QueryStrategy = QueryStrategies.SingleAndSingle
            };
            AddQuery<QuerySuperCriteria>("query-super", optionExtra);
            AddQuery<QueryMasterCriteria>("query-master", optionExtra);
            AddQuery<QueryAgentCriteria>("query-agent", optionExtra);
            AddQuery<QueryMemberCriteria>("query-member", optionExtra);
        }
    }
}