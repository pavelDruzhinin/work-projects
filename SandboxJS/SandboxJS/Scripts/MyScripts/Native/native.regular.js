

function HandleRegular() {
    var regValue = document.getElementById("regular").value;
    var reg = new RegExp(regValue, "g");
    var text = document.getElementById("text").value;

    document.getElementById("result").value = text.replace(reg, "");
    console.dir(regValue);
    console.dir(reg);
    console.log(text.search(reg));
}

document.getElementById('handle').onclick = HandleRegular;

//'19.12.2013'.search(/\d{1,2}\.\d{1,2}\.\d{1,4}/)
