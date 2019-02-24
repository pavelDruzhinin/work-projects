//Initialiaze Title
var pageTitles: ITitle = new Titles.PageTitles();

pageTitles.putTitle({ Id: 1, Url: "/TypeScript/Index", Name: "Home" });
pageTitles.putTitle({ Id: 2, Url: "/TypeScript/Products", Name: "Products" });
pageTitles.putTitle({ Id: 3, Url: "/TypeScript/Phone", Name: "Phone" });
pageTitles.showTitlesOnPage();