using System.Globalization;
using SportsStore.WebUI.Models;
using System;
using System.Text;
using System.Web.Mvc;

namespace SportsStore.WebUI.HtmlHelpers
{
    public static class PagingHelpers
    {
        public static MvcHtmlString PageLinks(this HtmlHelper html, PagingInfo paginginfo,
            Func<int, string> pageUrl)
        {
            var result = new StringBuilder();
            for (var i = 1; i <= paginginfo.TotalPage; i++)
            {
                var tag = new TagBuilder("a");
                tag.MergeAttribute("href", pageUrl(i));
                tag.InnerHtml = i.ToString(CultureInfo.InvariantCulture) + ' ';
                if (i == paginginfo.CurrentPage)
                {
                    tag.AddCssClass("selected");
                }
                result.Append(tag);
            }
            return MvcHtmlString.Create(result.ToString());
        }

    }
}