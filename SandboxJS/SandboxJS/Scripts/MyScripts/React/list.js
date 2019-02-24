App.List = React.createClass({
    displayName: "List",
    render: function () {
        var createItem = function (el) {
            return React.DOM.li(null, React.DOM.span({ className: 'product_name' }, el.Name));
        };

        return React.DOM.ul({ className: 'logs' }, this.props.items.map(createItem));
    }
});

App.EditList = React.createClass({
    displayName: "List",
    _addItem: function () {
        var text = this.state.text,
            addItem = this.props.addItem;

        if (App.IsNullOrWhiteSpace(text))
            return;

        var newItems = this.state.items.concat([{ Name: text }]);

        if (App.IsFunction(addItem)) {
            addItem(text);
        }

        this.setState({ items: newItems, text: '' });
    },
    getInitialState: function () {
        return { items: [], text: '' };
    },
    componentDidMount: function () {
        var self = this,
            getItems = self.props.getItems;

        if (App.IsNull(getItems))
            return;

        $[getItems.method](getItems.url, function (data) {
            self.setState({ items: data });
        });
    },
    onChange: function (e) {
        this.setState({ text: e.target.value });
    },
    render: function () {
        var props = this.props,
            state = this.state;

        return React.DOM.section(null,
            React.DOM.input({ type: 'text', onChange: this.onChange, className: 'addText', value: state.text }),
            React.DOM.button({ onClick: this._addItem }, "Добавить"),
            props.list({ items: state.items })
        );
    }
});


