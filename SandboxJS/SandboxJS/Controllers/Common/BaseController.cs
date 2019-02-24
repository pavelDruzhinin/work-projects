using System.Text;
using System.Web.Mvc;
using SandboxJS.Helpers;

namespace SandboxJS.Controllers.Common
{
    public class BaseController : Controller
    {
        #region Override JSON-related methods
        protected override JsonResult Json(object data, string contentType, Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            return new JsonNetResult
            {
                Data = data,
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                JsonRequestBehavior = behavior
            };
        }
        #endregion

        

    }
}
