'use strict';

/* Directives */

//Version 0.2.0 
//AngularJS simple file upload directive
//this directive uses an iframe as a target
//to enable the uploading of files without
//losing focus in the ng-app.
//
//<div ng-app="app">
//<div ng-controller="mainCtrl">
// <form action="/uploads" ng-upload="results()"> 
//   <input type="file" name="avatar"></input>
//   <input type="submit" value="Upload"></input>
// </form>
//</div>
//</div>
//

//var app = angular.module('distributeApp', []);

app.directive('modal', function () {
	return {
		template: '<div class="modal fade">' + 
		'<div class="modal-dialog">' + 
		'<div class="modal-content">' + 
		'<div class="modal-header">' + 
		'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
		'<h4 class="modal-title">{{ title }}</h4>' + 
		'</div>' + 
		'<div class="modal-body" ng-transclude></div>' + 
		'</div>' + 
		'</div>' + 
		'</div>',
		restrict: 'E',
		transclude: true,
		replace:true,
		scope:true,
		link: function postLink(scope, element, attrs) {
			scope.title = attrs.title;

			scope.$watch(attrs.visible, function(value){
				if(value == true)
					$(element).modal('show');
				else
					$(element).modal('hide');
			});

			$(element).on('shown.bs.modal', function(){
				scope.$apply(function(){
					scope.$parent[attrs.visible] = true;
				});
			});

			$(element).on('hidden.bs.modal', function(){
				scope.$apply(function(){
					scope.$parent[attrs.visible] = false;
				});
			});
		}
	};
});

