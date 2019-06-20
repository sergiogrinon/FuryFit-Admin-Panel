(function () {
    'use strict';

    angular
        .module('furyfitadm')
        .factory('furyFitInterestLinksService', furyFitInterestLinksService);

    furyFitInterestLinksService.$inject = ['$q', 'furyFitInterestLinksProxy'];

    function furyFitInterestLinksService($q, furyFitInterestLinksProxy) {
        var defer;

        return {
            getInterestingLinks: getInterestingLinks,
            deleteInterestingLinks: deleteInterestingLinks,
            createLink: createLink,
            updateLink: updateLink
        };

        function getInterestingLinks() {
            defer = $q.defer();

            furyFitInterestLinksProxy.getLinksFromProxy().then(paintLinks, sendErrorBck);

            return defer.promise;

            function paintLinks(data) {
                defer.resolve(data);
            }

            function sendErrorBck(error) {
                defer.reject(error);
            }
        }

        /**
         * 
         * @param {int} idToDlt 
         */
        function deleteInterestingLinks(idToDlt) {
            defer = $q.defer();

            furyFitInterestLinksProxy.deleteLinkFromProxy(idToDlt).then(paintLinks, sendErrorBck);

            return defer.promise;

            function paintLinks(data) {
                defer.resolve(data);
            }

            function sendErrorBck(error) {
                defer.reject(error);
            }
        }

        /**
         * 
         * @param {int} nwId 
         * @param {String} nwLinkUrl //Must be URL
         * @param {String} nwImgSrc //Must be Google Drive SRC
         */
        function createLink(nwId, nwLinkUrl, nwImgSrc) {
            defer = $q.defer();

            furyFitInterestLinksProxy.createLinkFromProxy(nwId, nwLinkUrl, nwImgSrc).then(paintRespn, sendError);

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
         * @param {int} linkId 
         * @param {String} linkUrl 
         * @param {String} imgSrc 
         */
        function updateLink(linkId, linkUrl, imgSrc) {
            defer = $q.defer();

            furyFitInterestLinksProxy.updateLinkFromProxy(linkId, linkUrl, imgSrc).then(paintRespn, sendError);

            return defer.promise;

            function paintRespn(data) {
                defer.resolve(data);
            }

            function sendError(error) {
                defer.reject(error);
            }
        }
    }
})();