//function checkAge(age) {
//    return (age > 18) ? true :
//          confirm('Родители разрешили?');
//}

//var age = prompt('Ваш возраст?');

//if (checkAge(age)) {
//    alert('Доступ разрешен');
//} else {
//    alert('В доступе отказано');
//}

function min(a, b) {
    return (a > b) ? b : a;
}

function CalcMin() {
    var a = parseInt(document.getElementById("a").value);
    var b = parseInt(document.getElementById("b").value);
    var minOb = document.getElementById("min");
    minOb.value = min(a, b);
}

function pow(x, n) {
    var power = 1;
    for (var i = 0; i < n; i++) {
        power *= x;
    }
    return power;
}

function CalcPow() {
    var x = parseInt(document.getElementById("x").value);
    var n = parseInt(document.getElementById("n").value);
    document.getElementById("pow").value = pow(x, n);
}

function fib(fn) {
    var a = 0;
    var b = 1;
    for (var i = 0; i < fn ; i++) {
        a += b;
        b = a - b;
    }
    return a;
}

function CalcFib() {
    var fn = parseInt(document.getElementById('fn').value);
    document.getElementById("fib").value = fib(fn);
}

var array = ["Яблоко", "Апельсин", "Груша", "Лимон"];

function generateRandom(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
}

function showRandomElement() {
    var rand = generateRandom(0, array.length - 1);
    document.getElementById("randomElement").textContent = array[rand];
}

