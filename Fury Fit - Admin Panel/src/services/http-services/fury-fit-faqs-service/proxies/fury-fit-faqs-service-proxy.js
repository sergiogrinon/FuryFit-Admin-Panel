(function () {
    'use strict';

    angular
        .module('furyfitadm')
        .factory('furyFitFaqsProxy', furyFitFaqsProxy);

        furyFitFaqsProxy.$inject = ['$q', '$http'];

    function furyFitFaqsProxy($q, $http) {
        var myserviceURL = 'http://localhost:8080/api/furyfitproject/faqs';
        var deleteFaqURL = 'http://localhost:8080/api/furyfitproject/faqs/deletefaq/'; // +id
        var createFaqURL = 'http://localhost:8080/api/furyfitproject/faqs/createfaq/'; // +id, +question, +answer
        var updateFaqURL = 'http://localhost:8080/api/furyfitproject/faqs/updatefaq/'; // +id, +question, +answer

        return {
            getFAQSFromProxy: getFAQSFromProxy,
            deleteFAQFromProxy: deleteFAQFromProxy,
            createFAQFromProxy: createFAQFromProxy,
            updateFAQFromProxy: updateFAQFromProxy
        };

        function getFAQSFromProxy() {
            return $http.get(myserviceURL).then(sendFaqsRecieved, sendErrorToService);

            function sendFaqsRecieved(response) { //OK
                return response.data;
            }

            function sendErrorToService(error) { //KO
                return $q.reject(error);
            }
        }

        /**
         * 
         * @param {int} selectedId 
         */
        function deleteFAQFromProxy(selectedId) {
            var finalDeletionURL = deleteFaqURL + selectedId;
            return $http.delete(finalDeletionURL).then(sendInfoToService, sendError);

            function sendInfoToService(response) { //OK
                return response.data;
            }

            function sendError(error) { //KO
                return $q.reject(error);
            }
        }

        /**
         * 
         * @param {int} newID 
         * @param {String} newQuestion 
         * @param {String} newAnswer 
         */
        function createFAQFromProxy(newID, newQuestion, newAnswer) {
            var creationURL = createFaqURL + newID + '/' + newQuestion + '/' + newAnswer;
            return $http.post(creationURL).then(sendRespo, sendErr);

            function sendRespo(response) { //OK
                return response.data;
            }

            function sendErr(error) { //KO
                return $q.reject(error);
            }
        }

        /**
         * 
         * @param {int} nwID 
         * @param {String} nwQuestion 
         * @param {String} nwAnswer 
         */
        function updateFAQFromProxy(nwID, nwQuestion, nwAnswer) {
            var updateURL = updateFaqURL + nwID + '/' + nwQuestion + '/' + nwAnswer;
            return $http.put(updateURL).then(sendResp, sendEr);

            function sendResp(response) { //OK
                return response.data;
            }

            function sendEr(error) { //KO
                return $q.reject(error);
            }
        }
    }
})();