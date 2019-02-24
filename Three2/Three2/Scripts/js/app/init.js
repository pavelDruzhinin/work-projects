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

        //planets
        $app.lightposition = { x: 5, y: 5, z: 5 };
        $app.sun = $p.createSun();

        $app.sun.position.x = $app.lightposition.x + 30;
        $app.sun.position.y = $app.lightposition.y + 30;
        $app.sun.position.z = $app.lightposition.z + 30;
        scene.add($app.sun);

        $app.earth = $p.createEarth();
        scene.add($app.earth.self);
        scene.add($app.earth.cloud);

        $app.moon = $p.createMoon();
        $app.moon.self.position.x = 10;

        scene.add($app.moon.self);

        $app.deathstar = $p.createDeathStar();
        $app.deathstar.position.x = 30;

        scene.add($app.deathstar);

        //starfield
        $app.starfield = $p.createStarfield();
        scene.add($app.starfield);

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
//        playImperial();
    }

    //#endregion

    //#region Render
    function render() {
        $RAF(render);

        $app.deathstar.rotation.y += 0.001;


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

    function playImperial() {
        var audio = document.createElement('audio');
        var source = document.createElement('source');
        source.src = '/media/imperial.mp3';
        audio.appendChild(source);
        audio.play();
    }

    //#endregion


})(window.App, THREE, document, requestAnimationFrame, window.$planets);

