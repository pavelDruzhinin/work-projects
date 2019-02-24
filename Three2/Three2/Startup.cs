using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Three2.Startup))]
namespace Three2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
