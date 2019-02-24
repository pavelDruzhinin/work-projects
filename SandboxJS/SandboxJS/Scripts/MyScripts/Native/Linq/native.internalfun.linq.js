var listObjects = '"[["\"https://focus.kontur.ru/entity?query=1026303065304\"","\"6325028472\"","\"632501001\"","\"1026303065304\"","\"Муниципальное унитарное предприятие \"Жилищно-эксплуатационная служба\" городского округа Сызрань\"","\"МУП \"ЖЭС\"\"","\"Самарская обл, Сызрань г, Свердлова ул, 35\"","\"\"","\"+78464980396\"","\"+78464338761\"","\"yuorist_jes@mail.ru\"","\"mupjes.narod.ru\"","\"63\"","\"Производство пара и горячей воды (тепловой энергии) котельными\"","\"Шилин Андрей Александрович\"","\"\"","\"+78464338761\"","\"szr_jes@mail.ru\"","\"\"","\"\"","\"\"","\"+78464338761\"",""],["\"https://focus.kontur.ru/entity?query=1046301251150\"","\"6325033916\"","\"632501001\"","\"1046301251150\"","\"ООО \"Энергетик\"\"","\"ООО \"Энергетик\"\"","\"Самарская обл, Сызрань г, Дизельная ул, 12\"","\"\"","\"+78464373904\"","\"+78464373904\"","\"\"","\"\"","\"63\"","\"Распределение электроэнергии\"","\"\"","\"\"","\"\"","\"\"","\"\"","\"\"","\"\"","\"\"",""]]"';

function convertToArray(obj) {
    if (!isArray(obj) && !isString(obj)) {
        showError(2, "toArray");
        return 0;
    }

    if (isString(obj))
        return convertStringToArray(obj);

    var context = obj;

    var temp = [];

    for (var i = 0; i < context.length; i++) {
        if (isFunction(object)) {
            temp.push(new object(context[i]));
            continue;
        }

        temp.push(context[i]);
    }

    return temp;
}

function isJQueryElement(object) {
    return object.jquery != undefined;
}

function convertBool(value1, value2, sign) {
    if (isString(value1)) {
        value1 = value1.replace(/\s/g, '');
    }
    writeInConsole('"' + value1 + '"' + sign + '"' + value2 + '"');
    switch (sign) {
        case "==":
            return value1 == value2;
        case "<=":
            return value1 <= value2;
        case ">=":
            return value1 >= value2;
        case "!=":
            return value1 != value2;
        case ">":
            return value1 > value2;
        case "<":
            return value1 < value2;
        default:
            return true;
    }
}

function isNumeric(number) {
    return isFinite(parseInt(number));
}

function isArray(array) {
    return checkType(array) == '[object Array]';
}

function isObject(object) {
    return checkType(object) == '[object Object]';
}

function isString(str) {
    if (isNumeric(str))
        return false;

    return checkType(str) == '[object String]';
}

function isFunction(fun) {
    return checkType(fun) == '[object Function]';
}

function convertFunction(fun) {
    return isFunction(fun) ? fun() : fun;
}

function checkType(object) {
    if (object === undefined)
        return '';

    return {}.toString.call(object);
}

