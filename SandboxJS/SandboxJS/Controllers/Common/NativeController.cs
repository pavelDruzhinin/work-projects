using System.IO;
using System.Web.Mvc;

namespace SandboxJS.Controllers.Common
{
    public class NativeController : Controller
    {
        public ActionResult IndexedDB()
        {
            
            return View();

        }

        #region Objects

        public ActionResult Objects()
        {
            return View();
        }


        #endregion

        #region Table

        public ActionResult Table()
        {
            return View();
        }

        #endregion

        

        #region RegularExpression

        public ActionResult RegularExpression()
        {
            return View();
        }

        #endregion

        #region LinqJS

        public ActionResult LinqJS()
        {
            return View();
        }

        #endregion

        #region LinqTests

        public ActionResult LinqTests()
        {
            return View();
        }

        #endregion

        #region LinqAddTests

        public ActionResult LinqAddTests()
        {
            return View();
        }

        #endregion

        #region ListLinq
        public ActionResult ListLinq()
        {
            return View();
        }
        #endregion

        #region MutationObserver

        public ActionResult MutationObserver()
        {
            return View();
        }

        #endregion

        #region Pagination

        public ActionResult Pagination()
        {
            return View();
        }

        #endregion

        #region MonthCalendar

        public ActionResult MonthCalendar()
        {
            return View();
        }

        #endregion

        #region Back Button
        public ActionResult BackButton()
        {
            return View();
        }
        #endregion

        #region Audio
        public ActionResult Audio()
        {
            return View();
        }
        #endregion

        #region Upload
        public ActionResult Upload()
        {
            return View();
        }
        #endregion

        #region don't work

        [HttpPost]
        public virtual ActionResult UploadFile()
        {
            var myFile = Request.Files["MyFile"];

            if (myFile == null || myFile.ContentLength == 0)
                return Json(new { error = "Нужно загрузить файл", success = false });

            var extension = Path.GetExtension(myFile.FileName);
            if (string.IsNullOrWhiteSpace(extension))
                return Json(new { error = "Нужно загрузить файл", success = false });

            //тут сохраняем в файл
            var filePath = Path.Combine("/Files", myFile.FileName);

            myFile.SaveAs(Server.MapPath(filePath));
            return Json(new
            {
                success = true,
                result = "error",
                data = new
                {
                    filePath
                }
            });
        }

        #endregion
    }
}
