//#region Pagination
App.Pagination = React.createClass({
    displayName: "Pagination",

    //#region Create Number
    _createNumbers: function () {
        var numbers = [];

        for (var i = 1; i <= this.props.totalPages; i++) {
            numbers.push(i);
        }

        return numbers;
    },
    //#endregion

    //#region Set Current Page
    _setCurrentPage: function (text) {
        var self = this.props;
        var dictionary = {
            "Начало": 1,
            "Назад": self.activeButton == 1 ? self.activeButton : self.activeButton - 1,
            "Дальше": self.activeButton == self.totalPages ? self.activeButton : self.activeButton + 1,
            "В конец": self.totalPages
        };

        var value = dictionary[text];

        if (!value)
            value = parseInt(text);

        if (self.activeButton == value)
            return false;

        this.state.current = value;
        return true;
    },
    //#endregion

    //#region Get Initial State
    getInitialState: function () {
        return {
            totalPages: 0,
            showPages: 10,
            startNames: ["Начало", "Назад"],
            endNames: ["Дальше", "В конец"],
            action: null,
            activeClass: 'active',
            activeButton: '1',
            current: 1
        };
    },
    //#endregion

    //#region On Click
    onClick: function (e) {
        if (!this._setCurrentPage(e.target.text))
            return;

        if (this.props.action)
            this.props.action(this.state.current);

        App.writeLog("Текущий номер в pagination:", [this.state.current]);
    },
    //#endregion

    //#region Get Show Interval
    _getShowInterval: function () {
        var show = this.props.showPages,
            total = this.props.totalPages,
            count = Math.floor(show / 2),
            value = this.props.activeButton;

        var s = value - count,
            e = value + count;

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
    },

    //#endregion

    //#region Render

    render: function () {
        var self = this;

        if (self.props.totalPages <= 1)
            return React.DOM.div(null, "");

        var numbers = self._createNumbers();
        var interval = self._getShowInterval();

        var createSector = function (el) {
            var attr = { onClick: self.onClick };

            if (el == self.props.activeButton)
                attr.className = "active";

            if (App.IsNumber(el)) {
                var display = (interval[0] <= el && el <= interval[1]) ? "block" : "none";
                attr.style = { display: display };
            }

            return React.DOM.li(null, React.DOM.a(attr, el));
        };

        return React.DOM.div({ className: "pagination" },
            React.DOM.ul(null, self.state.startNames.map(createSector)),
            React.DOM.ul(null, numbers.map(createSector)),
            React.DOM.ul(null, self.state.endNames.map(createSector))
        );
    }

    //#endregion

});
//#endregion