function Menu($scope) {
    $scope.sections = [
        new Section("Knockout", [
            new Sub("Placeholder", "/Home/KnockOut"),
            new Sub("Template", "/Knockout/Index")
        ]),
        new Section("Massiv", [
            new Sub("Home", "/Home/Massiv"),
            new Sub("Closure", "/Native/Closure")
        ]),
        new Section("Native", [
            new Sub("MutationObserver", "/Native/MutationObserver"),
            new Sub("Table", "/Native/Table"),
            new Sub("BackButton", "/Native/BackButton"),
            new Sub("Audio", "/Native/Audio"),
            new Sub("Pagination", "/Native/Pagination"),
            new Sub("MonthCalendar", "/Native/MonthCalendar"),
            new Sub("Regular Expression", "/Native/RegularExpression"),
            new Sub("IndexedDB", "/Native/IndexedDB")
        ]),
        new Section("Graphics", [
            new Sub("Chart", "/Chart/Bars"),
            new Sub("HighChart", "/Chart/HighCharts"),
            new Sub("Test Canvas", "/Chart/TestCanvas"),
            new Sub("Canvas Mouse", "/Chart/CanvasMouse"),
            new Sub("Canvas", "/Canvas/Index"),
            new Sub("Svg", "/Svg/Index")
        ]),
        new Section("LinqJS", [
            new Sub("Home", "/Native/LinqJS")
            //new Sub("")
        ]),
        new Section("TypeScript", [
            new Sub("Home", "/TypeScript/Index")
        ]),
        new Section("DataTable", [
            new Sub("Home", "/DataTable/Index")
        ]),
        new Section("React", [
            new Sub("Home", "/React/Index")
        ]),
        new Section("Angular", [
            new Sub("Home", "/Angular/Index")
        ]),
        new Section("Moment", [
            new Sub("Home", "/Moment/Index")
        ])
    ];

    $scope.active = function () {

    };

}

function Section(name, subs) {
    this.name = name;
    this.subs = subs;
    this.isShow = isLocationSub();

    function isLocationSub() {
        if (!subs)
            return false;

        var loc = window.location.pathname;

        for (var i = 0; i < subs.length; i++) {
            if (subs[i].url == loc)
                return true;
        }

        return false;
    }
}

function Sub(name, url) {
    this.name = name;
    this.url = url;
}