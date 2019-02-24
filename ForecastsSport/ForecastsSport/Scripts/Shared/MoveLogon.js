$(document).ready(function () {
    var ingress = document.getElementById('ingress');
    ingress.onclick = MoveLogon;
    var login = document.getElementById('Login');
    login.onclick = CheckMessage;
});

function CheckMessage() {
    if ($('.message span').text() != "") {
        $('.message').css({ 'border': '1px solid #000' });
    } else {
        $('.message').removeAttr('style');
    }
}

function MoveLogon() {

    if ($('#logon').position().top == 32) {
        $('#logon').animate({ "top": "-=232px" }, "slow");
        document.getElementById('UserName').focus();
    }
    else {
        $('#logon').animate({ "top": "+=232px" }, "slow");
        document.getElementById('UserName').focus();
    }
}