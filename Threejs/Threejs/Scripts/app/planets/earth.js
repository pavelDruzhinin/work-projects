(function ($p, $thr) {

    //#region Earth
    function createEarth() {
        var geometry = new $thr.SphereGeometry(5, 32, 32);
        var material = new $thr.MeshPhongMaterial({ color: 0xffffff });
        material.map = $thr.ImageUtils.loadTexture('img/earthmap.jpg');

        material.bumpMap = $thr.ImageUtils.loadTexture('img/earthbump.jpg');
        material.bumpScale = 0.05;

        material.specularMap = $thr.ImageUtils.loadTexture('img/earthspec.jpg');
        material.specular = new $thr.Color('grey');

        return new $thr.Mesh(geometry, material);
    }
    //#endregion

    //#region Cloud
    function createCloud() {
        // create destination canvas
        var canvasResult = document.createElement('canvas');
        canvasResult.width = 1024;
        canvasResult.height = 512;
        var contextResult = canvasResult.getContext('2d');

        // load earthcloudmap
        var imageMap = new Image();
        imageMap.addEventListener("load", function () {

            // create dataMap ImageData for earthcloudmap
            var canvasMap = document.createElement('canvas');
            canvasMap.width = imageMap.width;
            canvasMap.height = imageMap.height;
            var contextMap = canvasMap.getContext('2d');
            contextMap.drawImage(imageMap, 0, 0);
            var dataMap = contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height);

            // load earthcloudmaptrans
            var imageTrans = new Image();
            imageTrans.addEventListener("load", function () {
                // create dataTrans ImageData for earthcloudmaptrans
                var canvasTrans = document.createElement('canvas');
                canvasTrans.width = imageTrans.width;
                canvasTrans.height = imageTrans.height;
                var contextTrans = canvasTrans.getContext('2d');
                contextTrans.drawImage(imageTrans, 0, 0);
                var dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height);
                // merge dataMap + dataTrans into dataResult
                var dataResult = contextMap.createImageData(canvasMap.width, canvasMap.height);
                for (var y = 0, offset = 0; y < imageMap.height; y++) {
                    for (var x = 0; x < imageMap.width; x++, offset += 4) {
                        dataResult.data[offset + 0] = dataMap.data[offset + 0];
                        dataResult.data[offset + 1] = dataMap.data[offset + 1];
                        dataResult.data[offset + 2] = dataMap.data[offset + 2];
                        dataResult.data[offset + 3] = 255 - dataTrans.data[offset + 0];
                    }
                }
                // update texture with result
                contextResult.putImageData(dataResult, 0, 0);
                material.map.needsUpdate = true;
            });
            imageTrans.src = 'img/earthcloudmaptrans.jpg';
        }, false);

        imageMap.src = 'img/earthcloudmap.jpg';

        var geometry = new THREE.SphereGeometry(5.1, 32, 32);

        var material = new $thr.MeshPhongMaterial({
            map: new $thr.Texture(canvasResult),
            side: $thr.DoubleSide,
            opacity: 0.8,
            transparent: true,
            depthWrite: false,
        });

        return new $thr.Mesh(geometry, material);
    }
    //#endregion

    $p.createEarth = function () {
        return {
            self: createEarth(), cloud: createCloud(),
            position: function () {
                return this.self.position;
            },
            rotate: function (x, y) {
                this.self.rotation.y += y;
                this.cloud.rotation.y += y;

                this.self.rotation.x += x;
                this.cloud.rotation.x += x;
            },
            rotateCenter: function (x0, y0, angle) {
                var earth = this.self;
                var cloud = this.cloud;
                var position = Math.rotateCenter(x0, y0, earth.position.x, earth.position.z, angle);

                earth.position.x = cloud.position.x = position.x;
                earth.position.z = cloud.position.z = position.y;
            }
        };
    }

})(window.$planets, THREE);