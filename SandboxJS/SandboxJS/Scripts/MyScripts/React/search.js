//#region Search
App.Search = React.createClass({
    displayName: "Search",

    //#region Get Initial State
    getInitialState: function () {
        return { items: [], query: '', totalPages: 0, take: 5, activePage: 1, postQuery: "", isSearching: false };
    },
    //#endregion

    //#region On Change
    onChange: function (e) {
        this.setState({ query: e.target.value });
    },
    //#endregion

    //#region On Search
    onSearch: function (page) {
        var self = this;
        //App.writeLog("начнем поиск", [self, arguments]);

        if (App.IsNull(page))
            page = 1;

        var model = {
            Query: self.state.query,
            Skip: self.state.take * (page - 1),
            Take: self.state.take
        };

        var method = !this.props.method ? 'post' : this.props.method;
        self.setState({ isSearching: true });
        $[method](self.props.urlSearch, model, function (data) {
            //App.writeLog("Успешно получены данные:", [data]);
            var totalPages = !data.Total ? 0 : parseInt(data.Total) / self.state.take;

            self.setState({ items: data.Items, totalPages: Math.ceil(totalPages), activePage: page, postQuery: self.state.query, isSearching: false });
        });
    },
    //#endregion

    //#region Render
    render: function () {
        var state = this.state,
            props = this.props,
            pagOptions = {
                totalPages: state.totalPages,
                action: this.onSearch,
                activeButton: App.IsType(state.activePage, 1) ? state.activePage : 1,
                showPages: this.props.showPages ? this.props.showPages : 10
            };
            //, style: { width: "86%" }
        //React.DOM.div(null,
        return React.DOM.form(null,
               React.DOM.input({ onChange: this.onChange, type: 'text', value: state.query, placeholder: "Введите название или ФИО, ИНН или связку ИНН-КПП, телефон" }),
               React.DOM.input({ onClick: this.onSearch, type: 'button', className: "grey", value: "Поиск" }),
           //),
           props.pagination && !state.isSearching ? props.pagination(pagOptions) : null,
           props.result({ items: state.items, query: state.postQuery, action: props.resultAction, isSearching: state.isSearching }),
           props.pagination && props.doublePagination && !state.isSearching ? props.pagination(pagOptions) : null
        );
    }
    //#endregion

});
//#endregion




