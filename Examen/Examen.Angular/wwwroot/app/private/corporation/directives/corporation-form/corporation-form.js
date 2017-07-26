(function ()
{
    'use-strict';
    angular.module('app')
        .directive('corporationForm', corporationForm)
    function corporationForm()
    {
        return {

            restrict: 'E',
            scope: {
                corporation:'='

            },
            templareUrl: 'app/private/corporation/directives/corporation-form/corporation-form.html'


        };


    }




}




    )();