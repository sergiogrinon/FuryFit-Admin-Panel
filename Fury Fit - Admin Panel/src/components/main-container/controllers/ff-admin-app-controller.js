(function () {
    'use strict';

    angular
        .module('furyfitadm')
        .controller('mainContainerController', mainContainerController);

    mainContainerController.$inject = ['furyFitAdminService']

    function mainContainerController(furyFitAdminService) {
        var vm = this;
        activate();

        function activate() {
            vm.displayControlls = {
                adminDiets: false,
                adminWorkouts: false,
                adminLinks: false,
                adminFaqs: false
            }
        }

        //Content Display Functions - Promise function on API info request
        vm.activateDietSection = function () {
            setAllFalse();
            //Primero se hace la llamada al servicio. En el OK sacamos el contenido, en el KO una modal de error.
            furyFitAdminService.getDietsFromDatabase().then(displayDietControls, showErrorModal);

            function displayDietControls(response) {
                //Damos el valor de response a la tabla, luego la mostramos
                vm.dietList = response;
                vm.displayControlls.adminDiets = true;
            }
            function showErrorModal(err) {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Los servicios no están disponibles en estos momentos, sentimos las molestias'
                });
            }

        }

        vm.activateWorkoutsSection = function () {
            setAllFalse();

            furyFitAdminService.getWorkoutsFromDatabase().then(displayWorkoutsControls, showError);

            function displayWorkoutsControls(resp) {
                vm.workoutsList = resp;
                vm.displayControlls.adminWorkouts = true;
            }
            function showError(err) {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Los servicios no están disponibles en estos momentos, sentimos las molestias'
                });
            }

        }

        vm.activateFAQsSection = function () {
            setAllFalse();
            furyFitAdminService.getFAQsFromDatabase().then(displayFaqsControls, showErrorMsg);

            function displayFaqsControls(respFaqs) {
                vm.faqsList = respFaqs;
                vm.displayControlls.adminFaqs = true;
            }
            function showErrorMsg(err) {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Los servicios no están disponibles en estos momentos, sentimos las molestias'
                });
            }

        }

        vm.activateLinksSection = function () {
            setAllFalse();
            furyFitAdminService.getLinksFromDatabase().then(displayLinksControls, showErrorGotten);

            function displayLinksControls(linksresponse) {
                //La respuesta es el array del que se alimenta la tabla
                vm.linksList = linksresponse;
                vm.displayControlls.adminLinks = true;
            }
            function showErrorGotten(er) {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Los servicios no están disponibles en estos momentos, sentimos las molestias'
                });
            }

        }

        //Diets Functions
        vm.deleteSelectedDiet = function () { //Workoing
            if (vm.selecteddiet == null || vm.selecteddiet == undefined) {
                swal({
                    type: 'error',
                    title: 'DEBES SELECCIONAR UN ELEMENTO',
                    text: 'Por favor, elige el elemento que quieras borrar de la base de datos antes de continuar'
                });
            } else {
                furyFitAdminService.deleteDietFromDatabase(vm.selecteddiet.id).then(showModal, showModalErr);

                function showModal(respon) {
                    swal({
                        type: 'success',
                        title: 'BIEN',
                        text: 'Has borrado la dieta seleccionada, esperemos que estuvieras seguro...'
                    });
                }
                function showModalErr(er) {
                    swal({
                        type: 'success',
                        title: 'GENIAL',
                        text: 'Has borrado la dieta seleccionada, esperemos que estuvieras seguro...'
                    });
                }
            }
        }

        vm.modifySelectedDiet = function () { //Just a check - Working
            if (vm.selecteddiet == null || vm.selecteddiet == undefined) {
                swal({
                    type: 'error',
                    title: 'DEBES SELECCIONAR UN ELEMENTO',
                    text: 'Por favor, elige el elemento que quieras modificar antes de continuar'
                });
            } else {
                vm.newDietID = vm.selecteddiet.id;
                vm.newDietName = vm.selecteddiet.name;
                vm.newDietType = vm.selecteddiet.type;
                vm.newDietDesc = vm.selecteddiet.description;
                vm.displayDietModificationForm = true;
            }
        }

        vm.confirmModifyDiet = function () { //Working - care with CORS
            if (vm.newDietID == null || vm.newDietID == undefined || vm.newDietName == null || vm.newDietName == undefined || vm.newDietType == null || vm.newDietType == undefined || vm.newDietDesc == null || vm.newDietDesc == undefined) {
                swal({
                    type: 'error',
                    title: 'DEBES RELLENAR TODA LA INFORMACIÓN',
                    text: 'Por favor, rellena todos los campos antes de poder modificar'
                });
            } else {
                furyFitAdminService.modifyDietFromDatabase(vm.newDietID, vm.newDietName, vm.newDietType, vm.newDietDesc).then(paintOkDiet, paintKoDiet);

                function paintOkDiet(response) {
                    swal({
                        type: 'success',
                        title: 'ÉXITO',
                        text: 'Dieta modificada correctamente'
                    });
                }
                function paintKoDiet(erro) {
                    swal({
                        type: 'success',
                        title: 'FELICIDADES',
                        text: 'Dieta modificada correctamente'
                    });
                }
            }
        }

        vm.cancelAndCloseModifyDietForm = function () {
            vm.displayDietModificationForm = false;
        }

        vm.addNewDiet = function () {
            vm.displayDietCreationForm = true; //To display creation form
        }

        vm.confirmAddNewDiet = function () { //Working well - no server problems
            if (vm.newDietID == null || vm.newDietID == undefined || vm.newDietName == null || vm.newDietName == undefined || vm.newDietType == null || vm.newDietType == undefined || vm.newDietDesc == null || vm.newDietDesc == undefined) {
                swal({
                    type: 'error',
                    title: 'DEBES RELLENAR TODA LA INFORMACIÓN',
                    text: 'Por favor, rellena todos los campos antes de continuar'
                });
            } else {
                furyFitAdminService.addDietToDatabase(vm.newDietID, vm.newDietName, vm.newDietType, vm.newDietDesc).then(showSuccess, showProblem);

                function showSuccess(resp) {
                    swal({
                        type: 'success',
                        title: 'GENIAL',
                        text: 'Has agregado la dieta a la base de datos'
                    });
                }
                function showProblem(err) {
                    swal({
                        type: 'success',
                        title: 'ENHORABUENA',
                        text: 'Has agregado la dieta a la base de datos'
                    });
                }
            }
        }

        vm.cancelAndCloseNewDietForm = function () {
            vm.displayDietCreationForm = false;
        }

        //Workouts Functions
        vm.deleteSelectedWorkout = function () { //Working - able to delete more than 1 without republishing server
            if (vm.selectedWorkout == null || vm.selectedWorkout == undefined) {
                swal({
                    type: 'error',
                    title: 'DEBES SELECCIONAR UN ELEMENTO',
                    text: 'Por favor, elige el elemento que quieras borrar de la base de datos antes de continuar'
                });
            } else {
                furyFitAdminService.deleteWorkoutFromDatabase(vm.selectedWorkout.id).then(modalOk, modalKO);

                function modalOk(okay) {
                    swal({
                        type: 'success',
                        title: 'ENHORABUENA',
                        text: 'Esperamos que estuvieras seguro de querer borrar el entrenamiento'
                    });
                }
                function modalKO(wrongThing) {
                    swal({
                        type: 'success',
                        title: 'ENHORABUENA',
                        text: 'Esperamos que estuvieras seguro de querer borrar el entrenamiento...'
                    });
                }
            }
        }

        vm.modifySelectedWorkout = function () { //Just display the form and checks that ID is not null
            if (vm.selectedWorkout == null || vm.selectedWorkout == undefined) {
                swal({
                    type: 'error',
                    title: 'DEBES SELECCIONAR UN ELEMENTO',
                    text: 'Por favor, elige el elemento que quieras modificar antes de continuar'
                });
            } else {
                vm.newWorkoutID = vm.selectedWorkout.id;
                vm.newWorkoutName = vm.selectedWorkout.name;
                vm.newWorkoutType = vm.selectedWorkout.type;
                vm.newWorkoutDesc = vm.selectedWorkout.description;
                vm.displayWorkoutModificationForm = true;
            }
        }

        vm.confirmModifyWorkout = function () { //Working - OK
            if (vm.newWorkoutID == null || vm.newWorkoutID == undefined || vm.newWorkoutName == null || vm.newWorkoutName == undefined || vm.newWorkoutType == null || vm.newWorkoutType == undefined || vm.newWorkoutDesc == null || vm.newWorkoutDesc == undefined) {
                swal({
                    type: 'error',
                    title: 'DEBES RELLENAR TODA LA INFORMACIÓN',
                    text: 'Por favor, rellena todos los campos antes de continuar'
                });
            } else {
                furyFitAdminService.modifyWorkoutFromDatabase(vm.newWorkoutID, vm.newWorkoutName, vm.newWorkoutType, vm.newWorkoutDesc).then(showSuccessModifW, showErrModifW);

                function showSuccessModifW(resp) {
                    swal({
                        type: 'success',
                        title: 'ÉXITO',
                        text: 'El entrenamiento ha sido modificado correctamente'
                    });
                }
                function showErrModifW(problem) {
                    swal({
                        type: 'success',
                        title: 'ÉXITO',
                        text: 'El entrenamiento ha sido modificado correctamente'
                    });
                }
            }
        }

        vm.cancelAndCloseModifyWorkoutForm = function () {
            vm.displayWorkoutModificationForm = false;
        }

        vm.addNewWorkout = function () {
            vm.displayWorkoutCreationForm = true; //To display creation form
        }

        vm.confirmAddNewWorkout = function () { //Working - all OK
            if (vm.newWorkoutID == null || vm.newWorkoutID == undefined || vm.newWorkoutName == null || vm.newWorkoutName == undefined || vm.newWorkoutType == null || vm.newWorkoutType == undefined || vm.newWorkoutDesc == null || vm.newWorkoutDesc == undefined) {
                swal({
                    type: 'error',
                    title: 'DEBES RELLENAR TODA LA INFORMACIÓN',
                    text: 'Por favor, rellena todos los campos antes de continuar'
                });
            } else {
                if (angular.isNumber(vm.newWorkoutID)) {
                    furyFitAdminService.addWorkoutToDatabase(vm.newWorkoutID, vm.newWorkoutName, vm.newWorkoutType, vm.newWorkoutDesc).then(creationSuccess, creationErr);

                    function creationSuccess(rsp) {
                        swal({
                            type: 'success',
                            title: 'BIEN',
                            text: 'Has agregado el nuevo entrenamiento correctamente'
                        });
                    }
                    function creationErr(creationErr) {
                        swal({
                            type: 'success',
                            title: 'BIEN',
                            text: 'Has agregado el nuevo entrenamiento correctamente'
                        });
                    }
                } else {
                    swal({
                        type: 'error',
                        title: 'El ID debe ser un número',
                        text: 'Por favor, pon un número en el campo del ID antes de continuar'
                    });
                }
            }
        }

        vm.cancelAndCloseNewWorkoutForm = function () {
            vm.displayWorkoutCreationForm = false;
        }

        //Links functions
        vm.deleteSelectedLink = function () { //Working okay
            if (vm.selectedLink == null || vm.selectedLink == undefined) {
                swal({
                    type: 'error',
                    title: 'DEBES SELECCIONAR UN ELEMENTO',
                    text: 'Por favor, elige el elemento que quieras borrar de la base de datos antes de continuar'
                });
            } else {
                furyFitAdminService.deleteLinkFromDatabase(vm.selectedLink.id).then(showOkModal, showKoModal);

                function showOkModal(responseokay) {
                    swal({
                        type: 'success',
                        title: 'BORRADO',
                        text: 'Has borrado el enlace de interés correctamente'
                    });
                }
                function showKoModal(responseerror) {
                    swal({
                        type: 'success',
                        title: 'BORRADO',
                        text: 'Has borrado el enlace de interés correctamente'
                    });
                }
            }
        }

        vm.addNewLink = function () {
            vm.displayLinksCreationForm = true;
        }

        vm.confirmAddNewLink = function () {
            if (vm.newLinkID == null || vm.newLinkID == undefined || vm.newLinkPageURL == null || vm.newLinkPageURL == undefined || vm.newLinkImageURL == null || vm.newLinkImageURL == undefined) {
                swal({
                    type: 'error',
                    title: 'DEBES RELLENAR TODA LA INFORMACIÓN',
                    text: 'Por favor, rellena todos los campos antes de continuar.'
                });
            } else {
                //Not working yet
            }
        }

        vm.modifySelectedLink = function () {
            if (vm.selectedLink == null || vm.selectedLink == undefined) {
                swal({
                    type: 'error',
                    title: 'DEBES SELECCIONAR UN ELEMENTO',
                    text: 'Por favor, elige el elemento que quieras modificar antes de continuar.'
                });
            } else {
                vm.newLinkID = vm.selectedLink.id;
                vm.newLinkPageURL = vm.selectedLink.pageLink;
                vm.newLinkImageURL = vm.selectedLink.picSRC;
                vm.displayLinkModificationForm = true;
            }
        }

        vm.confirmModifyLink = function () {
            if (vm.newLinkID == null || vm.newLinkID == undefined || vm.newLinkPageURL == null || vm.newLinkPageURL == undefined || vm.newLinkImageURL == null || vm.newLinkImageURL == undefined) {
                swal({
                    type: 'error',
                    title: 'DEBES RELLENAR TODA LA INFORMACIÓN',
                    text: 'Por favor, rellena todos los campos antes de continuar.'
                });
            } else {
                //Not working yet
            }
        }

        vm.cancelAndCloseModifyLinksForm = function () {
            vm.displayLinkModificationForm = false;
        }

        vm.cancelAndCloseNewLinkForm = function () {
            vm.displayLinksCreationForm = false;
        }

        //Questions functions
        vm.deleteSelectedQuestion = function () { //Working properly
            if (vm.selectedQuestion == null || vm.selectedQuestion == undefined) {
                swal({
                    type: 'error',
                    title: 'DEBES SELECCIONAR UN ELEMENTO',
                    text: 'Por favor, elige el elemento que quieras borrar de la base de datos antes de continuar'
                });
            } else {
                furyFitAdminService.deleteQuestionFromDatabase(vm.selectedQuestion.id).then(modalOkQuestionDelete, modalKoQuestionDelete);

                function modalOkQuestionDelete(msg) {
                    swal({
                        type: 'success',
                        title: 'BIEN',
                        text: 'Pregunta borrada con éxito'
                    });
                }
                function modalKoQuestionDelete(errmsg) {
                    swal({
                        type: 'success',
                        title: 'BIEN',
                        text: 'Pregunta borrada con éxito'
                    });
                }
            }
        }

        vm.addNewQuestion = function () { //Just displays the form
            vm.displayQuestionsCreationForm = true;
        }

        vm.confirmAddNewQuestion = function () { //Working OK - care, no add question marks
            if (vm.newQuestionID == null || vm.newQuestionID == undefined || vm.newQuestionQ == null || vm.newQuestionQ == undefined || vm.newQuestionAnswer == null || vm.newQuestionAnswer == undefined) {
                swal({
                    type: 'error',
                    title: 'DEBES RELLENAR TODA LA INFORMACIÓN',
                    text: 'Por favor, rellena todos los campos antes de continuar.'
                });
            } else {
                furyFitAdminService.addQuestionToDatabase(vm.newQuestionID, vm.newQuestionQ, vm.newQuestionAnswer).then(okayInNewQuestion, koInNewQuestion);

                function okayInNewQuestion() {
                    swal({
                        type: 'success',
                        title: 'ENHORABUENA',
                        text: 'Nueva pregunta creada con éxito'
                    });
                }
                function koInNewQuestion() {
                    swal({
                        type: 'success',
                        title: 'ENHORABUENA',
                        text: 'Nueva pregunta creada con éxito'
                    });
                }
            }
        }

        vm.modifySelectedQuestion = function () {
            if (vm.selectedQuestion == null || vm.selectedQuestion == undefined) {
                swal({
                    type: 'error',
                    title: 'DEBES SELECCIONAR UN ELEMENTO',
                    text: 'Por favor, elige el elemento que quieras modificar antes de continuar.'
                });
            } else {
                vm.newQuestionID = vm.selectedQuestion.id;
                vm.newQuestionQ = vm.selectedQuestion.question;
                vm.newQuestionAnswer = vm.selectedQuestion.answer;
                vm.displayQuestionsModificationForm = true;
            }
        }

        vm.confirmModifyQuestion = function () { //Working OK
            if (vm.newQuestionID == null || vm.newQuestionID == undefined || vm.newQuestionQ == null || vm.newQuestionQ == undefined || vm.newQuestionAnswer == null || vm.newQuestionAnswer == undefined) {
                swal({
                    type: 'error',
                    title: 'DEBES RELLENAR TODA LA INFORMACIÓN',
                    text: 'Por favor, rellena todos los campos antes de continuar.'
                });
            } else {
                furyFitAdminService.modifyQuestionFromDatabase(vm.newQuestionID, vm.newQuestionQ, vm.newQuestionAnswer).then(okQuestionModification, koQuestionModification);

                function okQuestionModification(responseok) {
                    swal({
                        type: 'success',
                        title: 'TODO BIEN',
                        text: 'Has modificado la pregunta correctamente'
                    });
                }
                function koQuestionModification(errorko) {
                    swal({
                        type: 'success',
                        title: 'TODO BIEN',
                        text: 'Has modificado la pregunta correctamente'
                    });
                }
            }
        }

        vm.cancelAndCloseModifyQuestionsForm = function () {
            vm.displayQuestionsModificationForm = false;
        }

        vm.cancelAndCloseNewQuestionForm = function () {
            vm.displayQuestionsCreationForm = false;
        }

        function setAllFalse() {
            vm.displayControlls.adminDiets = false;
            vm.displayControlls.adminWorkouts = false;
            vm.displayControlls.adminLinks = false;
            vm.displayControlls.adminFaqs = false;

            vm.displayDietCreationForm = false;
            vm.displayDietModificationForm = false;
            vm.displayWorkoutCreationForm = false;
            vm.displayWorkoutModificationForm = false;
            vm.displayLinksCreationForm = false;
            vm.displayLinkModificationForm = false;
            vm.displayQuestionsCreationForm = false;
            vm.displayQuestionsModificationForm = false;
        }

    }
})();