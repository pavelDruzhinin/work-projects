'use strict';

(function () {
    requirejs.config({
        baseUrl: '/Scripts/',
        paths: {
            'MyMath': ['MyScripts/Require/MyMath']
        },
        waitSeconds: 0
    });

    require(['MyMath'], function (MyMath) {

        console.log(MyMath.add(1, 2));

    });


})();

