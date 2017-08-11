(function () {
    angular
        .module('app')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$http', '$state', 'localStorageService', 'configService', '$q'];

    function authenticationService($http, $state, localStorageService, configService, $q) {
        var service = {};
        service.login = login;
        service.logout = logout;
        return service;

        function login(user) {

            var defer = $q.defer();
            var url = configService.getApiUrl() + '/Token';
            var data = "username=" + user.userName + "&password=" + user.password;
            $http.post(url,
                data,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(function (result) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + result.data.access_token;
                    localStorageService.set('userToken',
                        {
                            token: result.data.access_token,
                            userName: user.userName
                        });
                    configService.setLogin(true);
                    defer.resolve(true);
                },
                function (error) {
                    defer.reject(false);
                });
            return defer.promise;
        }

        function logout() {
            $http.defaults.headers.common.Authorization = '';
            localStorageService.remove('userToken');
            configService.setLogin(false);
        }

    }
})();
(function () {
    angular
        .module('app')
        .factory('dataService', dataService);

    dataService.$inject = ['$http'];

    function dataService($http) {
        var service = {};
        service.getData = getData;
        service.postData = postData;
        service.putData = putData;
        service.deleteData = deleteData;

        return service;

        function getData(url) {
            return $http.get(url);
        }
        function postData(url, data) {
            return $http.post(url, data);
        }
        function putData(url, data) {
            return $http.put(url, data);
        }
        function deleteData(url) {
            return $http.delete(url);
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app')
        .factory('configService', configService);

    function configService() {
        var service = {};
        var apiUrl = undefined;
        var isLogged = false;
        service.setLogin = setLogin;
        service.getLogin = getLogin;
        service.setApiUrl = setApiUrl;
        service.getApiUrl = getApiUrl;


        return service;

        function setLogin(state) {
            isLogged = state;
        }

        function getLogin() {
            return isLogged;
        }

        function getApiUrl() {
            return apiUrl;
        }

        function setApiUrl(url) {
            apiUrl = url;
        }
    }
})();
(function () {
    angular.module('app')
        .directive('modalPanel', modalPanel);
    function modalPanel() {
        return {

            templateUrl: 'app/components/modal/modal-directive.html',
            restrict: 'E',
            transclude: true,
            scope:
            {
                title: '@',
                buttonTitle: '@',
                saveFunction: '=',
                closeFunction: '=',
                readOnly: '=',
                isDelete: '='


            }


        };


    }


})();
(function () {
    'use strict';
    angular.module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['$http', 'authenticationService', 'configService', '$state'];

    function loginController($http, authenticationService, configService, $state) {
        var vm = this;
        vm.user = {};
        vm.title = 'Login';
        vm.login = login;
        vm.showError = false;

        init();

        function init() {
            if (configService.getLogin()) $state.go("member");
            authenticationService.logout();
        }

        function login() {
            authenticationService.login(vm.user).then(function (result) {
                vm.showError = false;
                $state.go("home");
            }, function (error) {
                vm.showError = true;
            });
        }
    }
})();
(function () {
    'use strict';
    angular.module('app')
        .controller('corporationController', corporationController);

    corporationController.$inject = ['dataService', 'configService', '$state'];

    function corporationController(dataService, configService, $state) {
        var apiUrl = configService.getApiUrl();
        var vm = this;
        vm.corporation = {};
        vm.corporationList = [];
        vm.modalButtonTitle = '';
        vm.readOnly = false;
        vm.isDelete = false;
        vm.modalTitle = '';
        vm.showCreate = false;


        vm.totalRecords = 0;
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.itemPerPage = 25;

        //funciones
        vm.getCorporation = getCorporation;
        vm.create = create;
        vm.edit = edit;
        vm.delete = corporationDelete;
        vm.pageChanged = pageChanged;


        init();
        function init() {
            if (!configService.getLogin()) return $state.go('login');
            configurePagination();
        }
        function configurePagination() {

            var widthScreen = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            if (widthScreen < 420) vm.maxSize = 5;
            totalRecords();
        }
        function pageChanged() {
            getPageRecords(vm.currentPage);

        }
        function totalRecords() {
            dataService.getData(apiUrl + '/corporation/count')
                .then(function (result) {
                    vm.totalRecords = result.data;
                    getPageRecords(vm.currentPage);
                }, function (error) {
                    vm.corporationList = [];
                    console.log(error);
                }
                );
        }
        function getPageRecords(page) {
            dataService.getData(apiUrl + '/corporation/list/' + page + '/' + vm.itemPerPage)
                .then(function (result) {
                    vm.corporationList = result.data;

                },
                function (error) {
                    vm.corporationList = [];
                    console.log(error);
                });
        }

        function getCorporation(id) {
            vm.corporation = null;
            dataService.getData(apiUrl + '/corporation/' + id)
                .then(function (result) {

                    vm.corporation = result.data;

                },
                function (error) {
                    vm.corporation = null;
                    console.log(error);
                }
                )
        }

        function updateCorporation() {
            if (!vm.corporation) return;
            dataService.putData(apiUrl + '/corporation', vm.corporation)
                .then(function (result) {
                    vm.corporation = {};
                    pageChanged();
                    closeModal();
                },
                function (error) {
                    vm.corporation = {};
                    console.log(error);
                });

        }

        function createCorporation(id) {
            if (!vm.corporation) return;
            dataService.postData(apiUrl + '/corporation', vm.corporation)
                .then(function (result) {
                    getCorporation(result.data.id)
                    pageChanged();
                    vm.showCreate = true;
                },
                function (error) {

                    console.log(error);
                });


        }

        function deleteCorporation() {

            dataService.deleteData(apiUrl + '/corporation/' + vm.corporation.id)
                .then(function (result) {

                    pageChanged();
                    closeModal();
                },
                function (error) {

                    console.log(error);
                });


        }

        function create() {
            vm.customer = {};
            vm.modalTitle = 'New Corporation';
            vm.modalButtonTitle = '';
            vm.readOnly = false;
            vm.modalFunction = createCorporation;
            vm.isDelete = false;

        }

        function edit() {
            vm.showCreate = false;
            vm.modalTitle = 'Edit Corporation';
            vm.modalButtonTitle = 'update';
            vm.readOnly = false;
            vm.modalFunction = updateCorporation;
            vm.isDelete = false;

        }
        function detail() {
            vm.modalTitle = 'Created Corporation';
            vm.modalButtonTitle = '';
            vm.readOnly = true;
            vm.modalFunction = null;
            vm.isDelete = true;

        }

        function corporationDelete() {
            vm.showCreate = false;

            vm.modalTitle = 'Delete Corporation';
            vm.modalButtonTitle = 'Delete';
            vm.readOnly = false;
            vm.modalFunction = deleteCorporation;
            vm.isDelete = true;
        }
        function closeModal() {
            angular.element('#modal-container').modal('hide');

        }
        


    }

})();
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
                corporation:'='

            },
            templateUrl: 'app/private/corporation/directives/corporation-form/corporation-form.html'


        };


    }




}




    )();