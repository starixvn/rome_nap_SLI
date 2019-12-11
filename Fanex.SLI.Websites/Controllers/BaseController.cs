namespace Fanex.SLI.Websites.Controllers
{
    using System;
    using System.Web.Mvc;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Configuration;
    using Fanex.NAP.Core.Web;
    using Fanex.NAP.Core.Web.Session;
    using Fanex.SLI.Configurations;
    using Fanex.SLI.Extensions;
    using Fanex.SLI.Websites.Helpers;

    public class BaseController : Controller
    {
        private readonly ICurrentSession currentSession;
        private readonly int siteId;
        private readonly string environment;

        public BaseController()
        {
            currentSession = new CurrentSession();
            environment = NapSettings.Settings.Environment;
            siteId = NapSettings.Settings.SiteId;

            ViewBag.ServerDate = ServerDate.ToShortFormatedDate();
            ViewBag.ShowMenus = SessionManager.Get<bool?>("ShowMenus");

            ViewFlags = new ViewFlags
            {
                IsLive = Environment.Equals(Constant.LIVE),
                HasEditRight = false,
                IsReCheckin = NapSettings.Settings.EnableReCheckIn
            };
        }

        protected static DateTime ServerDate
        {
            get
            {
                TimeZoneInfo serverTzi = TimeZoneInfo.FindSystemTimeZoneById(AppSettings.ServerTimezone);

                return TimeZoneInfo.ConvertTime(DateTime.Now, TimeZoneInfo.Local, serverTzi);
            }
        }

        public ICurrentSession CurrentSession
        {
            get
            {
                return currentSession;
            }
        }

        public string Environment
        {
            get
            {
                return environment;
            }
        }

        public int SiteId
        {
            get
            {
                return siteId;
            }
        }

        protected ViewFlags ViewFlags
        {
            get
            {
                return ViewBag.ViewFlags;
            }

            set
            {
                ViewBag.ViewFlags = value;
            }
        }
    }
}
