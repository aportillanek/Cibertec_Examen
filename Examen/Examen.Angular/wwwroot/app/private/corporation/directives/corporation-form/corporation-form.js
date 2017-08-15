(function ()
{
    'use-strict';
    angular.module('app')
        .directive('corporationForm', corporationForm);
    function corporationForm()
    {
        return {

            restrict: 'E',
            scope: {
                corporation: '='

            },
            templateUrl: 'app/private/corporation/directives/corporation-form/corporation-form.html'


        };


    }




})();