var _a = moment("2012-01-21T23:59:59+04:00");
var _b = moment(moment(new Date()).format());

function Experience(createDate) {

    var dateNow = moment(moment(new Date()).format());

    createDate = moment(createDate);

    var partDate = ["years", "month", "days"];

    var strDate = {
        //1, 2-4, 5-...
        years: ["год", "года", "лет"],
        month: ["месяц", "месяца", "месяцев"],
        days: ["день", "дня", "дней"]
    };

    function getStrDate(val, key) {
        var temp = "";

        val = "" + val;

        var last = parseInt(val.substr(val.length - 1));

        last === 1 ? temp = val + " " + strDate[key][0] + " " : temp;

        last > 1 && last < 5 ? temp = val + " " + strDate[key][1] + " " : temp;

        last > 4 ? temp = val + " " + strDate[key][2] + " " : temp;

        return temp;
    }

    var experinceDate = {};

    for (var i = 0; i < partDate.length; i++) {
        if (partDate[i] === 'days') {

            var days = dateNow.date() - createDate.date();
            experinceDate[partDate[i]] = days < 0 ? dateNow.diff(createDate, partDate[i]) : days;

            //experinceDate[partDate[i]] = dateNow.date() - createDate.date();
            continue;
        }

        experinceDate[partDate[i]] = dateNow.diff(createDate, partDate[i]);
    }

    experinceDate.showKeys = function () {
        for (var key in experinceDate) {
            console.log(experinceDate[key]);
        }
    };

    experinceDate.toString = function () {
        var str = "";
        for (var key in experinceDate) {
            var temp;

            if (key === 'month') temp = +experinceDate[key] % 12;
                //else if (key === 'days') temp = +experinceDate[key] % 30;
            else temp = +experinceDate[key];

            if (temp <= 0) continue;

            str += getStrDate(temp, key);
        }

        return str;
    };

    return experinceDate;
}

//var Experience = (function () {

//    var dateNow = moment(moment(new Date()).format());

//    var partDate = ["years", "month", "days"];

//    var strDate = {
//        //1, 2-4, 5-...
//        years: ["год", "года", "лет"],
//        month: ["месяц", "месяца", "месяцев"],
//        days: ["день", "дня", "дней"]
//    };

//    function getStrDate(val, key) {
//        var temp = "";

//        var last = val;

//        last === 1 ? temp = val + " " + strDate[key][0] + " " : temp;

//        last > 1 && last < 5 ? temp = val + " " + strDate[key][1] + " " : temp;

//        last > 4 ? temp = val + " " + strDate[key][2] + " " : temp;

//        return temp;
//    }

//    var experinceDate = {};

//    experinceDate.create = function (createDate) {
//        console.log(createDate);
//        createDate = moment(createDate);
//        for (var i = 0; i < partDate.length; i++) {
//            if (partDate[i] === 'days') {
//                debugger;
//                var days = dateNow.date() - createDate.date();
//                experinceDate[partDate[i]] = days < 0 ? dateNow.diff(createDate, partDate[i]) : days;
//                continue;
//            }

//            experinceDate[partDate[i]] = dateNow.diff(createDate, partDate[i]);
//        }

//        return experinceDate;
//    };

//    experinceDate.showKeys = function () {
//        for (var key in experinceDate) {
//            console.log(experinceDate[key]);
//        }
//    };

//    experinceDate.toString = function () {
//        var str = "";
//        for (var key in experinceDate) {
//            var temp;

//            if (key === 'month') temp = +experinceDate[key] % 12;
//            else temp = +experinceDate[key];

//            if (temp <= 0) continue;

//            str += getStrDate(temp, key);
//        }

//        return str;
//    };

//    return experinceDate;
//})()