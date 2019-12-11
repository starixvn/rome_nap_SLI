namespace Fanex.SLI.Websites.App_Start
{
    using System.Web.Optimization;
    using Fanex.SLI.Websites.Extensions;

    public static class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            RegisterCommonBundles(bundles);
        }

        public static void RegisterCommonBundles(BundleCollection bundles)
        {
            bundles.AddAndInclude(
                "~/styles/common",
                "~/Content/Themes/jquery/jquery-ui-1.9.1.custom.min.css",
                "~/Content/Extensions/jquery.combobox-ext.css",
                "~/Content/Extensions/jquery.extensions.css",
                "~/Content/Themes/reset.css",
                "~/Content/Themes/site.css");

            bundles.Add(new ScriptBundle("~/scripts/common")
               .Include("~/Assets/Scripts/Libs/jQuery/jquery-1.8.2.min.js")
               .Include("~/Assets/Scripts/Libs/jQuery/jquery-migrate-1.2.1.js")
               .Include("~/Assets/Scripts/Libs/jQuery/jquery-ui-1.8.24.min.js")
               .Include("~/Assets/Scripts/Libs/jQuery/jquery.mask.min.js")
               .Include("~/Assets/Scripts/Libs/jQuery/jquery.blockUI.1.33.min.js")
               .Include("~/Assets/Scripts/Libs/jquery.combobox-ext.js")
               .Include("~/Assets/Scripts/Libs/jquery.extensions.js"));
        }
    }
}
