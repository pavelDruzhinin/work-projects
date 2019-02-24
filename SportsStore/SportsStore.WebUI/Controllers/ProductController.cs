using SportsStore.Domain.Abstract;
using SportsStore.WebUI.Models;
using System.Linq;
using System.Web.Mvc;

namespace SportsStore.WebUI.Controllers
{
    public class ProductController : Controller
    {
        public int PageSize = 4;
        private readonly IProductRepository repository;

        public ProductController(IProductRepository productRepository)
        {
            repository = productRepository;
        }

        public ViewResult List(string category, int page = 1)
        {
            var viewModel = new ProductsListViewModel
            {
                Products = repository.Products.Where(p => category == null || p.Category == category).OrderBy(p => p.ProductID).Skip((page - 1) * PageSize).Take(PageSize),
                PagingInfo = new PagingInfo
                {
                    CurrentPage = page,
                    ItemPerPage = PageSize,
                    TotalItems = category == null ?
                    repository.Products.Count() :
                    repository.Products.Count(x => x.Category == category)
                },
                CurrentCategory = category
            };
            return View(viewModel);
        }
        public FileContentResult GetImage(int productId)
        {
            var prod = repository.Products.FirstOrDefault(p => p.ProductID == productId);
            return prod != null ? File(prod.ImageData, prod.ImageMimeType) : null;
        }
    }
}
