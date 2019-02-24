using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ForecastsSport.Views
{
    public class MenuController : Controller
    {
        public ActionResult News()
        {
            return View();
        }

        public ActionResult Forecasts()
        {
            return View();
        }

        public ActionResult Results()
        {
            return View();
        }

        public ActionResult Contacts()
        {
            return View();
        }

        public ActionResult Information()
        {
            return View();
        }
    }
}
