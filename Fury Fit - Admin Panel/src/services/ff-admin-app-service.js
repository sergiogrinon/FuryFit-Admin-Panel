(function () {
    'use strict';

    angular
        .module('furyfitadm')
        .service('furyFitAdminService', furyFitAdminService);

    furyFitAdminService.$inject = ['$q', 'furyFitDietService', 'furyFitWorkoutService', 'furyFitInterestLinksService', 'furyFitFaqsService'];

    function furyFitAdminService($q, furyFitDietService, furyFitWorkoutService, furyFitInterestLinksService, furyFitFaqsService) {
        var self = this;
        var promise;
        var service = {
            deleteDietFromDatabase: deleteDietFromDatabase,
            deleteWorkoutFromDatabase: deleteWorkoutFromDatabase,
            deleteLinkFromDatabase: deleteLinkFromDatabase,
            deleteQuestionFromDatabase: deleteQuestionFromDatabase,
            addDietToDatabase: addDietToDatabase,
            addWorkoutToDatabase: addWorkoutToDatabase,
            addLinkToDatabase: addLinkToDatabase,
            addQuestionToDatabase: addQuestionToDatabase,
            modifyDietFromDatabase: modifyDietFromDatabase,
            modifyWorkoutFromDatabase: modifyWorkoutFromDatabase,
            modifyLinkFromDatabase: modifyLinkFromDatabase,
            modifyQuestionFromDatabase: modifyQuestionFromDatabase,
            getDietsFromDatabase: getDietsFromDatabase,
            getWorkoutsFromDatabase: getWorkoutsFromDatabase,
            getLinksFromDatabase: getLinksFromDatabase,
            getFAQsFromDatabase: getFAQsFromDatabase
        };

        self.defer;

        return service;

        function getDietsFromDatabase() {
            self.defer = self.defer || $q.defer();
            promise = self.defer.promise;

            furyFitDietService.getDiets().then(sendDietsToCtrl, sendErrorToCtrl);

            function sendDietsToCtrl(response) {
                self.defer.resolve(response);
                self.defer = null;
            }

            function sendErrorToCtrl(error) {
                self.defer.reject(error);
                self.defer = null;
            }

            return promise;
        }

        function getWorkoutsFromDatabase() {
            self.defer = self.defer || $q.defer();
            promise = self.defer.promise;

            furyFitWorkoutService.getWorkouts().then(sendWorkoutsToCtrl, sendError);

            function sendWorkoutsToCtrl(response) { //OK
                self.defer.resolve(response);
                self.defer = null;
            }

            function sendError(error) { //KO
                self.defer.reject(error);
                self.defer = null;
            }

            return promise;
        }

        function getLinksFromDatabase() {
            self.defer = self.defer || $q.defer();
            promise = self.defer.promise;

            furyFitInterestLinksService.getInterestingLinks().then(sendLinksToCtrl, sendError);

            function sendLinksToCtrl(response) { //OK
                self.defer.resolve(response);
                self.defer = null;
            }

            function sendError(error) { //KO
                self.defer.reject(error);
                self.defer = null;
            }

            return promise;
        }

        function getFAQsFromDatabase() {
            self.defer = self.defer || $q.defer();
            promise = self.defer.promise;

            furyFitFaqsService.getFAQs().then(sendFAQsToCtrl, sendErrortoMyCtrl);

            function sendFAQsToCtrl(response) { //OK
                self.defer.resolve(response);
                self.defer = null;
            }

            function sendErrortoMyCtrl(error) { //KO
                self.defer.reject(error);
                self.defer = null;
            }

            return promise;
        }

        /**
         * 
         * @param {int} deleteID 
         */
        function deleteDietFromDatabase(deleteID) {
            self.defer = self.defer || $q.defer();
            promise = self.defer.promise;

            furyFitDietService.deleteDiet(deleteID).then(sendOkDietDelete, sendKoDietDelete);

            function sendOkDietDelete(response) { //OK
                self.defer.resolve(response);
                self.defer = null;
            }

            function sendKoDietDelete(error) { //KO
                self.defer.reject(error);
                self.defer = null;
            }

            return promise;
        }

        /**
         * 
         * @param {int} wdeleteID 
         */
        function deleteWorkoutFromDatabase(wdeleteID) {
            self.defer = self.defer || $q.defer();
            promise = self.defer.promise;

            furyFitWorkoutService.deleteWorkout(wdeleteID).then(sendOkWorkoutDelete, sendKoWorkoutDelete);

            function sendOkWorkoutDelete(response) { //OK
                self.defer.resolve(response);
                self.defer = null;
            }

            function sendKoWorkoutDelete(error) { //KO
                self.defer.reject(error);
                self.defer = null;
            }

            return promise;
        }

        /**
         * 
         * @param {int} ldeleteID 
         */
        function deleteLinkFromDatabase(ldeleteID) {
            self.defer = self.defer || $q.defer();
            promise = self.defer.promise;

            furyFitInterestLinksService.deleteInterestingLinks(ldeleteID).then(sendOkLinksDelete, sendKoLinksDelete);

            function sendOkLinksDelete(response) { //OK
                self.defer.resolve(response);
                self.defer = null;
            }

            function sendKoLinksDelete(error) { //KO
                self.defer.reject(error);
                self.defer = null;
            }

            return promise;
        }

        /**
         * 
         * @param {id} faqdeleteID 
         */
        function deleteQuestionFromDatabase(faqdeleteID) {
            self.defer = self.defer || $q.defer();
            promise = self.defer.promise;

            furyFitFaqsService.deleteFAQ(faqdeleteID).then(sendOkFaqDelete, sendKoFaqDelete);

            function sendOkFaqDelete(response) { //OK
                self.defer.resolve(response);
                self.defer = null;
            }

            function sendKoFaqDelete(error) { //KO
                self.defer.reject(error);
                self.defer = null;
            }

            return promise;
        }

        /**
         * 
         * @param {int} dietID 
         * @param {String} dietName 
         * @param {String} dietType 
         * @param {String} dietDescription 
         */
        function addDietToDatabase(dietID, dietName, dietType, dietDescription) {
            self.defer = self.defer || $q.defer();
            promise = self.defer.promise;

            furyFitDietService.createDiet(dietID, dietName, dietType, dietDescription).then(sendOkDietCreation, sendKoDietCreation);

            function sendOkDietCreation(response) { //OK
                self.defer.resolve(response);
                self.defer = null;
            }

            function sendKoDietCreation(error) { //KO
                self.defer.reject(error);
                self.defer = null;
            }

            return promise;
        }

        /**
         * 
         * @param {int} workoutId 
         * @param {String} workoutName 
         * @param {String} workoutType 
         * @param {String} workoutDescription 
         */
        function addWorkoutToDatabase(workoutId, workoutName, workoutType, workoutDescription) {
            self.defer = self.defer || $q.defer();
            promise = self.defer.promise;

            furyFitWorkoutService.createWorkout(workoutId, workoutName, workoutType, workoutDescription).then(sendOkWorkoutCreate, sendKoWorkoutCreate);

            function sendOkWorkoutCreate(response) { //OK
                self.defer.resolve(response);
                self.defer = null;
            }

            function sendKoWorkoutCreate(error) { //KO
                self.defer.reject(error);
                self.defer = null;
            }

            return promise;
        }

        /**
         * 
         * @param {int} linkId 
         * @param {String} linkUrl 
         * @param {String} linkImgSrc 
         */
        function addLinkToDatabase(linkId, linkUrl, linkImgSrc) {
            self.defer = self.defer || $q.defer();
            promise = self.defer.promise;

            furyFitInterestLinksService.createLink(linkId, linkUrl, linkImgSrc).then(sendOkLinksCreation, sendKoLinksCreation);

            function sendOkLinksCreation(response) { //OK
                self.defer.resolve(response);
                self.defer = null;
            }

            function sendKoLinksCreation(error) { //KO
                self.defer.reject(error);
                self.defer = null;
            }

            return promise;
        }

        /**
         * 
         * @param {int} faqId 
         * @param {String} faqQuestion 
         * @param {String} faqAnswer 
         */
        function addQuestionToDatabase(faqId, faqQuestion, faqAnswer) {
            self.defer = self.defer || $q.defer();
            promise = self.defer.promise;

            furyFitFaqsService.createFAQ(faqId, faqQuestion, faqAnswer).then(sendOkFaqCreation, sendKoFaqCreation);

            function sendOkFaqCreation(response) { //OK
                self.defer.resolve(response);
                self.defer = null;
            }

            function sendKoFaqCreation(error) { //KO
                self.defer.reject(error);
                self.defer = null;
            }

            return promise;
        }

        /**
         * 
         * @param {id} newDietID 
         * @param {String} newDietName 
         * @param {String} newDietType 
         * @param {String} newDietDescription 
         */
        function modifyDietFromDatabase(newDietID, newDietName, newDietType, newDietDescription) {
            self.defer = self.defer || $q.defer();
            promise = self.defer.promise;

            furyFitDietService.updateDiet(newDietID, newDietName, newDietType, newDietDescription).then(sendOkDietUpdate, sendKoDietUpdate);

            function sendOkDietUpdate(response) { //OK
                self.defer.resolve(response);
                self.defer = null;
            }

            function sendKoDietUpdate(error) { //KO
                self.defer.reject(error);
                self.defer = null;
            }

            return promise;
        }

        /**
         * 
         * @param {int} newWorkoutId 
         * @param {String} newWorkoutName 
         * @param {String} newWorkoutType 
         * @param {String} newWorkoutDescription 
         */
        function modifyWorkoutFromDatabase(newWorkoutId, newWorkoutName, newWorkoutType, newWorkoutDescription) {
            self.defer = self.defer || $q.defer();
            promise = self.defer.promise;

            furyFitWorkoutService.updateWorkout(newWorkoutId, newWorkoutName, newWorkoutType, newWorkoutDescription).then(sendOkWorkoutUpdate, sendKoWorkoutUpdate);

            function sendOkWorkoutUpdate(response) { //OK
                self.defer.resolve(response);
                self.defer = null;
            }

            function sendKoWorkoutUpdate(error) { //KO
                self.defer.reject(error);
                self.defer = null;
            }

            return promise;
        }

        /**
         * 
         * @param {int} newLinkId 
         * @param {String} newLinkUrl 
         * @param {String} newLinkImgSrc 
         */
        function modifyLinkFromDatabase(newLinkId, newLinkUrl, newLinkImgSrc) {
            self.defer = self.defer || $q.defer();
            promise = self.defer.promise;

            furyFitInterestLinksService.updateLink(newLinkId, newLinkUrl, newLinkImgSrc).then(sendOkLinkUpdate, sendKoLinksUpdate);

            function sendOkLinkUpdate(response) { //OK
                self.defer.resolve(response);
                self.defer = null;
            }

            function sendKoLinksUpdate(error) { //KO
                self.defer.reject(error);
                self.defer = null;
            }

            return promise;
        }

        /**
         * 
         * @param {int} newFaqId 
         * @param {String} newFaqQuestion 
         * @param {String} newFaqAnswer 
         */
        function modifyQuestionFromDatabase(newFaqId, newFaqQuestion, newFaqAnswer) {
            self.defer = self.defer || $q.defer();
            promise = self.defer.promise;

            furyFitFaqsService.updateFAQ(newFaqId, newFaqQuestion, newFaqAnswer).then(sendOkFaqUpdate, sendKoFaqUpdate);

            function sendOkFaqUpdate(response) { //OK
                self.defer.resolve(response);
                self.defer = null;
            }

            function sendKoFaqUpdate(error) { //KO
                self.defer.reject(error);
                self.defer = null;
            }

            return promise;
        }
    }
})();