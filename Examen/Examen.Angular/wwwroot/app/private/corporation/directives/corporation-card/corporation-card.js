(function () {
    'use strict';

    angular.module('app')
        .directive('corporationCard', corporationCard);

    function corporationCard() {
        return {
            restrict: 'E',
            transclude: true,
            scope:
            {
                corpNo: '@',
                corpName: '@',
                street: '@',
                city: '@',
                stateProv: '@',
                country: '@',
                mailCode: '@',
                phoneNo: '@',
                exprDt: '@',
                corpCode: '@'
            },

            templateUrl: 'app/private/corporation/directives/corporation-card/corporation-card.html',
            controller: directiveController



        };


    }

    function directiveController() {



    }

})();