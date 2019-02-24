(function ($p, $thr) {

    $p.createSun = function () {
        var geometry = new $thr.SphereGeometry(5, 48, 48);
        var material = new $thr.MeshPhongMaterial({ color: 0xffffff });
        material.map = $thr.ImageUtils.loadTexture('img/sunmap.png');

        return new $thr.Mesh(geometry, material);

    }

})(window.$planets, THREE);