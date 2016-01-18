'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('distributeApp', ['ngRoute','smart-table', 'angularFileUpload', 'ui.bootstrap', 'angular-loading-bar']);

app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider) {
    $routeProvider.
    
    when('/', {
    	redirectTo : '/home',
    }).
    
    when('/home', {
    	templateUrl: 'resources/partials/empView/empList.html'
//    	templateUrl: 'resources/partials/mainView/main.html'
    }).
    
    when('/emp', {
    	templateUrl: 'resources/partials/empView/empList.html'
    }).
    
    when('/upload', {
    	templateUrl: 'resources/partials/uploadView/upload.html'
    }).
    
    when('/download/site', {
    	templateUrl: 'resources/partials/downloadView/site.html'
    }).

    when('/download/core', {
    	templateUrl: 'resources/partials/downloadView/core.html'
    }).
    
    when('/project', {
    	templateUrl: 'resources/partials/projectView/projectList.html'
    }).
    
    when('/historyDownload', {
    	templateUrl: 'resources/partials/historyView/historyDownload.html'
    }).
    
    when('/historyUpgrade', {
    	templateUrl: 'resources/partials/historyView/historyUpgrade.html'
    }).    
    
    when('/user', {    	
    	templateUrl: 'resources/partials/userView/userList.html'
    }).
    when('/customer', {    	
    	templateUrl: 'resources/partials/customerView/customerList.html'
    }).
    
    when('/apprform/download', {    	
    	templateUrl: 'resources/partials/apprFormView/apprForm.html'
    }).
    when('/apprform/mix', {    	
    	templateUrl: 'resources/partials/apprFormView/apprFormCustom.html'
    }).
    
    when('/apprform/history', {    	
    	templateUrl: 'resources/partials/apprFormView/apprFormHistory.html'
    }).
    
    when('/apprform/manage',{
    	templateUrl: 'resources/partials/apprFormView/apprFormManage.html'
    }).
    
    otherwise({redirectTo: 'resources/partials/mainView/error.html'});
}]);

app.config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
})
