'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
//angular.module('myApp.services', []).
//  value('version', '0.1');

app.factory('empFactory', function($q, $filter, $timeout, $http)  {
    var empFactory = {};

    empFactory.getEmpList = function(start, offset, params) {
        var deferred = $q.defer();
        var direction = params.sort.reverse == true ? "desc" : "asc";
        var result = {};
        var totalPage;     
        	
        $http.get('/employee/list', {
                params: {
                    page: start / offset,
                    offset: offset,
                    property: params.sort.predicate,
                    direction: direction
                }
            }).success(function(data, status, headers, config) {
                if (data) {
                    result = data.content;
                    totalPage = parseInt(data.pageInfo.total / data.pageInfo.offset) + 1;
                }
                deferred.resolve({
                    data: result,
                    numberOfPages: totalPage
                });
            })
            .error(function(data, status, headers, config) {
                console.log(status);
            });

        return deferred.promise;
    };

    empFactory.updateEmp = function(id, seq, level, name, phone, email) {
    	var model = {};
    	model.id = id;
    	model.seq = seq;
    	model.level =level;
    	model.name = name;
    	model.phone = phone;
    	model.email = email;
        return $http({
            method: 'PUT',
            url: '/employee/update',
            data : model
            });
    };

    empFactory.addEmp = function(seq, level, name, phone, email) {
    	var model = {};
    	model.seq = seq;
    	model.level =level;
    	model.name = name;
    	model.phone = phone;
    	model.email = email;
        return $http({
            method: 'POST',
            url: '/employee/create',
            data : model
        });
    };

    empFactory.deleteEmp = function(id) {
        return $http.delete('/employee/' + id);
    };

    return empFactory;
});
