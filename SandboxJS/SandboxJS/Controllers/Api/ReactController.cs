using System.Net;
using System.Net.Http;
using System.Web.Http;
using SandboxJS.Models.BaseModel;
using SandboxJS.Models.ViewModel;

namespace SandboxJS.Controllers.Api
{
    public class ReactController : ApiController
    {
        public HttpResponseMessage SearchProducts(SearchModel model)
        {
            var viewmodel = new ProductView();

            var products = viewmodel.GetDataProduct(model);

            if (products == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            return Request.CreateResponse(HttpStatusCode.OK, products);
        }


    }
}
