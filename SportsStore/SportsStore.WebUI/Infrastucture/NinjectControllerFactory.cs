using System;
using System.Web.Mvc;
using System.Web.Routing;
using Ninject;
using SportsStore.Domain.Abstract;
using SportsStore.Domain.Concrete;
using System.Configuration;
using SportsStore.WebUI.Infrastucture.Abstract;
using SportsStore.WebUI.Infrastucture.Concrete;

namespace SportsStore.WebUI.Infrastucture
{
    public class NinjectControllerFactory : DefaultControllerFactory
    {
        private readonly IKernel ninjectKernel;

        public NinjectControllerFactory()
        {
            ninjectKernel = new StandardKernel();
            AddBindings();
        }

        protected override IController GetControllerInstance(RequestContext requestContext, Type controllerType)
        {
            return controllerType == null ? null : (IController)ninjectKernel.Get(controllerType);
        }

        private void AddBindings()
        {
            //Имитированная реализация интерфейса IProductRepository
            ninjectKernel.Bind<IProductRepository>().To<EFProductRepository>();
            var emailsettings = new EmailSettings { WriteAsFile = bool.Parse(ConfigurationManager.AppSettings["Email.WriteAsFile"] ?? "false") };
            ninjectKernel.Bind<IOrderProcessor>().To<EmailOrderProcessor>().WithConstructorArgument("settings", emailsettings);
            ninjectKernel.Bind<IAuthProvider>().To<FormsAuthProvider>();
        }
    }
}