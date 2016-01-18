'use strict';

/* Controllers */
app.controller('EmpCtrl', function($scope, $http, $modal, empFactory, $log) {
	
	var ctrl = this;
	ctrl.displayed = [];
	ctrl.callServer = function callServer(tableState) {
		ctrl.isLoading = true;
		var pagination = tableState.pagination;
		var start = pagination.start || 0; // This is NOT the page number, but the index of item in the list that you want to use to display the table.
		var offset = pagination.number || 10; // Number of entries showed per page.

		empFactory.getEmpList(start, offset, tableState).then(function(result) {
			ctrl.displayed = result.data;
			console.log(ctrl.displayed);
			tableState.pagination.numberOfPages = result.numberOfPages; //set the number of pages so the pagination can update
			ctrl.isLoading = false;
			console.log(ctrl.displayed);
		});
	};
	
	$scope.updateEmp = function(employee) {

		var modalInstance = $modal.open({
			templateUrl: '/resources/partials/empView/updateEmp.html',
			controller: 'empModalCtrl',
			resolve: {
				employee: function() {
					return employee;
				}
			}
		});
		modalInstance.result.then(function() {
		});
	};

	$scope.deleteEmp = function(employee) {

		var modalInstance = $modal.open({
			templateUrl: '/resources/partials/empView/deleteWarning.html',
			controller: 'empModalCtrl',
			size: 'sm',
			resolve: {
				employee: function() {
					return employee;
				}
			}
		});
		modalInstance.result.then(function(customer) {
			var index = $scope.mc.displayed.indexOf(customer);
			if (index !== -1) {
				$scope.mc.displayed.splice(index, 1);
			}
		});
	};

	$scope.addEmp = function() {
		var modalInstance = $modal.open({
			templateUrl: '/resources/partials/empView/addEmp.html',
			controller: 'empModalCtrl',
			resolve: {
				employee: function() {
					return ;
				}
			}
		});
		modalInstance.result.then(function() {
		});
	};
});




app.controller('empModalCtrl', function($scope, $modalInstance, empFactory, employee, $modal) {
	
	$scope.employee = employee;
	$scope.deleteEmp = function() {
		empFactory.deleteEmp($scope.employee.id)
		.success(function(data, status, headers, config) {
			$modal.open({
                templateUrl: '/resources/partials/empView/deleteSuccess.html',
                controller: 'retrunCtrl',
                size: 'sm',
                resolve: {
                	data: function () {
                        return data;
                    }
                }
            });
		})
		.error(function(data, status, headers, config) {
			$modal.open({
	        	templateUrl: '/resources/partials/empView/deleteFail.html',
	            controller: 'retrunCtrl',
	            size: 'sm',
	            resolve: {
                	data: function () {
                        return data;
                    }
                }
	        });
		});
		$modalInstance.close($scope.customer);
	};

    $scope.updateEmp = function(id, seq, level, name, phone, email) {
    	empFactory.updateEmp(id, seq, level, name, phone, email)
            .success(function(data, status, headers, config) {
                $modal.open({
                    templateUrl: '/resources/partials/empView/updateSuccess.html',
                    controller: 'retrunCtrl',
                    size: 'sm',
                    resolve: {
                    	data: function () {
                            return data;
                        }
                    }
                });
            })
            .error(function(data, status, headers, config) {
                $modal.open({
                    templateUrl: '/resources/partials/empView/updateFail.html',
                    controller: 'retrunCtrl',
                    size: 'sm',
                    resolve: {
                    	data: function () {
                            return data;
                        }
                    }
                });
                console.log(status);
            });

        $modalInstance.close();

    };

    $scope.addEmp = function(seq, level, name, phone, email) {
    	empFactory.addEmp(seq, level, name, phone, email)
            .success(function(data, status, headers, config) {
                $modal.open({
                    templateUrl: '/resources/partials/empView/addSuccess.html',
                    controller: 'retrunCtrl',
                    size: 'lg',
                    resolve: {
                    	data: function () {
                            return data;
                        }
                    }
                });
                $modalInstance.close();
            })
            .error(function(data, status, headers, config) {
                $modal.open({
                    templateUrl: '/resources/partials/empView/addFail.html',
                    controller: 'retrunCtrl',
                    size: 'sm',
                    resolve: {
                    	data: function () {
                            return data;
                        }
                    }
                });
                console.log(status);
            });

    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});



app.controller('retrunCtrl',function($scope, $modalInstance, data) {
	$scope.status = data.status;
	$scope.message = data.message;
	$scope.data = data;
    $scope.ok = function () {
        $modalInstance.close();
    };
    
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    
    $scope.success = function () {
    	window.location = '/#emp';
        $modalInstance.close();
    };
});


