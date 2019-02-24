/**
 * Created by Pavel on 04.08.14.
 */

(function ($thr, $p) {

    $p.createDeathStar = function () {
        var geometry = new $thr.SphereGeometry(5, 32, 32);
        var material = new $thr.MeshPhongMaterial({ color: 0xffffff });
        material.map = $thr.ImageUtils.loadTexture('img/deathstarmap.jpg');

        return new $thr.Mesh(geometry, material);
    }

})(THREE, window.$planets);