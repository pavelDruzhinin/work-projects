using SportsStore.WebUI.Infrastucture.Abstract;
using SportsStore.WebUI.Models;
using System.Web.Mvc;

namespace SportsStore.WebUI.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAuthProvider authProvider;

        public AccountController(IAuthProvider auth)
        {
            authProvider = auth;
        }

        public ViewResult LogOn()
        {
            return View();
        }

        [HttpPost]
        public ActionResult LogOn(LogOnViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid) 
                return View(model);

            if (authProvider.Authenticate(model.UserName, model.Password))
            {
                return Redirect(returnUrl ?? Url.Action("Index", "Admin"));
            }

            ModelState.AddModelError("", "Incorrect username or password");
            return View();
        }
    }
}
