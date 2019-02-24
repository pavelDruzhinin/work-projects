//#region SearchResult
App.SearchResult = React.createClass({
    displayName: "SearchResult",

    //#region Render

    render: function () {
        var items = this.props.items;

        if (!items.length)
            return React.DOM.p(null, "Нет записей.");

        return React.DOM.ul(null, items.map(function (el) {
            return React.DOM.li(null, el.Inn);
        }));
    }

    //#endregion

});
//#endregion