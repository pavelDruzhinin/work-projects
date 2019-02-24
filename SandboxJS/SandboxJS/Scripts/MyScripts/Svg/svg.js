var Svg = (function () {

    var svgns = 'http://www.w3.org/2000/svg';

    function Svg(divId, options) {
        this.div = document.getElementById(divId);
        this.div.style.height = "340px";

        this.width = this.div.clientWidth;
        this.height = this.div.clientHeight;
        var svgOptions = {
            height: this.height,
            width: this.width
        };

        for (var key in options) {
            svgOptions[key] = options[key];
        }

        this.svg = createElement({ name: "svg", id: "0", options: svgOptions });

        this.div.appendChild(this.svg);
        this.svgs = [this.svg];
        this.gs = [];
        this.rects = [];
    }

    Svg.prototype.changeAttr = function (elementId, attributes) {
        var element = document.getElementById(elementId);

        addOptions.call(element, attributes);
    };

    Svg.prototype.addG = function (options) {
        var g = createElement({ name: "g", id: this.gs.length, options: options });

        this.svg.appendChild(g);

        this.gs.push(g);
    };

    Svg.prototype.addRect = function (options) {
        var rect = createElement({ name: "rect", id: this.rects.length, options: options });
        this.svg.appendChild(rect);

        this.rects.push(rect);
    };

    //elements: array { name, options}
    Svg.prototype.addInElement = function (elementId, elements) {
        if (!elements || elements.length == 0) {
            console.log("Нет элементов для добавления");
            return;
        }

        var element = document.getElementById(elementId);

        for (var i = 0; i < elements.length; i++) {
            var name = elements[i].name + "s";

            if (!this[name])
                this[name] = [];

            var l = this[name].length;

            //hardcode 
            elements[i].id = l != 0 ? parseInt(this[name][l - 1].id.split("_")[1]) + 1 : 0;
            var child = createElement(elements[i]);
            element.appendChild(child);
            this[name].push(child);
        }
    };

    Svg.prototype.clear = function (elementId) {
        var el = document.getElementById(elementId);

        var childrens = el.children;

        while (childrens.length > 0) {
            deleteById.call(this, childrens[0].id);
            childrens[0].remove();
        }
    };

    function deleteById(id) {
        var name = id.split("_")[0] + "s";

        if (!this[name])
            return;

        var found = -1;

        for (var i = 0; i < this[name].length; i++) {
            if (this[name][i].id == id) {
                found = i;
                break;
            }
        }

        if (found == -1)
            return;

        this[name].splice(found, 1);
    }

    //options: x,y, width, height, style, actions(mouseover, click)

    function createElement(param) {
        var element = document.createElementNS(svgns, param.name);
        element.id = param.name + "_" + param.id;

        if (param.text !== undefined)
            element.innerText = element.textContent = param.text;

        addOptions.call(element, param.options);
        addActions.call(element, param.actions);
        return element;
    }

    function addOptions(options) {
        for (var key in options) {
            this.setAttributeNS(null, key, options[key]);
        }
    }

    function addActions(actions) {
        if (!actions)
            return;

        for (var key in actions) {
            this[key] = actions[key];
        }
    }

    return Svg;
})();