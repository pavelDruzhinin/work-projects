var arr = ["test", 2, 1.5, false];

var ArrayEratosfen = [];

function clearNode(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function fillArrayNumber(array, n) {
    for (var i = 2; i <= n; i++) {
        array.push(i);
    }
}

function crossOutNumberMultiple(array, p) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] % p == 0 && array[i] != p) array.splice(i, 1);
    }
}

function showArrayInDocument(array, documentNode) {
    clearNode(documentNode);
    documentNode.innerText = array.join(', ');
}

function showSumArray(array) {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
        if (isNumeric(array[i])) sum += array[i];
    }

    return sum;
}

function initSieveErastofen() {
    ArrayEratosfen.splice(0, ArrayEratosfen.length);
    var CountElements = document.getElementById("numberEristofen").value;
    var arrayPrimeNode = document.getElementById("arPrime");
    fillArrayNumber(ArrayEratosfen, CountElements);

    for (var i = 0; i < ArrayEratosfen.length; i++) {
        crossOutNumberMultiple(ArrayEratosfen, ArrayEratosfen[i]);
    }

    showArrayInDocument(ArrayEratosfen, arrayPrimeNode);
    document.getElementById('countInEristofen').innerText = " " + ArrayEratosfen.length;
    document.getElementById('sumEristofen').innerText = " " + showSumArray(ArrayEratosfen);
}

function isBool(elem) {
    if (elem != "false" && elem != "true") return false;
    return true;
}

function isNumeric(elem) {
    var check = parseFloat(elem);
    if (isNaN(check)) return false;
    return true;
}

function filterValue(elem) {
    if (isBool(elem)) return elem == "true" ? true : false;
    if (isNumeric(elem)) return parseFloat(elem);
    return elem;
}

function find(array, elem) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == filterValue(elem)) return i;
    }
    return -1;
}

function findElmentInMassiv() {
    var elem = document.getElementById('el').value;
    var elemInArray = document.getElementById('elInAr');
    var index = find(arr, elem);
    if (index > -1) { elemInArray.innerText = arr[index]; }
    else { elemInArray.innerText = "Такого элемента нет в массиве"; }
}

var elsInAr = document.getElementById('elsInAr');
showArrayInDocument(arr, elsInAr);

document.getElementById("Find").onclick = findElmentInMassiv;
document.getElementById("getArrayPrime").onclick = initSieveErastofen;