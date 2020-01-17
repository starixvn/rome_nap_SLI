namespace NAP.SimpleApi.Models
{
    using System.Collections.Generic;

    public class Configuration
    {
        public Configuration(IList<RequestOption> requestOptions, IRequestActivator requestActivator)
        {
            RequestOptions = requestOptions;
            RequestActivator = requestActivator;
        }

        public IList<RequestOption> RequestOptions { get; private set; }

        public IRequestActivator RequestActivator { get; private set; }
    }
}
