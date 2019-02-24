using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;
using VideoApp.Models.Shared;
using System.Web.Routing;

namespace ForecastsSport.Controllers
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
