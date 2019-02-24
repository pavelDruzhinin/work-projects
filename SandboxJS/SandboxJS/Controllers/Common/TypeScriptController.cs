using System.Web.Mvc;
using SandboxJS.Models.ViewModel;

namespace SandboxJS.Controllers.Common
{
    public class TypeScriptController : BaseController
    {
        //
        // GET: /TypeScript/

        public ActionResult Home()
        {
            return View();
        }

        public ActionResult Products()
        {
            return View();
        }

        public ActionResult Phone()
        {
            return View();
        }

        #region JSON Data
        [HttpGet]
        public JsonResult GetProducts()
        {
            var viewModel = new ProductView();
            var products = viewModel.GetProductDtos();
            return Json(products, JsonRequestBehavior.AllowGet);
        }

        #endregion
    }
}
