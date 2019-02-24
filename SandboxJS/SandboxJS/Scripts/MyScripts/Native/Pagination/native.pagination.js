//#region Watch like ko.observable
if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, "watch", {
        enumerable: false,
        configurable: true,
        writable: false,
        value: function (prop, handler) {
            var oldval = this[prop],
                newval = oldval,
                getter = function () {
                    return newval;
                },
                setter = function (val) {
                    oldval = newval;
                    return newval = handler.call(this, prop, oldval, val);
                };

            if (delete this[prop]) { // can't watch constants
                Object.defineProperty(this, prop, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            }
        }
    });
}
//#endregion

//#region Pagination
function Pagination(divId, options) {

    //#region Fields
    var self = this;
    self.current = 1;
    self.action = 0;
    var start = ["Начало", "Назад"];
    var end = ["Дальше", "В конец"];

    //var startPage = 0;
    var show = 10, total = 15, action, endPage = 10;
    //#endregion

    //#region init pagination
    function init(divId, options) {

        if (!options || !options.totalpages || options.totalpages <= 1)
            return;

        show = endPage = options.showpages;
        total = options.totalpages;
        self.action = options.actionButton;


        var numbers = createNumbers(total);

        self.pagination = document.getElementById(divId);

        if (self.pagination.children.length > 0)
            self.clear();

        //Start
        self.pagination.appendChild(createList(start, [ButtonClick], show));

        //Numbers
        self.pagination.appendChild(createList(numbers, [ButtonClick], show));

        //End
        self.pagination.appendChild(createList(end, [ButtonClick], show));

    }
    //#endregion

    //#region Prototype
    Pagination.prototype.clear = function () {
        var childrens = this.pagination.children;

        while (childrens.length > 0) {
            childrens[0].remove();
        }
    };

    Pagination.prototype.setCurrent = function (value) {
        this.setActive(value);
        console.log(value);
        this.current = value;
    };

    Pagination.prototype.getCurrent = function () {
        return this.current;
    };

    Pagination.prototype.toString = function () {
        return '[Object Pagination]';
    };

    Pagination.prototype.synchronize = function (pgs) {
        var context = this;

        if (!context.hasOwnProperty("pagination"))
            return;

        for (var i = 0; i < pgs.length; i++) {
            var pag = pgs[i];

            if (pag.toString() != this.toString() || !pag.hasOwnProperty("pagination"))
                continue;

            context.pagination.onclick = function () {
                var c = context.current;
                pag.setCurrent(c);
            };

            pag.pagination.onclick = function () {
                var c = pag.current;
                context.setCurrent(c);
            };

        }
    };
    //#endregion

    //#region Create docElements
    function createButton(text, action, show, active) {
        var button = document.createElement("a");

        //fix: Mozilla show text, Chrome - innerText 
        button.innerText = button.text = text;

        button.onclick = action;

        //style
        button.style.cursor = "pointer";
        button.style.display = "block";

        if (show !== undefined && !show)
            button.style.display = "none";

        if (active !== undefined && active)
            button.className = "active";

        return button;
    }

    function createButtons(texts, actions, showPages) {
        var buttons = [];

        if (showPages === undefined)
            showPages = true;

        var count = actions.length;
        for (var i = 0; i < texts.length; i++) {
            var active = (i == 0 && texts[i] == 1);

            buttons.push(createButton(texts[i], actions[i % count], i < showPages, active));
        }

        return buttons;
    }

    function createList(texts, actions, showPages) {
        var ul = document.createElement("ul");

        var buttons = createButtons(texts, actions, showPages);

        for (var i = 0; i < buttons.length; i++) {
            var li = document.createElement("li");

            li.appendChild(buttons[i]);
            ul.appendChild(li);
        }

        return ul;
    }

    function createNumbers(count) {
        var numbers = [];

        for (var i = 1; i <= count; i++) {
            numbers.push(i);
        }

        return numbers;
    }
    //#endregion

    //#region Manipulate domElements
    Pagination.prototype.setActive = function (value) {
        var buttons = this.pagination.children[1].children;

        var showInterval = getShowInterval(value);

        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i].children[0];
            var text = parseInt(button.innerText);

            button.className = value == button.innerText ? "active" : "";

            button.style.display = (showInterval[0] <= text && text <= showInterval[1]) ? "block" : "none";
        }
    };

    function getShowInterval(value) {
        var count = Math.floor(show / 2);

        var s = value - count;
        var e = value + count;

        if (s <= 1) {
            s = 1;
            e = show;
        }

        if (e >= total) {
            s = total - show;
            e = total;
        }

        if (show == e - s) {
            total - e >= count ? e-- : s++;
        }

        return [s, e];
    }

    //#endregion

    //#region Actions Start, Numbers, End

    function ButtonClick() {
        var text = this.innerText;
        var value;

        switch (text) {
            case "Начало":
                value = 1;
                break;
            case "Назад":
                value = self.current == 1 ? self.current : self.current - 1;
                break;
            case "Дальше":
                value = self.current == total ? self.current : self.current + 1;
                break;
            case "В конец":
                value = total;
                break;
            default:
                value = parseInt(text);
        }

        if (self.current == value)
            return;

        if (self.action !== 0 && self.action !== undefined)
            self.action(value);

        self.setActive(value);
        self.current = value;
    }

    //#endregion

    return init(divId, options);

}
//#endregion