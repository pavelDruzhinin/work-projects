using System.Collections.Generic;
using System.Linq;
using SandboxJS.Models.BaseModel;

namespace SandboxJS.Models.ViewModel
{
    public class ProductView
    {
        #region Get Products Dto
        public List<ProductDto> GetProductDtos()
        {
            return new List<ProductDto>
            {
                new ProductDto { Id = 1, Name="Леденец", Price = 350, Quantity = 2},
                new ProductDto { Id = 2, Name="Конфета", Price = 260, Quantity = 6},
                new ProductDto { Id = 3, Name="Шоколадка", Price = 850, Quantity = 12},
                new ProductDto { Id = 4, Name="Мармелад", Price = 50, Quantity = 4},
                new ProductDto { Id = 5, Name="Хлеб", Price = 50, Quantity = 4},
                new ProductDto { Id = 6, Name="Вода", Price = 50, Quantity = 4},
                new ProductDto { Id = 7, Name="Сыр", Price = 50, Quantity = 4},
                new ProductDto { Id = 8, Name="Мясо", Price = 50, Quantity = 4},
                new ProductDto { Id = 9, Name="Кола", Price = 50, Quantity = 4},
                new ProductDto { Id = 10, Name="Пепси", Price = 50, Quantity = 4},
                new ProductDto { Id = 11, Name="Молоко", Price = 50, Quantity = 4},
                new ProductDto { Id = 12, Name="Рыба", Price = 50, Quantity = 4},
                new ProductDto { Id = 13, Name="Мороженное", Price = 50, Quantity = 4},
                new ProductDto { Id = 14, Name="Пироженное", Price = 50, Quantity = 4},
            };
        }
        #endregion

        #region Get Product By Name
        public IEnumerable<ProductDto> GetProductByName(string name)
        {
            return GetProductDtos().Where(x => x.Name.Contains(name));
        }
        #endregion

        #region Get dataProduct Dto

        public DataProductDto GetDataProduct(SearchModel model)
        {
            if (model == null)
                return null;

            var products = GetProductByName(model.Query);

            return new DataProductDto
            {
                Items = products.Skip(model.Skip).Take(model.Take),
                Total = products.Count()
            };

        }

        #endregion

    }
}