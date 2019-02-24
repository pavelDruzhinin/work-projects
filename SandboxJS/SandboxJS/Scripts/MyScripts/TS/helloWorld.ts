// Interface
interface ICar
{
    getEngine(): number;
}

class Title
{
    Id: number;
    Name: string;
    Url: string;
}

interface ITitle
{
    putTitle(title: Title);
    showTitlesOnPage();
}

module Titles
{
    export class PageTitles implements ITitle
    {
        private titles: Title[];

        constructor()
        {
            this.titles = [];
        }

        putTitle(title: Title)
        {
            this.titles.push(title);
        }

        showTitlesOnPage()
        {
            var ulTitles = document.getElementById("titles");

            this.titles.forEach(function (t)
            {
                var li = document.createElement("li");
                li.innerHTML = "<a id=" + t.Id + " href=" + t.Url + ">" + t.Name + "</a>";
                ulTitles.appendChild(li);
            });
        }
    }
}




module Cars
{
    export class BMW implements ICar
    {
        static engine: number;

        constructor(public engine: number)
        {
            this.engine = engine;
        }

        getEngine() { return this.engine; }
    }
}

var bmw: ICar = new Cars.BMW(300);
var engineBMW = bmw.getEngine(); 
