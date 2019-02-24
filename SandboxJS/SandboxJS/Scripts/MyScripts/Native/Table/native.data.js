var data = [
    { CompanyId: 1, CompanyName: "Петрокрипт", IsClient: true },
    { CompanyId: 2, CompanyName: "Лидер", IsClient: false }
];

var dataUpdate = [{ CompanyId: 4, CompanyName: "Ком", IsClient: false }];

var headers = ["п/п", "Название организации", "Клиент"];

var thcolumns = [1, 3];

var table = new Table(document.getElementById("myTable"), { headers: headers, rows: data, thcolums: thcolumns });