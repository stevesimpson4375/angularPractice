(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', 'datacontext', dashboard]);

    function dashboard(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.attendeeCount = 0;
        vm.speakerCount = 0;
        vm.sessionCount = 0;

        vm.news = {
            title: 'Code Camper Angular',
            description: 'Code Camper Angular is a SPA template for Angular developers.'
        };
        vm.people = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getAttendeeCount(), getSessionCount(), getSpeakerCount(), getPeople()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }

        function getAttendeeCount() {
            return datacontext.getAttendeeCount().then(function (data) {
                return vm.attendeeCount = data;
            });
        }

        function getSessionCount() {
            return datacontext.getSessionCount().then(function (data) {
                return vm.sessionCount = data;
            });
        }

        function getSpeakerCount() {
            var speakers = datacontext.getSpeakersLocal();
            vm.speakerCount = speakers.length;
        }

        function getPeople() {
            return datacontext.getPeople().then(function (data) {
                return vm.people = data;
            });
        }
    }
})();