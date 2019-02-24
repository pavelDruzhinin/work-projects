using System;
using System.Web.Optimization;

namespace SandboxJS
{
    public class BundleConfig
    {
        public static void AddDefaultIgnorePatterns(IgnoreList ignoreList)
        {
            if (ignoreList == null)
                throw new ArgumentNullException("ignoreList");

            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");
            ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
            ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
        }

        // Дополнительные сведения о Bundling см. по адресу http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            AddDefaultIgnorePatterns(bundles.IgnoreList);

            //BundleTable.EnableOptimizations = true;


            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/System/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/System/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/System/jquery.unobtrusive*",
                        "~/Scripts/System/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/react").Include(
                "~/Scripts/react/JSXTransformer-0.10.0.js",
                "~/Scripts/react/react-0.10.0.js",
                "~/Scripts/react/react-with-addons-0.10.0.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include("~/Scripts/angular/angular.min.js", 
                "~/Scripts/angular/angular-resource.min.js",
                "~/Scripts/angular/angular-route.min.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/datepicker").Include("~/Scripts/angular/datepicker/index.js",
                "~/Scripts/angular/datepicker/ui-bootstrap-tpls.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include("~/Scripts/System/knockout-{version}.js", "~/Scripts/System/knockout.viewmodel.2.0.2.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/moment").Include("~/Scripts/System/moment.min*"));

            bundles.Add(new ScriptBundle("~/bundles/fileUploader").Include("~/Scripts/System/jquery.fileupload.js", "~/Scripts/System/jquery.fileupload-ui.js", "~/Scripts/System/jquery.iframe-transport.js"));

            // Используйте версию Modernizr для разработчиков, чтобы учиться работать. Когда вы будете готовы перейти к работе,
            // используйте средство построения на сайте http://modernizr.com, чтобы выбрать только нужные тесты.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            //bundles.Add(new StyleBundle("~/Content/bootstrap").Include("~/Content/bootstrap/css/bootstrap.css"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include("~/Scripts/System/Bootstrap/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/classes").Include(
                "~/Scripts/MyScripts/React/search.js",
                "~/Scripts/MyScripts/React/pagination.js",
                "~/Scripts/MyScripts/React/formCreateTicket.js",
                "~/Scripts/MyScripts/React/dialog.js",
                "~/Scripts/MyScripts/React/companyResult.js"
                ));
        }
    }
}