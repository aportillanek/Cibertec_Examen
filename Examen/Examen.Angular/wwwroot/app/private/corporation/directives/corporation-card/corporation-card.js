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
                corp_no: '@',
                corp_name: '@',
                street: '@',
                city: '@',
                state_prov: '@',
                country: '@',
                mail_code: '@',
                phone_no: '@',
                expr_dt: '@',
                corp_code: '@'
            },

            templateUrl: 'app/private/corporation/directives/corporation-card/corporation-card.html',
            controller: directiveController



        };


    }

    function directiveController() {



    }

})();