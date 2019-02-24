using System.Web.Mvc;
using System.Web.Routing;

namespace SportsStore.WebUI
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(null, "",
                new
                {
                    controller = "Product",
                    action = "List",
                    category = (string)null,
                    page = 1
                });
            routes.MapRoute(null,
                             "Page{page}", // Соответствует /Page2, /Pagel23, но не /PageXYZ
                             new { controller = "Product", action = "List", category = (string)null },
                             new { page = @"\d+" } // Ограничения: страница должна быть числовой
                             );
            routes.MapRoute(null,
                            "{category}", // Соответствует /Football или /AnythingWithNoSlash
                            new { controller = "Product", action = "List", page = 1 }
                            );
            routes.MapRoute(null,
                            "{category}/Page{page}", // Соответствует /Football/Page567
                            new { controller = "Product", action = "List" }, // По умолчанию
                            new { page = @"\d+" } // Ограничения: страница должна быть числовой
                            );
            routes.MapRoute(null, "{controller}/ {action}");
        }
    }
}