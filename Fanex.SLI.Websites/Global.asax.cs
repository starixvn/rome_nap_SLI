namespace Fanex.SLI.Websites
{
    using System;
    using System.Web;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;
    using Fanex.NAP.Core.SignIn;
    using Fanex.SLI.Websites.App_Start;
    using ONEbook.UM.Filters;

    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            ViewEngines.Engines.Clear();
            ViewEngines.Engines.Add(new RazorViewEngine());
            MvcHandler.DisableMvcResponseHeader = true;


            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            GlobalConfiguration.Configure(WebApiConfig.Register);

            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            GlobalFilters.Filters.Add(new CheckUMFilter());
            SignInHandler.Register();
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            if (Request.IsLocal)
            {
                return;
            }
        }
    }
}
