'use strict';

angular.module('admin', ['admin.services', 'admin.filters', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/list', { template: 'Views/Admin/Partial/list.html', controller: ListCtrl })
            .when('/new', { template: 'Views/Admin/Partial/edit.html', controller: NewCtrl })
            .when('/edit/:id', { template: 'Views/Admin/Partial/edit.html' })
            .otherwise({ redirectTo: '/list' });
    }
]);
