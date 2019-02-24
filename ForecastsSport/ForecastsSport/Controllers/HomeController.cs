using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ForecastsSport.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult Sidebar()
        {
            return PartialView();
        }
        public PartialViewResult HeaderMenu()
        {
            return PartialView();
        }

        public PartialViewResult LatestBets()
        {
            return PartialView();
        }
    }
}
