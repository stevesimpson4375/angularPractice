(function () {
    'use strict';

    angular
        .module('app')
        .controller('sessions', sessions);

    sessions.$inject = ['common']; 

    function sessions(common) {
        /* jshint validthis:true */
        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        vm.sessions = [];
        vm.title = 'sessions';

        activate();

        function activate() { }
        //TODO: get our seesions
        function activate() {
            common.activateController([getSessions()], controllerId)
                .then(function () { log('Activated Session View'); });
        }

        function getSessions() {

        }
    }
})();
