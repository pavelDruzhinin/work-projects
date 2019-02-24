using SportsStore.Domain.Abstract;
using SportsStore.Domain.Entities;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SportsStore.WebUI.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {
        private readonly IProductRepository repository;
        public AdminController(IProductRepository repo)
        {
            repository = repo;
        }

        public ViewResult Index()
        {
            return View(repository.Products);
        }

        public ViewResult Edit(int productId)
        {
            var product = repository.Products.FirstOrDefault(p => p.ProductID == productId);
            return View(product);
        }

        [HttpPost]
        public ActionResult Edit(Product product, HttpPostedFileBase Image)
        {
            if (!ModelState.IsValid) 
                return View(product);

            if (Image != null)
            {
                product.ImageMimeType = Image.ContentType;
                product.ImageData = new byte[Image.ContentLength];
                Image.InputStream.Read(product.ImageData, 0, Image.ContentLength);
            }

            repository.SaveProduct(product);
            TempData["message"] = string.Format("{0} has been saved", product.Name);
            return RedirectToAction("Index");
        }
        public ViewResult Create()
        {
            return View("Edit", new Product());
        }
        [HttpPost]
        public ActionResult Delete(int productId)
        {
            var prod = repository.Products.FirstOrDefault(p => p.ProductID == productId);
            if (prod == null) 
                return RedirectToAction("Index");

            repository.DeleteProduct(prod);
            TempData["message"] = string.Format("{0} was deleted", prod.Name);
            return RedirectToAction("Index");
        }
    }
}
