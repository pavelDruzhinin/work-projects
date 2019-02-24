var List = (function () {
    var massiv = [];

    function list(mas) {
        if (mas)
            massiv = mas;

        convertToArray.call(this, massiv);
    }

    list.prototype = Object.create(Array.prototype);
    list.prototype.distinct = function () {
        var context = this;

        var temp = [];

        context.forEach(function (elem) {
            if (temp.indexOf(elem) == -1)
                temp.push(elem);
        });

        return new List(temp);
    };

    function convertToArray(mas) {
        var context = this;

        if (!App.IsType(mas, []))
            return;

        mas.forEach(function (elem) {
            context.push(elem);
        });
    }

    return list;
})();