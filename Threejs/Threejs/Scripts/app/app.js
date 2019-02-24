(function ($w) {

    var app = function () {

    }

    app.prototype = {
        onwheel: function (elem, func) {
            if (elem.addEventListener) {
                if ('onwheel' in document) {
                    // IE9+, FF17+
                    elem.addEventListener("wheel", onWheel, false);
                } else if ('onmousewheel' in document) {
                    // устаревший вариант события
                    elem.addEventListener("mousewheel", onWheel, false);
                } else {
                    // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
                    elem.addEventListener("MozMousePixelScroll", onWheel, false);
                }
            } else { // IE<9
                elem.attachEvent("onmousewheel", onWheel);
            }

            function onWheel(e) {
                e = e || window.event;

                // wheelDelta не дает возможность узнать количество пикселей
                var delta = e.deltaY || e.detail || e.wheelDelta;

                func(delta);

                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            }
        }
    };

    $w.App = new app();

})(window);