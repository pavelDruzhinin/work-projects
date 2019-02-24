
//#region Select List
App.SelectList = React.createClass({
    displayName: "SelectList",
    getInitialState: function () {
        return { active: this.props.firstId };
    },
    clickItem: function (e) {
        var active = this.state.active,
            id = e.currentTarget.id.split("_")[1],
            action = this.props.action;

        if (id == active)
            return false;

        if (App.IsFunction(action))
            action(id);

        this.setState({ active: id });
        return false;
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({ active: nextProps.firstId });
    },
    render: function () {
        var self = this,
            active = self.state.active,
            props = self.props,
            idKey = props.item.idKey,
            elemKey = props.item.elemKey;

        var createItem = function (el, i) {
            var attr = { onClick: self.clickItem, id: "item_" + el[idKey] };

            if (el[idKey] == active)
                attr.className = 'active';

            return React.DOM.li(attr, React.DOM.span(null, el[elemKey]));
        };

        return React.DOM.ul(null, props.items.map(createItem));
    }
});
//#endregion

//#region SelectPopup
App.SelectPopup = React.createClass({
    displayName: "SelectPopup",
    getInitialState: function () {
        return { items: [] };
    },
    render: function () {
        var props = this.props;
        //state = this.state;

        return React.DOM.div({ className: "large popup_modal select_popup" },
            React.DOM.h3(null),
            React.DOM.div({ className: "content box" }, props.list({ items: props.items, item: props.item }))
        );
    }
});
//#endregion

function initializeSelectPopup(id, options) {

    React.renderComponent(
    App.SelectPopup({
        items: options.items,
        list: App.SelectList,
        item: options.item
    }),
    document.getElementById(id)
);
}
