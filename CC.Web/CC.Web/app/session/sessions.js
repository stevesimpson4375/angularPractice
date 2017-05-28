(function () {
    'use strict';

    var controllerId = 'sessions';

    angular.module('app').controller(controllerId,
        ['common', 'datacontext', sessions]);

    function sessions(common, datacontext) {

        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        vm.refresh = refresh;
        vm.sessions = [];
        vm.title = 'Sessions';

        activate();

        function activate() {
            common.activateController([getSessions()], controllerId)
                .then(function () { log('Activated Session View'); });
        }

        function getSessions(forceRefresh) {
            return datacontext.getSessionPartials(forceRefresh)
                .then(function (data) {
                    return vm.sessions = data;
                });
        }

        function refresh() {
            getSessions(true);
        }
    }
})();