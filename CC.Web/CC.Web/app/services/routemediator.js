(function () {
    'use strict';

    var serviceId = 'routemediator';

    angular.module('app')
        .factory(serviceId,
            ['$rootScope', 'config', routemediator]);

    function routemediator($rootScope, config) {
        var service = {
            updateDocTitle: updateDocTitle
        };

        return service;

        function updateDocTitle() {

            $rootScope.$on('$routeChangeSuccess',
                function (event, current, previous) {
                    var title = config.docTitle + ' ' + (current.title || '');
                    $rootScope.title = title;
                });
        }
    }
})();