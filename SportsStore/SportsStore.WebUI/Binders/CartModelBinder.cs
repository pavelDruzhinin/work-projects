using SportsStore.Domain.Entities;
using System.Web.Mvc;

namespace SportsStore.WebUI.Binders
{
    public class CartModelBinder : IModelBinder
    {
        private const string sessionKey = "Cart";
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            if (controllerContext.HttpContext.Session != null)
            {
                var cart = (Cart)controllerContext.HttpContext.Session[sessionKey];
                
                if (cart != null) 
                    return cart;

                cart = new Cart();
                controllerContext.HttpContext.Session[sessionKey] = cart;
                return cart;
            }

            return null;
        }
    }
}