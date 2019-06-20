(function() {
    'use strict';

    angular
        .module('furyfitadm')
        .component('mainContainer', {
            templateUrl: 'src/components/main-container/assets/ff-admin-app-template.html',
            controller: 'mainContainerController',
            controllerAs: 'appCtrl'
        });
})();