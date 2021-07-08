using NAP.SimpleApi.Models;
using NAP.SLI.CustomerSetting.Criteria;

namespace NAP.SLI.CustomerSetting
{
    public class SimpleApiProfile : Profile
    {
        public SimpleApiProfile()
            : base("customer-setting")
        {
            AddQuery<QuerySuperCriteria>("query-super");
        }
    }
}