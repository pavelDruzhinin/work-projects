//#region Company result
App.CompanyResult = React.createClass({
    displayName: "CompanyResult",

    //#region Click Item
    clickItem: function (e) {
        var elem = e.currentTarget;

        if (App.IsFunction(this.props.action))
            this.props.action(elem);
    },
    //#endregion

    //#region Render
    render: function () {
        var self = this;
        var items = self.props.items;
        var messages = ['Нет записей по запросу "' + this.props.query + '"', "Нет записей.", "Пожалуйста, подождите, идет поиск..."];

        if (self.props.isSearching)
            return React.DOM.p(null, messages[2]);

        var i = this.props.query ? 0 : 1;

        if (!items.length)
            return React.DOM.p(null, messages[i]);

        return React.DOM.ul({ className: "company-result" }, items.map(function (el) {
            return React.DOM.li({ onClick: self.clickItem },
                React.DOM.span({ name: "Inn" }, el.Inn),
                React.DOM.span({ name: "Kpp" }, el.Kpp),
                React.DOM.span({ name: "CompanyName" }, el.CompanyName),
                React.DOM.input({ type: "hidden", name: "CompanyId", value: el.CompanyId })
            );
        }));
    }
    //#endregion

});
//#endregion