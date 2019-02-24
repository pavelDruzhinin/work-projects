(function () {
    var App = function () { };

    App.prototype = {

        //#region IsNullOrWhiteSpace
        IsNullOrWhiteSpace: function (str) {
            if (!this.IsType(str, ""))
                return true;

            if (this.IsNull(str))
                return true;

            str = str.replace(" ", "");

            return str.length == 0;
        },
        //#endregion

        //#region GetType
        GetType: function (value) {
            return {}.toString.call(value);
        },
        //#endregion

        //#region IsType
        IsType: function (value, type) {
            return this.GetType(value) == this.GetType(type);
        },
        //#endregion

        //#region IsEmptyObj
        IsEmptyObj: function (obj) {
            if (!this.IsType(obj, {}))
                return false;

            for (var key in obj) {
                return false;
            }

            return true;

        },
        //#endregion

        //#region IsNull
        IsNull: function (val) {
            return this.IsType(val, null) || this.IsType(val, undefined);
        },
        //#endregion

        //#region Is Function
        IsFunction: function (fun) {
            return this.IsType(fun, function () { });
        },
        //#endregion

        //#region Is Number
        IsNumber: function (value) {
            if (this.IsType(value, ""))
                return !isNaN(parseInt(value));

            return this.IsType(value, 1);
        },
        //#endregion

        //#region Post Form

        PostForm: function (options) {
            if (!options || this.IsEmptyObj(options))
                return;

            if (document.getElementById(options.form) !== null) {
                $('#content #' + options.form).remove();
            }

            var form = $('<form action="' + options.url +
                    '" class="unstyled no-box" id="' + options.form + '" ' +
                    'method="post" name="' + options.form + '" target="_blank">' +
                    options.inputs +
                    '</form>');

            $('#content').append(form);
            $(form).submit();
        },

        //#endregion

        //#region Write Log
        writeLog: function (message, objects) {
            var date = new Date();

            var d = "[" + convertDate(date.toJSON()) + "]: ";
            //console.log("|-------------------------------------------|");
            console.log(d + message);

            if (!this.IsType(objects, []))
                return;

            for (var i = 0; i < objects.length; i++) {
                console.dir(objects[i]);
            }
        },

        //#endregion

        //#region Read Data Form

        ReadDataForm: function (formId) {
            var obj = {},
                form = document.getElementById(formId),
                inputs = form === null || form === undefined ? [] : form.children;

            if (inputs.length == 0)
                return null;

            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];

                obj[input.id] = getValue(input.value);
            }

            return obj;
        },

        //#endregion

        //#region Generate Random Id

        GenerateRandomId: function () {
            var id = Date.now();

            var random = Math.floor(Math.random() * 1000);

            if (random < 100)
                random *= 10;

            return "" + id + random;
        },

        //#endregion

        //#region Parse Money
        ParseMoney: function (str) {

            str += '';

            if (str.length <= 3)
                return str;

            var temp = [];

            for (var i = str.length; i > -1; i -= 3) {
                temp.push(str.substring(i - 3, i));
            }

            return temp.reverse().join(' ');
        },
        //#endregion

        //#region Cancel Copy Paste
        CancelCopyPaste: function (elementId) {

            document.getElementById(elementId).oncontextmenu = function () {
                return false;
            };

            document.getElementById(elementId).onkeydown = function (e) {

                var ev = e || event, k = e.which || e.button;

                if (ev.ctrlKey && k == 86)
                    return false;
            };

            document.getElementById(elementId).onkeypress = function (e) {

                var ev = e || event, k = e.which || e.button;

                if (ev.ctrlKey && k == 86)
                    return false;
            };
        },
        //#endregion

        ToNumber: function (x) {
            if (this.IsType(x, 1))
                return x;

            if (!this.IsType(x, ""))
                return new TypeError("app.ToNumber: x is not string");

            return parseFloat(x.replace(',', '.'));

        }
    };

    //#region Convert Number
    function convertNumber(number) {
        return number >= 10 ? "" + number : "0" + number;
    }
    //#endregion

    //#region Convert Date
    function convertDate(date, writeInLog) {
        var d = new Date(date);

        if (writeInLog)
            console.log(date);

        date = convertNumber(d.getDate()) + "." + convertNumber(d.getMonth() + 1) + "." + convertYear(d.getFullYear());

        var time = convertNumber(d.getHours()) + ":" + convertNumber(d.getMinutes()) + ":" + convertNumber(d.getSeconds());

        return date + " " + time;
    }
    //#endregion

    //#region Convert Year
    function convertYear(year) {
        year += "";

        return year.length < 4 ? "200" + year : year;
    }
    //#endregion

    //#region Get Value
    function getValue(value) {
        if (value == "True")
            return true;

        if (value == "False")
            return false;

        return value;
    }
    //#endregion

    window.App = new App();

})(window);