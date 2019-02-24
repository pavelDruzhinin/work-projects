//Initialiaze Title
var pageTitles = new Titles.PageTitles();

pageTitles.putTitle({ Id: 1, Url: "/Native/LinqJS", Name: "Home" });
pageTitles.putTitle({ Id: 1, Url: "/Native/LinqTests", Name: "Tests" });
pageTitles.putTitle({ Id: 1, Url: "/Native/LinqAddTests", Name: "AddTests" });
pageTitles.putTitle({ Id: 1, Url: "/Native/ListLinq", Name: "List Linq" });

pageTitles.showTitlesOnPage();