(function ($p) {

    $p.createStarfield = function () {
        var texture = THREE.ImageUtils.loadTexture('img/galaxy_starfield.png');
        var material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        });

        var geometry = new THREE.SphereGeometry(100, 32, 32);
        return new THREE.Mesh(geometry, material);
    }

})(window.$planets);