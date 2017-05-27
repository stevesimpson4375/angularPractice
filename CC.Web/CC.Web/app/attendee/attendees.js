(function () {
    'use strict';

    var controllerId = 'attendees';

    angular.module('app').controller(controllerId,
        ['common', 'datacontext', attendees]);

    function attendees(common, datacontext) {

        var vm = this;

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        vm.title = 'Attendees';
        va.attendees = [];

        activate();

        function activate() {
            common.activateController([getAttendees()], controllerId)
                .then(function () { log('Activated Attendeea View'); });
        }

        function getAttendees() {
            return datacontext.getAttendees().then(
                function (data) {
                    vm.attendees = data;
                    return data;
                }
            )
        }
    }
})();
