(function () {
    'use strict';

    angular
        .module('furyfitadm')
        .factory('furyFitDietProxy', furyFitDietProxy);

    furyFitDietProxy.$inject = ['$q', '$http'];

    function furyFitDietProxy($q, $http) {
        var getDietsURL = 'http://localhost:8080/api/furyfitproject/diets';
        var deleteDietURL = 'http://localhost:8080/api/furyfitproject/diets/deletediet/'; //Have to add the ID to delete
        var createDietURL = 'http://localhost:8080/api/furyfitproject/diets/creatediet/'; // +id, +name, +type, +description
        var updateDietURL = 'http://localhost:8080/api/furyfitproject/diets/updatediet/'; // +id, +name, +type, +description

        var headers = {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Origin': '*'
        }

        return {
            getDietsFromProxy: getDietsFromProxy,
            deleteDietFromProxy: deleteDietFromProxy,
            createDietFromProxy: createDietFromProxy,
            updateDietFromProxy: updateDietFromProxy
        };

        function getDietsFromProxy() {
            return $http.get(getDietsURL).then(sendDietsToService, sendErrorToService);

            function sendDietsToService(response) { //OK
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
        function deleteDietFromProxy(selectedId) {
            var finalURL = deleteDietURL + selectedId;
            return $http.delete(finalURL).then(sendInfoToService, sendError);

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
         * @param {String} newName 
         * @param {String} newType 
         * @param {String} newDescription 
         */
        function createDietFromProxy(newID, newName, newType, newDescription) {
            var creationURL = createDietURL + newID + '/' + newName + '/' + newType + '/' + newDescription;
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
         * @param {id} nwID 
         * @param {String} nwName 
         * @param {String} nwType 
         * @param {String} nwDescription 
         */
        function updateDietFromProxy(nwID, nwName, nwType, nwDescription) {
            var updateURL = updateDietURL + nwID + '/' + nwName + '/' + nwType + '/' + nwDescription;
            return $http.put(updateURL, headers).then(sendResp, sendEr);

            function sendResp(response) { //OK
                return response.data;
            }

            function sendEr(error) { //KO
                return $q.reject(error);
            }
        }
    }
})();