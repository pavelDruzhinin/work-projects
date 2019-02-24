using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Web.Mvc;
using DigitRecognizer;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Recognize(RecognizeDto dto)
        {
            var imageBytes = Convert.FromBase64String(dto.ImgBase64.Split(',')[1]);

            var relativePath = $"/Files/{Guid.NewGuid()}.jpeg";
            var filePath = Server.MapPath($"~{relativePath}");
            System.IO.File.WriteAllBytes(filePath, imageBytes);

            var scaleFilePath = ScaleImage(filePath, 28, 28);

            var pixels = ToPixelArray(scaleFilePath);

            var classifier = Classifiers.Basic;
            var observation = classifier.GetObservation(pixels);

            return new JsonResult
            {
                Data = new RecognizeResult
                {
                    FilePath = relativePath,
                    Label = observation.Label,
                    ResultFilePath = SaveImage(filePath, observation.Pixels)
                }
            };
        }

        public int[] ToPixelArray(string filePath)
        {
            var pixels = new int[784];
            var img = new Bitmap(filePath);

            for (var i = 0; i < img.Width; i++)
            {
                for (var j = 0; j < img.Height; j++)
                {
                    pixels[i * img.Height + j] = img.GetPixel(j, i).A;
                }
            }

            return pixels;
        }

        public string ScaleImage(string filePath, int width, int height)
        {
            var source = new Bitmap(filePath);
            var destRect = new Rectangle(0, 0, width, height);
            var destImage = new Bitmap(width, height);

            destImage.SetResolution(source.HorizontalResolution, source.VerticalResolution);

            using (var graphics = Graphics.FromImage(destImage))
            {
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                using (var wrapMode = new ImageAttributes())
                {
                    wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                    graphics.DrawImage(source, destRect, 0, 0, source.Width, source.Height, GraphicsUnit.Pixel, wrapMode);
                }
            }

            var imageGuid = Path.GetFileNameWithoutExtension(filePath);
            var scaleFilePath = Server.MapPath($"~/Files/{imageGuid}_28.jpeg");
            destImage.Save(scaleFilePath);

            return scaleFilePath;
        }

        public string SaveImage(string filePath, int[] pixels)
        {
            var size = 28;
            var bmp = new Bitmap(size, size);

            for (var i = 0; i < size; i++)
            {
                for (var j = 0; j < size; j++)
                {
                    var color = Color.FromArgb(pixels[i * size + j], Color.Black);
                    bmp.SetPixel(j, i, color);
                }

            }

            var imageGuid = Path.GetFileNameWithoutExtension(filePath);
            var relativePath = $"/Files/{imageGuid}_result.jpeg";
            var resultFilePath = Server.MapPath($"~{relativePath}");
            bmp.Save(resultFilePath);

            return relativePath;
        }
    }

    public class RecognizeResult
    {
        public string Label { get; set; }
        public string FilePath { get; set; }
        public string ResultFilePath { get; set; }
    }

    public class RecognizeDto
    {
        public string ImgBase64 { get; set; }
    }
}