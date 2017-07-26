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
                corp_No: '@',
                corp_Name: '@',
                street: '@',
                city: '@',
                state_Prov: '@',
                country: '@',
                mail_Code: '@',
                phone_No: '@',
                expr_Dt: '@',
                corp_Code: '@'
            },

            templateUrl: 'app/private/corporation/directives/corporation-card/corporation-card.html',
            controller: directiveController



        };


    }

    function directiveController() {



    }

})();