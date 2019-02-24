function CancelCopyPast(elementId, func) {
    var codes = [].slice.call(arguments, 2);

    var pressed = {};
    
    document.getElementById(elementId).oncontextmenu = function() {
        return false;
    };
    
    document.getElementById(elementId).onkeydown = function (e) {
        e = e || window.event;

        pressed[e.keyCode] = true;

        for (var i = 0; i < codes.length; i++) { // проверить, все ли клавиши нажаты
            if (!pressed[codes[i]]) {
                return;
            }
        }

        // во время показа alert, если посетитель отпустит клавиши - не возникнет keyup
        // при этом JavaScript "пропустит" факт отпускания клавиш, а pressed[keyCode] останется true
        // чтобы избежать "залипания" клавиши -- обнуляем статус всех клавиш, пусть нажимает всё заново
        pressed = {};

        func();

        return false;
    };

    document.getElementById(elementId).onkeyup = function (e) {
        e = e || window.event;

        delete pressed[e.keyCode];
    };
}