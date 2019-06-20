(function () {
    'use strict';

    angular
        .module('furyfitadm')
        .factory('furyFitWorkoutProxy', furyFitWorkoutProxy);

    furyFitWorkoutProxy.$inject = ['$q', '$http'];

    function furyFitWorkoutProxy($q, $http) {
        var workoutsServiceURL = 'http://localhost:8080/api/furyfitproject/workouts';
        var deleteWorkoutURL = 'http://localhost:8080/api/furyfitproject/workouts/deleteworkout/'; // +id
        var creationURL = 'http://localhost:8080/api/furyfitproject/workouts/createworkout/'; // +id, +name, +type, +description
        var updateWorkoutURL = 'http://localhost:8080/api/furyfitproject/workouts/updateworkout/'; // +id, +name, +type, +description

        return {
            getWorkoutsFromProxy: getWorkoutsFromProxy,
            deleteWorkoutFromProxy: deleteWorkoutFromProxy,
            createWorkoutFromProxy: createWorkoutFromProxy,
            updateWorkoutFromProxy: updateWorkoutFromProxy
        };

        function getWorkoutsFromProxy() {
            return $http.get(workoutsServiceURL).then(sendWorkoutsToService, sendErrorInWToService);

            function sendWorkoutsToService(response) { //OK
                return response.data;
            }

            function sendErrorInWToService(error) { //KO
                return $q.reject(error);
            }
        }

        /**
         * 
         * @param {int} selectedId 
         */
        function deleteWorkoutFromProxy(selectedId) {
            var deletionURL = deleteWorkoutURL + selectedId;
            return $http.delete(deletionURL).then(sendInfoToService, sendError);

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
        function createWorkoutFromProxy(newID, newName, newType, newDescription) {
            var newWorkoutURL = creationURL + newID + '/' + newName + '/' + newType + '/' + newDescription;
            return $http.post(newWorkoutURL).then(sendRespo, sendErr);

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
        function updateWorkoutFromProxy(nwID, nwName, nwType, nwDescription) {
            var workoutUpdate = updateWorkoutURL + nwID + '/' + nwName + '/' + nwType + '/' + nwDescription;
            return $http.put(workoutUpdate).then(sendRespo, sendErr);

            function sendRespo(response) { //OK
                return response.data;
            }

            function sendErr(error) { //KO
                return $q.reject(error);
            }
        }
    }
})();