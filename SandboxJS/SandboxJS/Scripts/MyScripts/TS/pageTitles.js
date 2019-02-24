
var PageTitles = (function () {

    function PageTitles() {
        this.titles = [];
    }

    PageTitles.prototype.putTitle = function (title) {
        this.titles.push(title);
    };

    PageTitles.prototype.showTitlesOnPage = function (ulId) {
        if (!ulId)
            ulId = "titles";

        var ulTitles = document.getElementById(ulId);

        this.titles.forEach(function (t) {
            var li = document.createElement("li");
            li.innerHTML = "<a id=" + t.Id + " href=" + t.Url + ">" + t.Name + "</a>";
            ulTitles.appendChild(li);
        });
    };

    return PageTitles;
})();


var Cars;
(function (Cars) {
    var BMW = (function () {
        function BMW(engine) {
            this.engine = engine;
            this.engine = engine;
        }
        BMW.prototype.getEngine = function () {
            return this.engine;
        };
        return BMW;
    })();
    Cars.BMW = BMW;
})(Cars || (Cars = {}));

var bmw = new Cars.BMW(300);
var engineBMW = bmw.getEngine();
