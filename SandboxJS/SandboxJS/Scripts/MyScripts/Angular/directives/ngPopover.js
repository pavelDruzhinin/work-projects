(function (ng) {
    'use strict';


    ng.module('popover', [])
        .directive('ngPopover', function () {
            return {
                restrict: 'A',
                replace: false,
                transclude: false,

            };
        });

})(angular);