namespace Fanex.SLI.Websites.App_Start
{
    using System.Web.Mvc;
    using ONEbook.UM.Filters;

    public static class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new CheckUMFilter());
            filters.Add(new AuthorizeAttribute());
        }
    }
}
