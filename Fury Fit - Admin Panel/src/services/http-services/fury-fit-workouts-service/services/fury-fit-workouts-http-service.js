(function () {
    'use strict';

    angular
        .module('furyfitadm')
        .factory('furyFitWorkoutService', furyFitWorkoutService);

        furyFitWorkoutService.$inject = ['$q', 'furyFitWorkoutProxy'];

    function furyFitWorkoutService($q, furyFitWorkoutProxy) {
        var defer;

        return {
            getWorkouts: getWorkouts,
            deleteWorkout: deleteWorkout,
            createWorkout: createWorkout,
            updateWorkout: updateWorkout
        };

        function getWorkouts() {
            defer = $q.defer();

            furyFitWorkoutProxy.getWorkoutsFromProxy().then(paintWorkouts, sendErrorBck);

            return defer.promise;

            function paintWorkouts(data) {
                defer.resolve(data);
            }

            function sendErrorBck(error) {
                defer.reject(error);
            }
        }

        /**
         * 
         * @param {int} idToDelete 
         */
        function deleteWorkout(idToDelete) {
            defer = $q.defer();

            furyFitWorkoutProxy.deleteWorkoutFromProxy(idToDelete).then(paintResponse, sendBckError);

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
        function createWorkout(nwId, nwName, nwType, nwDesc) {
            defer = $q.defer();

            furyFitWorkoutProxy.createWorkoutFromProxy(nwId, nwName, nwType, nwDesc).then(sendResp, sendErrBck);

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
        function updateWorkout(idd, name, type, desc) {
            defer = $q.defer();

            furyFitWorkoutProxy.updateWorkoutFromProxy(idd, name, type, desc).then(sendRsp, sendErrBack);

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