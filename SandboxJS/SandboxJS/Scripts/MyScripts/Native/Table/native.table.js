var Table = (function () {

    //options:{headers,rows,thcolums}
    function Table(table, options) {
        this.table = table;
        this.rows = [];
        this.headers = [];
        this.footers = [];

        if (options !== undefined)
            applyOptions(this, options);
    }

    Table.prototype.showRows = function () {
        console.log("Table Rows:");
        console.log(this.rows);
        console.log("|------------------|");
    };

    Table.prototype.addRow = function (data, ths) {
        if (this.table.tBodies.length == 0)
            createBody(this.table);

        if (ths === undefined)
            ths = [];

        var tbody = this.table.tBodies[0];
        var tr = document.createElement("tr");
        var i = 0;
        for (var key in data) {
            var type = ths.indexOf(i + 1) != -1 ? "th" : "td";

            var td = document.createElement(type);
            td.innerText = data[key];

            tr.appendChild(td);
            i++;
        }

        tbody.appendChild(tr);
        this.rows.push(tr);
    };

    Table.prototype.addRows = function (data, ths) {
        for (var i = 0; i < data.length; i++) {
            this.addRow(data[i], ths);
        }
    };

    Table.prototype.deleteRow = function (index) {

    };

    Table.prototype.addHeader = function (data) {
        if (this.table.tHead === null)
            this.table.createTHead();

        var thead = this.table.tHead;

        var trHead = document.createElement("tr");
        for (var i = 0; i < data.length; i++) {
            var tdHead = document.createElement('th');
            tdHead.innerText = data[i];
            trHead.appendChild(tdHead);
        }

        thead.appendChild(trHead);
        this.headers.push(trHead);
    };

    Table.prototype.addFooter = function (data) {

    };

    Table.prototype.clear = function () {
        while (this.table.rows.length > 0) {
            this.table.deleteRow(0);
        }
        clearAll.call(this);
    };

    Table.prototype.updateRows = function (data) {
        clearTBody.call(this);

        this.addRows(data);
    };

    function createBody(table) {
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
    }

    function applyOptions(table, options) {
        if (options.headers !== undefined)
            table.addHeader(options.headers);

        if (options.rows !== undefined)
            table.addRows(options.rows, options.thcolums);
    }

    function clearTBody() {
        var tbody = this.table.tBodies[0];
        while (tbody.rows.length > 0) {
            tbody.deleteRow(0);
        }
        this.rows = [];
    }

    function clearAll() {
        this.rows = [];
        this.headers = [];
        this.footers = [];
    }

    return Table;
})();