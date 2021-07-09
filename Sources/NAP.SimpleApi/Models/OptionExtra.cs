namespace NAP.SimpleApi.Models
{
    using Microsoft.AspNetCore.Authorization;

    public class OptionExtra
    {
        public AuthorizationPolicy Policy { get; init; }

        public QueryStrategies QueryStrategy { get; init; }
    }
}