(function () {
    'use strict';

    var controllerId = 'speakers';

    angular
        .module('app').controller(controllerId,
        ['$scope', speakers]);

    function speakers($scope) {
        /* jshint validthis:true */
        var vm = this;

        vm.activate = active;
        var.speakers = [];
        vm.title = 'Speakers';

        function activate() { }
    }
})();