function clearString(str) {
    if (str[0].search(/\"/) != -1)
        str = str.substring(1);

    var last = str.length - 1;
    if (str[last].search(/\"/) != -1)
        str = str.substring(0, last);

    return str;
}

function hasProperty(object, prop) {
    if (isObject(object))
        return object[prop] !== undefined || prop in object;

    return object[prop] !== undefined;
}

function convertPredicate(predicate) {
    if (predicate === undefined)
        return null;

    //for information
    var p = {
        keyArray: [], // array properties layer [key 1 layer, key 2 layer, ...]
        sign: '',     // comparison operators: <, >, ==, !=
        value: 0,     //value for comparison operators
        noSign: false, //if not exist sign
        isSelf: false //if self value array
    };

    //find keys
    var pred = convertKeys(predicate);

    if (pred.keys.length > 0 || (pred.isSelf && !pred.noSign))
        return pred;

    return null;
}

//convert predicate: "x => x.UserList.UserId >= 0"
function convertKeys(predicate) {

    //delete spaces 
    predicate = predicate.replace(/\s/g, '');

    var p;

    var firstSeparator = predicate.indexOf('.') + 1;
    var lastSeparator = -1;
    var firstDigital = -1;

    if (firstSeparator == 0) {
        firstSeparator = predicate.lastIndexOf("x");
        var str = predicate.substring(firstSeparator + 1);
        lastSeparator = str.search(/[<,>,=,!]/);
        firstDigital = str.search(/[A-Za-zА-Яа-яё0-9]/);

        p = {
            keys: [],
            isSelf: true,
            sign: str.substring(lastSeparator, firstDigital),
            value: str.substring(firstDigital)
        };

        if (isString(p.value)) {
            p.value = clearString(p.value);
            p.sign = clearString(p.sign);
        }

        writeInConsole({ firstSeparator: firstSeparator, stringKeys: "x", lastSeparator: lastSeparator, firstDigital: firstDigital });
        writeInConsole(p);
        return p;
    }

    var stringKeys = predicate.substring(firstSeparator);

    lastSeparator = stringKeys.search(/[<,>,=,!]/);
    firstDigital = stringKeys.substring(lastSeparator).search(/[A-Za-zА-Яа-яё0-9\"]/);

    if (lastSeparator != -1) {

        p = {
            sign: stringKeys.substring(lastSeparator, lastSeparator + firstDigital),
            value: stringKeys.substring(lastSeparator + firstDigital),
            noSign: false
        };

        if (isString(p.value) && p.value.length > 0) {
            writeInConsole(p.value);
            if (p.value[0].search(/\"/) != -1)
                p.value = p.value.substring(1);

            var last = p.value.length - 1;

            if (p.value[last].search(/\"/) != -1)
                p.value = p.value.substring(0, last);
        }

        stringKeys = stringKeys.substring(0, lastSeparator);

        p.keys = stringKeys.split('.');
        writeInConsole({ firstSeparator: firstSeparator, stringKeys: stringKeys, lastSeparator: lastSeparator });
        writeInConsole(p);
        return p;
    }

    p = {
        keys: stringKeys.split('.'),
        noSign: true
    };

    writeInConsole({ firstSeparator: firstSeparator, stringKeys: stringKeys, lastSeparator: lastSeparator });
    writeInConsole(p);
    return p;
}

function showError(type, from) {
    switch (type) {
        case 1:
            console.log("Ошибка " + from + ": В данный момент linq не обрабатывает больше двух вложенных объектов.");
            break;
        case 2:
            console.log('Ошибка ' + from + ': объект не является массивом.');
            break;
    }
}

function convertToString(object) {
    if (object === undefined || !isObject(object))
        return '';

    var str = '';

    for (var key in object) {
        if (isArray(object[key])) {
            var array = object[key];
            for (var i = 0; i < array.length; i++)
                str += convertToString(array[i]);

            continue;
        }

        str += object[key];
    }

    return str;
}

function convertStringToArray(str) {
    if (!isString(str))
        return str;

    var context = trimToString(str, '"', '"');

    if (findToString(context, '[', ']')) {
        context = trimToString(context, '[', ']');

        context = searchArrayOrObject(context);

        if (isArray(context)) {
            var temp = [];
            for (var i = 0; i < context.length; i++) {
                temp.push(convertStringToObject(context[i]));
            }

            return temp;
        }

        return context.split(',');
    }

    if (findToString(context, '{', '}') && str.indexOf(':') != -1) {
        var context = trimToString(context, '{', '}');
        return [convertStringToObject(context)];
    }

    return context.split(',');
}

function searchArrayOrObject(str) {
    if (findToString(str, '[', ']'))
        return trimToString(str, '[', ']').split('],[');

    if (findToString(str, '{', '}'))
        return trimToString(str, '{', '}').split('},{');

    return str;

}

function convertStringToObject(str) {

    var mas = str.split(',');

    var obj = {};

    for (var i = 0; i < mas.length; i++) {
        var keyValue = mas[i].split(':');

        if (keyValue.length == 1) {
            obj[i] = keyValue[0];
            continue;
        }

        obj[keyValue[0]] = keyValue[1];
    }

    return obj;
}

function findToString(str, first, last) {
    if (str[0] == first && str[str.length - 1] == last)
        return true;

    return false;
}

function trimToString(str, first, last) {
    if (!findToString(str, first, last))
        return str;

    return str.substring(1, str.length - 1);
}

function unionObjects(object1, object2, fun) {

    if (isFunction(fun))
        return new fun(object1, object2);

    var obj = {};

    for (var key in object1) {
        obj[key] = object1[key];
    }

    for (var key in object2) {
        if (!hasProperty(obj, key))
            obj[key] = object2[key];
    }

    return obj;
}

function equallyObjects(obj1, obj2) {
    var o1 = convertFunction(obj1);
    var o2 = convertFunction(obj2);

    for (var key in o1) {
        if (convertFunction(o1[key]) != convertFunction(o2[key]))
            return false;
    }

    return true;
}

function writeInConsole(message) {
    if (settings.writeInConsole)
        console.log(message);
}