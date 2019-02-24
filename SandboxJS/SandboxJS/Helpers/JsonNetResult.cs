using System;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace SandboxJS.Helpers
{
    public class JsonNetResult:JsonResult
    {
        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
                throw new ArgumentNullException("context");

            var response = context.HttpContext.Response;

            response.ContentType = !String.IsNullOrEmpty(ContentType) ? ContentType : "application/json";

            if (ContentEncoding != null)
                response.ContentEncoding = ContentEncoding;

            if (Data == null)
                return;

            var serializedObject = JsonConvert.SerializeObject(Data, Formatting.Indented, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                DateFormatString = "dd.MM.yyyy"
            });
            response.Write(serializedObject);
        } 
    }
}