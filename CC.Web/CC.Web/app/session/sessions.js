(function () {
    'use strict';

    var controllerId = 'sessions';

    angular.module('app').controller(controllerId,
        ['$routeParams', 'common', 'config', 'datacontext', sessions]);

    function sessions($routeParams, common, config, datacontext) {

        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var keyCodes = config.keyCodes;

        var applyFilter = function () { };

        vm.filteredSessions = [];
        vm.search = search;
        vm.sessionsSearch = $routeParams.search || '';
        vm.sessionsFilter = sessionsFilter;
        vm.refresh = refresh;
        vm.sessions = [];
        vm.title = 'Sessions';

        activate();

        function activate() {
            common.activateController([getSessions()], controllerId)
                .then(function () {
                    // createSearchThrottle uses values by convention, via its parameter:
                    //      vm.sessionsSearch is where the user enters the search
                    //      vm.sessions is the original unfiltered array
                    //      vm.filteredSessins is the filtered array
                    //      vm.sessionsFilter is the filtering function8

                    applyFilter = common.createSearchThrottle(vm, 'sessions')
                    if (vm.sessionsSearch) { applyFilter(true); }
                    log('Activated Session View');
                });
        }

        function getSessions(forceRefresh) {
            return datacontext.getSessionPartials(forceRefresh)
                .then(function (data) {
                    return vm.sessions = vm.filteredSessions = data;
                });
        }

        function refresh() {
            getSessions(true);
        }

        function search($event) {
            if ($event.keyCode === keyCodes.esc) {
                vm.sessionsSearch = '';
                applyFilter(true);
            } else {
                applyFilter();
            }           
        }

        function sessionsFilter(session) {
            var textContains = common.textContains;
            var searchText = vm.sessionsSearch;
            var isMatch = searchText ?
                textContains(session.title, searchText)
                || textContains(session.tagsFormatted, searchText)
                || textContains(session.room.name, searchText)
                || textContains(session.track.name, searchText)
                || textContains(session.speaker.fullName, searchText)
                : true;
            return isMatch;
        }
    }
})();