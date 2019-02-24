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
        },
        getMesh: function (geometry, material) {
            return new THREE.Mesh(geometry, material);
        }
    };

    $w.App = new app();

})(window);

(function ($app, $thr, $doc, $RAF) {
    'use strict';

    var scene, camera, renderer;

    function init() {
        scene = new $thr.Scene();
        camera = new $thr.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        renderer = new $thr.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        $doc.body.appendChild(renderer.domElement);

        var geometry = new $thr.SphereGeometry(5, 32, 32);
        //var material = new $thr.MeshBasicMaterial({ color: 0xffffff });
        var material = new $thr.MeshPhongMaterial();
        material.map = $thr.ImageUtils.loadTexture('img/earthmap.jpg');
        var sphere = new $thr.Mesh(geometry, material);
        scene.add(sphere);

        camera.position.z = 10;

    }

    function render() {
        $RAF(render);

        //$app.cube.rotation.x += 0.03;
        //$app.cube.rotation.y += 0.03;
        //$app.cube.rotation.z += 0.03;

        //$app.ring.rotation.x += 0.05;
        //$app.ring.rotation.y += 0.05;
        //$app.ring.rotation.z += 0.05;

        //$app.cylinder.rotation.x += 0.05;

        ////$app.sphere.rotation.x += 0.05;

        //$app.torus.rotation.x += 0.05;


        renderer.render(scene, camera);
    }

    init();
    render();

    $(window).resize(function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    $app.onwheel(window, function (delta) {
        var z = delta > 0 ? 0.3 : -0.3;

        camera.position.z += z;
    });

    $(window).on('keydown', function (event) {
        var key = event.which;
        var keycodes = [37, 38, 39, 40];

        if (keycodes.indexOf(key) == -1)
            return;

        var y = (key == 40) ? 0.1 : (key == 38) ? -0.1 : 0;
        var x = (key == 37) ? 0.1 : (key == 39) ? -0.1 : 0;

        camera.position.y += y;
        camera.position.x += x;

        event.preventDefault();

    });


})(window.App, THREE, document, requestAnimationFrame);

