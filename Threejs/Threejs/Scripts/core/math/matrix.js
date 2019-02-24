(function ($w) {

    //#region Constructor

    var matrix = function (n, m) {
        this.rows = n;
        this.columns = m;

        this._self = createMatrix(n, m);
    }

    //#endregion

    matrix.prototype.multiply = function (mat2) {
        if (!this.isValid(mat2)) {
            console.log('Error multiply matrix');
            return null;
        }

        //console.log("                        ");
        //console.log('|__________new multiply______________|');
        var temp = createMatrix(mat2.columns, this.rows);

        for (var i = 0; i < temp.length; i++) {
            for (var j = 0; j < temp[i].length; j++) {

                temp[j][i] = this.sum(mat2, i, j);
            }
        }

        this._self = temp;
        this.columns = temp.length;
        this.rows = temp[0].length;

        return this._self;
    }

    matrix.prototype.set = function () {
        var mas = arguments;

        var r = 0;
        var c = 0;
        for (var i = 0; i < mas.length; i++) {

            if (c > this.columns - 1) {
                r++;
                c = 0;
            }

            if (r > this.rows - 1)
                break;

            this._self[c][r] = mas[i];
            c++;
        }
    }

    matrix.prototype.setValue = function (i, j, value) {
        this._self[i][j] = value;
    }

    matrix.prototype.get = function (i, j) {
        if (i != undefined && j != undefined)
            return this._self[i][j];

        if (i != undefined)
            return this._self[i][0];

        return this._self;
    }

    matrix.prototype.toString = function () {
        return '[Object Matrix]';
    }

    matrix.prototype.isValid = function (mat2) {
        if (!mat2 || mat2.toString() != this.toString())
            return false;

        if (mat2.rows != this.columns)
            return false;

        return true;
    }

    matrix.prototype.sum = function (mat2, row, column) {
        var val = 0;

        for (var i = 0; i < this.columns; i++) {
            //console.log("i = " + i + ", sum1 = " + this.get(i, row) + ", sum2 = " + (mat2.get(column, i)));
            val += this.get(i, row) * mat2.get(column, i);
        }

        //console.log("row = " + row + ", column = " + column, val);
        //console.log('|______________|');

        return val;

    }

    //#region Private Methods

    function createMatrix(n, m) {
        var mas = [];
        for (var i = 0; i < m; i++) {
            mas[i] = [];
            for (var j = 0; j < n; j++) {
                mas[i][j] = 0;
            }
        }

        return mas;
    }

    //#endregion


    $w.Matrix = matrix;

})(window);