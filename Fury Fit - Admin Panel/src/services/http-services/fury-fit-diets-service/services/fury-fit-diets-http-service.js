(function () {
    'use strict';

    angular
        .module('furyfitadm')
        .factory('furyFitDietService', furyFitDietService);

    furyFitDietService.$inject = ['$q', 'furyFitDietProxy'];

    function furyFitDietService($q, furyFitDietProxy) {
        var defer;

        return {
            getDiets: getDiets,
            deleteDiet: deleteDiet,
            createDiet: createDiet,
            updateDiet: updateDiet
        };

        function getDiets() {
            defer = $q.defer();

            furyFitDietProxy.getDietsFromProxy().then(paintDiets, sendBackError);

            return defer.promise;

            function paintDiets(data) {
                defer.resolve(data);
            }

            function sendBackError(error) {
                defer.reject(error);
            }
        }

        /**
         * 
         * @param {int} idToDelete 
         */
        function deleteDiet(idToDelete) {
            defer = $q.defer();

            furyFitDietProxy.deleteDietFromProxy(idToDelete).then(paintResponse, sendBckError);

            return defer.promise;

            function paintResponse(data) {
                defer.resolve(data);
            }

            function sendBckError(error) {
                defer.reject(error);
            }
        }

        /**
         * 
         * @param {int} nwId 
         * @param {String} nwName 
         * @param {String} nwType 
         * @param {String} nwDesc 
         */
        function createDiet(nwId, nwName, nwType, nwDesc) {
            defer = $q.defer();

            furyFitDietProxy.createDietFromProxy(nwId, nwName, nwType, nwDesc).then(sendResp, sendErrBck);

            return defer.promise;

            function sendResp(data) {
                defer.resolve(data);
            }

            function sendErrBck(error) {
                defer.reject(error);
            }
        }

        /**
         * 
         * @param {int} idd 
         * @param {String} name 
         * @param {String} type 
         * @param {String} desc 
         */
        function updateDiet(idd, name, type, desc) {
            defer = $q.defer();

            furyFitDietProxy.updateDietFromProxy(idd, name, type, desc).then(sendRsp, sendErrBack);

            return defer.promise;

            function sendRsp(data) {
                defer.resolve(data);
            }

            function sendErrBack(error) {
                defer.reject(error);
            }
        }
    }
})();