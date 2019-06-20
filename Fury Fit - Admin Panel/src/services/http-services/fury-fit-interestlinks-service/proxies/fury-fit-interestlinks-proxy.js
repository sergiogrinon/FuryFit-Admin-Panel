(function () {
    'use strict';

    angular
        .module('furyfitadm')
        .factory('furyFitInterestLinksProxy', furyFitInterestLinksProxy);

    furyFitInterestLinksProxy.$inject = ['$q', '$http'];

    function furyFitInterestLinksProxy($q, $http) {
        var myserviceURL = 'http://localhost:8080/api/furyfitproject/interestlinks';
        var deleteLinkURL = 'http://localhost:8080/api/furyfitproject/interestlinks/deleteintlink/'; // +id
        var createLinkURL = 'http://localhost:8080/api/furyfitproject/interestlinks/createlink/'; // +id, +link, +image
        var updateLinkURL = 'http://localhost:8080/api/furyfitproject/interestlinks/updatelink/'; // +id, +link, +image

        return {
            getLinksFromProxy: getLinksFromProxy,
            deleteLinkFromProxy: deleteLinkFromProxy,
            createLinkFromProxy: createLinkFromProxy,
            updateLinkFromProxy: updateLinkFromProxy
        };

        function getLinksFromProxy() {
            return $http.get(myserviceURL).then(sendLinksRecieved, sendErrorToService);

            function sendLinksRecieved(response) { //OK
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
        function deleteLinkFromProxy(selectedId) {
            var finalDeletionURL = deleteLinkURL + selectedId;
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
         * @param {String} newLink 
         * @param {String} newImage 
         */
        function createLinkFromProxy(newID, newLink, newImage) {
            var creationURL = createLinkURL + newID + '/' + newLink + '/' + newImage;
            var correctURL =
            {
                "urlToCreate": creationURL
            };
            //Possible to modify the API to make it consume JSON and use the URL trying not to fail
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
         * @param {String} nwLink 
         * @param {String} nwImage 
         */
        function updateLinkFromProxy(nwID, nwLink, nwImage) {
            var updateURL = updateLinkURL + nwID + '/' + nwLink + '/' + nwImage;
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