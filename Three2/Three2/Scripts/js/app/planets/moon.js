(function ($p, $thr) {

    $p.createMoon = function () {
        return {
            self: createMoon(), position: function () {
                return this.self.position;
            },
            rotate: function (x, y) {
                this.self.rotation.y += y;

                this.self.rotation.x += x;
            },
            rotateCenter: function (x0, y0, angle) {
                var moon = this.self;
                var position = Math.rotateCenter(x0, y0, moon.position.x, moon.position.z, angle);

                moon.position.x = position.x;
                moon.position.z = position.y;
            }
        }
    }

    function createMoon() {
        var geometry = new $thr.SphereGeometry(1, 15, 15);
        var material = new $thr.MeshPhongMaterial({ color: 0xffffff });
        material.map = $thr.ImageUtils.loadTexture('img/moonmap.jpg');

        material.bumpMap = $thr.ImageUtils.loadTexture('img/moonbump.jpg');
        material.bumpScale = 0.05;

        return new $thr.Mesh(geometry, material);
    }

})(window.$planets, THREE);