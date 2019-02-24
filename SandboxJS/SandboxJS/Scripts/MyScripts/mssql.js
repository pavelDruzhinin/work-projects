function Insert(name, keys) {

    var txt = 'INSERT INTO ' + name + '(';
    var values = "VALUES(";
    for (var key in keys) {
        txt += key + ',';
        values += "'" + keys[key] + "',";
    }

    return txt.substring(0, txt.length - 1) + ') ' + values.substring(0, values.length - 1) + ")";
}


function Account(typeId, clientId, begin, end, number, sum) {
    this.intAccountTypeId = typeId;
    this.intClientId = clientId;
    this.datAccountBegin = moment(begin, 'DD.MM.YYYY').format();
    this.datAccountEnd = moment(end, 'DD.MM.YYYY').format();
    this.txtAccountNumber = number;
    this.fltAccountSum = sum;
}

function Operation(typeId, accountId, value) {
    this.intOperationTypeId = typeId;
    this.intAccountId = accountId;
    this.fltValue = value;
}



function createInsert() {
    var tblAccount = [
        new Account(1, 3, '12.12.2013', '12.01.2014', '12345', '3500'),
        new Account(2, 5, '15.05.2012', '15.08.2013', '45123', '5900'),
        new Account(8, 8, '16.02.2013', '16.03.2013', '78945', '3900'),
        new Account(9, 9, '18.12.2012', '12.05.2013', '45612', '2350'),
        new Account(5, 7, '12.09.2014', '12.10.2014', '45785', '8520'),
        new Account(3, 10, '18.01.2012', '16.09.2013', '78562', '9850'),
        new Account(7, 6, '18.01.2012', '16.08.2012', '54612', '9630'),
        new Account(1, 3, '25.09.2011', '15.10.2014', '74112', '1470'),
        new Account(4, 5, '23.06.2012', '15.07.2013', '89564', '8950'),
        new Account(7, 3, '20.01.2013', '20.02.2014', '56234', '9860')
    ];

    var tblOperation = [
        new Operation(1, 1, '3500'),
        new Operation(2, 2, '4500'),
        new Operation(3, 3, '2500'),
        new Operation(5, 3, '1400'),
        new Operation(8, 5, '8520'),
        new Operation(9, 4, '2350'),
        new Operation(4, 6, '9850'),
        new Operation(7, 7, '9630'),
        new Operation(6, 9, '8950'),
        new Operation(10, 10, '9860')
    ];

    tblAccount.forEach(function (elem) {
        console.log(Insert("tblAccount", elem));
        document.getElementById("InsertResult").value += Insert("tblAccount", elem) + '\r\n';
    });

    tblOperation.forEach(function (elem) {
        console.log(Insert("tblOperation", elem));
        document.getElementById("InsertResult").value += Insert("tblOperation", elem) + '\r\n';
    });
}