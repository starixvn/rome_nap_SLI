namespace Fanex.SLI.Websites.Controllers
{
    using System.Linq;
    using System.Web.Mvc;
    using Fanex.NAP.Core.Service.Impl;
    using Fanex.NAP.Core.Service.Interface;

    public class HomeController : BaseController
    {
        private readonly IUserService userService;

        public HomeController() : this(null)
        {
        }

        public HomeController(IUserService userService)
        {
            this.userService = userService ?? new UserService();

        }

        public ActionResult Index()
            => View("~/Areas/Home/Views/Index.cshtml");

        [ChildActionOnly]
        public PartialViewResult Menu()
        {
            CurrentSession.MenuItemList = CurrentSession.UserId > 0 ? userService.GetMenuItem(CurrentSession.UserId, SiteId, Environment, true).ToList() : null;

            ViewBag.MenuItemList = CurrentSession.MenuItemList;

            return PartialView("~/Views/Shared/_Menu.cshtml");
        }
    }
}
