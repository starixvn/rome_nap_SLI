namespace NAP.SLI.SimpleApi.Core
{
    public class Configuration
    {
        public RoutingMap RoutingMap { get; set; }

        public ICriteriaActivator CriteriaActivator { get; set; }

        public static Configuration Instance { get; set; }
    }
}
