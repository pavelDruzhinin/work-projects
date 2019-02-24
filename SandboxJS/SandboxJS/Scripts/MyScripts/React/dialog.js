//#region Dialog

App.Dialog = React.createClass({
    displayName: "Dialog",

    //#region Init Dialog
    _initDialog: function () {
        $("#" + this.props.id).dialog(this.props.options);
    },
    //#endregion

    //#region Close Dialog
    _closeDialog: function () {
        $('#' + this.props.id).dialog("close");
    },
    //#endregion

    //#region Submit Dialog
    _submitDialog: function () {
        var action = this.props.action;
        var isClosed = true;

        if (App.IsFunction(action)) {
            var isActionClose = action();

            if (App.IsType(isActionClose, true))
                isClosed = isActionClose;
        }

        if (isClosed)
            this._closeDialog();
    },
    //#endregion

    //#region Render
    render: function () {
        var props = this.props,
            submitName = App.IsNull(this.props.submitName) ? "Готово" : this.props.submitName,
            contentOptions = props.contentProps;

        props.contentObject = props.content ? props.content(contentOptions) : null;

        this._initDialog();

        return React.DOM.div(null, props.contentObject,
                React.DOM.div({ className: "actions" },
                    React.DOM.div({ className: "left" }, React.DOM.button({ className: "grey", onClick: this._closeDialog }, "Отмена")),
                    React.DOM.div({ className: "right" }, React.DOM.button({ className: "red", onClick: this._submitDialog }, submitName))
                ));
    }
    //#endregion
});

//#endregion