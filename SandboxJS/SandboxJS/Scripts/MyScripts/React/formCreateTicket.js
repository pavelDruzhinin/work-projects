//#region Form Create Ticket

App.FormCreateTicket = React.createClass({
    displayName: "FormCreateTicket",

    //#region Get Initial State

    getInitialState: function () {
        return {
            error: false,
            errorText: "",
            //phone: "",
            //isValidPhone: false,
            isCreateCompany: false,
            divAttr: { className: "createTicket" },
            labelWidth: "110px"
        };
    },

    //#endregion

    //#region Create Company

    _createCompany: function () {
        var self = this,
            state = self.state,
            //divAttr = { style: { marginLeft: "125px" } },
            arr = [
                { name: "Название организации", ref: 'CompanyName', maxLength: "800" },
                { name: "ИНН", ref: 'Inn', maxLength: "12", change: self._changeInputNumbers },
                { name: "КПП", ref: 'Kpp', maxLength: "9", change: self._changeInputNumbers }
            ];

        return arr.map(function (el) {
            var isCompanyButton = (el.ref == "Kpp");

            return React.DOM.div({ className: "row" },
                        React.DOM.label({ style: { width: state.labelWidth } }, el.name),
                        React.DOM.div({ className: 'createTicket' },
                            React.DOM.input({ ref: el.ref, name: el.ref, type: 'text', maxLength: el.maxLength, onChange: el.change }),
                            isCompanyButton ? self._createCompanyButton() : null
                    )
                );
        });
    },

    //#endregion

    //#region Change Input Numbers

    _changeInputNumbers: function (e) {
        var value = App.GetOnlyNumbers(e.target.value);

        e.target.value = value;
    },

    //#endregion

    //#region Create Company Button
    _createCompanyButton: function () {
        var self = this,
            i = self.state.isCreateCompany ? 1 : 0,
            arr = [
                { span: "Если организации нет в списке нажмите ", a: "Создать организацию", action: self._setIsCreateCompany.bind(self, true) },
                { span: "", a: "Вернуться к поиску", action: self._setIsCreateCompany.bind(self, false) }
            ];

        return React.DOM.div(null,
            React.DOM.span(null, arr[i].span),
            React.DOM.a({ className: 'btn', onClick: arr[i].action }, arr[i].a)
        );
    },
    //#endregion

    //#region Set Create Company

    _setIsCreateCompany: function (value) {
        if (!App.IsType(value, true))
            return;

        this.setState({ isCreateCompany: value });
    },

    //#endregion

    //#region On Change
    //onChange: function (e) {
    //    var phone = new Phones(e.target.value);

    //    this.setState({ phone: phone.showPhone(), error: !phone.checkPhone(), errorText: phone.showError(), isValidPhone: phone.checkPhone() });
    //},
    //#endregion

    //#region Click Company
    clickCompany: function (elem) {
        var company = {},
            inputs = [];

        //if (!this.state.isValidPhone) {
        //    this.onChange({ target: { value: company.Phone } });
        //    return;
        //}

        App.foreach(elem.querySelectorAll("input[type=hidden]"), function (el) {
            company[el.attributes.name.value] = el.value;
        });

        //App.writeLog("Вызов из FormCreateTicket", [company]);

        for (var key in company) {
            inputs.push('<input name="' + key + '" value="' + company[key] + '" type="hidden"/>');
        }

        App.PostForm({
            url: "/pts/createticket",
            inputs: inputs.join(''),
            form: "TicketQueryForm"
        });

    },
    //#endregion

    //#region Render
    render: function () {
        var props = this.props,
            state = this.state;

        props.resultAction = this.clickCompany;

        return React.DOM.form({ className: "full box validate" },
                React.DOM.div({ className: "content" },
                    //React.DOM.div({ className: "row" },
                    //    React.DOM.label({ style: { width: state.labelWidth } }, "Номер телефона"),
                    //    React.DOM.div(state.divAttr,
                    //        state.error ? React.DOM.p({ style: { color: "red", margin: "10px 0 0 0" } }, state.errorText) : null,
                    //        React.DOM.input({ name: "Phone", type: 'text', onChange: this.onChange, maxLength: "11", value: state.phone })
                    //    )
                    //),
                    !state.isCreateCompany ? React.DOM.div({ className: "row" },
                        React.DOM.label({ style: { width: state.labelWidth } }, "Выберите организацию"),
                        React.DOM.div({ ref: 'div', className: 'createTicket' }, props.search(props), this._createCompanyButton())
                    ) : this._createCompany()

                )
            );
    }
    //#endregion
    
});

//#endregion