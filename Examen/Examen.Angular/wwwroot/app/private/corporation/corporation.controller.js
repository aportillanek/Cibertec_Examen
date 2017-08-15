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
            vm.modalButtonTitle = 'Create';
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