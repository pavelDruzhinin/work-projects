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