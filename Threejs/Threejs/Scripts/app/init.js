(function ($app, $thr, $doc, $RAF, $p) {
    'use strict';

    var scene, camera, renderer;
    var controls;

    var raycaster;

    //#region Initialize
    function init() {
        scene = new $thr.Scene();
        camera = new $thr.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

        renderer = new $thr.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        $doc.body.appendChild(renderer.domElement);

        controls = new THREE.PointerLockControls(camera);
        scene.add(controls.getObject());

        raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);

        $app.earth = $p.createEarth();
        scene.add($app.earth.self);
        scene.add($app.earth.cloud);

        $app.starfield = $p.createStarfield();

        scene.add($app.starfield);

        $app.moon = $p.createMoon();
        $app.moon.self.position.x = 10;

        scene.add($app.moon.self);

        $app.lightposition = { x: 5, y: 5, z: 5 };
        $app.sun = $p.createSun();

        $app.sun.position.x = $app.lightposition.x + 30;
        $app.sun.position.y = $app.lightposition.y + 30;
        $app.sun.position.z = $app.lightposition.z + 30;

        scene.add($app.sun);

        var ambientLight = new $thr.AmbientLight(0x888888);
        scene.add(ambientLight);


        var light = new THREE.DirectionalLight(0xcccccc, 1);
        light.position.set($app.lightposition.x, $app.lightposition.y, $app.lightposition.z);
        scene.add(light);

        light.castShadow = true;
        light.shadowCameraNear = 0.01;
        light.shadowCameraFar = 15;
        light.shadowCameraFov = 45;

        light.shadowCameraLeft = -1;
        light.shadowCameraRight = 1;
        light.shadowCameraTop = 1;
        light.shadowCameraBottom = -1;

        light.shadowBias = 0.001;
        light.shadowDarkness = 0.2;

        light.shadowMapWidth = 1024 * 2;
        light.shadowMapHeight = 1024 * 2;

        camera.position.z = 60;
        controls.enabled = true;
    }
    //#endregion

    //#region Render
    function render() {
        $RAF(render);

        $app.earth.rotate(0, 0.001);

        var x = $app.earth.position().x;
        var y = $app.earth.position().z;

        $app.moon.rotate(0, 0.001);
        $app.moon.rotateCenter(x, y, 0.001);

        controls.isOnObject(false);

        raycaster.ray.origin.copy(controls.getObject().position);
        raycaster.ray.origin.y -= 10;

        var intersections = raycaster.intersectObjects([$app.starfield]);

        if (intersections.length > 0) {
            controls.isOnObject(true);
        }

        controls.update();

        //$app.earth.rotateCenter($app.lightposition.x, $app.lightposition.z, 0.001);

        renderer.render(scene, camera);
    }
    //#endregion

    init();
    render();

    //#region init events
    $(window).resize(function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    //$app.onwheel(window, function (delta) {
    //    var z = delta > 0 ? 0.3 : -0.3;

    //    camera.position.z += z;
    //});

    //$(window).on('keydown', function (event) {
    //    var key = event.which;
    //    var keycodes = [37, 38, 39, 40];

    //    if (keycodes.indexOf(key) == -1)
    //        return;

    //    var y = (key == 40) ? 0.1 : (key == 38) ? -0.1 : 0;
    //    var x = (key == 37) ? 0.1 : (key == 39) ? -0.1 : 0;

    //    camera.position.y += y;
    //    camera.position.x += x;

    //    event.preventDefault();

    //});

    //$(window).mouseover(function (event) {
    //    var x = event.clientX;
    //    var y = event.clientY;

    //    var w = this;

    //    var centerarea = {
    //        x1: (w.innerWidth / 3),
    //        x2: w.innerWidth - (w.innerWidth / 3),
    //        y1: (w.innerHeight / 3),
    //        y2: w.innerHeight - (w.innerHeight / 3)
    //    };

    //    var camerax = 0;
    //    var cameray = 0;

    //    if (x <= centerarea.x1)
    //        camerax = 0.001;

    //    if (x >= centerarea.x2)
    //        camerax = -0.001;

    //    if (y <= centerarea.y)
    //        cameray = 0.001;

    //    if (y >= centerarea.y)
    //        cameray = -0.001;

    //    camera.rotation.x += cameray;
    //    camera.rotation.y += camerax;

    //    console.log(w.innerWidth, w.innerHeight, x, y);
    //});

    //#endregion


})(window.App, THREE, document, requestAnimationFrame, window.$planets);

