(function () {
    'use strict';

    var controllerId = 'sessions';

    angular.module('app').controller(controllerId,
        ['common', sessions]);

    function sessions(common) {

        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        vm.activate = activate;
        vm.sessions = [];
        vm.title = 'Sessions';

        activate();

        function activate() {
            common.activateController([getSessions()], controllerId)
                .then(function () { log('Activated Session View'); });
        }

        function getSessions() {

        }
    }
})();