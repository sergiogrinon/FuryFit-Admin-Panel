(function () {
    'use strict';

    angular
        .module('furyfitadm')
        .factory('furyFitFaqsService', furyFitFaqsService);

        furyFitFaqsService.$inject = ['$q', 'furyFitFaqsProxy'];

    function furyFitFaqsService($q, furyFitFaqsProxy) {
        var defer;

        return {
            getFAQs: getFAQs,
            deleteFAQ: deleteFAQ,
            createFAQ: createFAQ,
            updateFAQ: updateFAQ
        };

        function getFAQs() {
            defer = $q.defer();

            furyFitFaqsProxy.getFAQSFromProxy().then(paintFaqs, sendErrorBck);

            return defer.promise;

            function paintFaqs(data) {
                defer.resolve(data);
            }

            function sendErrorBck(error) {
                defer.reject(error);
            }
        }

        /**
         * 
         * @param {int} deletionID 
         */
        function deleteFAQ(deletionID) {
            defer = $q.defer();

            furyFitFaqsProxy.deleteFAQFromProxy(deletionID).then(paintResp, sendErrorBack);

            return defer.promise;

            function paintResp(data) {
                defer.resolve(data);
            }

            function sendErrorBack(error) {
                defer.reject(error);
            }
        }

        /**
         * 
         * @param {int} nwId 
         * @param {String} nwQuestion //Question title
         * @param {String} nwAnswer 
         */
        function createFAQ(nwId, nwQuestion, nwAnswer) {
            defer = $q.defer();

            furyFitFaqsProxy.createFAQFromProxy(nwId, nwQuestion, nwAnswer).then(paintRespn, sendError);

            return defer.promise;

            function paintRespn(data) {
                defer.resolve(data);
            }

            function sendError(error) {
                defer.reject(error);
            }
        }

        /**
         * 
         * @param {int} iid 
         * @param {String} quest 
         * @param {String} answ 
         */
        function updateFAQ(iid, quest, answ) {
            defer = $q.defer();

            furyFitFaqsProxy.updateFAQFromProxy(iid, quest, answ).then(sendResp, sendErr);

            return defer.promise;

            function sendResp(data) {
                defer.resolve(data);
            }

            function sendErr(error) {
                defer.reject(error);
            }
        }
    }
})();