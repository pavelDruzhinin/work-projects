using System.Web.Mvc;
using SpamDetector;
using Web.Infrastructure;

namespace Web.Controllers
{
    public class SpamController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult FClassify(ClassifyDto dto)
        {
            var classifier = SpamDetectors.FDetector;
            dto.Type = classifier.Invoke(dto.Message).IsSpam ? "Спам" : "Хам";
            return new JsonResult
            {
                Data = dto
            };
        }

        [HttpPost]
        public JsonResult Classify(ClassifyDto dto)
        {
            var classifier = SpamDetectors.Detector;
            var result = classifier.Classify(dto.Message);
            dto.Type = result.Item2.Item1 == DocLabel.Spam ? "Спам" : "Хам";

            return new JsonResult
            {
                Data = dto
            };
        }
    }

    public class ClassifyDto
    {
        public string Message { get; set; }
        public string Type { get; set; }
    }
}