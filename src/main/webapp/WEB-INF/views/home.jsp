<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
	<head>
	    <meta charset="utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <meta name="description" content="">
	    <meta name="author" content="">
	    <!-- Bootstrap core CSS -->
		<link href="../../resources/libs/bootstrap/css/bootstrap.css" rel="stylesheet">      
		<link href="../../resources/libs/bootstrap/css/custom.css" rel="stylesheet">
		<link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/angular-loading-bar/0.7.1/loading-bar.min.css' type='text/css' media='all' />
 
	</head>
   
   <body ng-app="distributeApp">
   <!-- Fixed navbar -->
    <div class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        
      </div>
      <div class="navBiz">
	  	<div class="btnBox">
			<span class="heading"></span>
		</div>
	  </div>
    </div>    
    <div class="container wrapContainer" ng-view></div>
    <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <script src="../../resources/libs/jquery/jquery-2.1.3.min.js"></script>
    <script src="../../resources/libs/bootstrap/js/bootstrap.js"></script>
    <script src="../../resources/libs/angular/angular.js"></script>
    <script src="../../resources/libs/angular/angular-routes.js"></script>
    <script src="../../resources/libs/angular/angular-file-upload.js"></script>
    <script src="../../resources/libs/bootstrap/js/ui-bootstrap-tpls-0.12.0.js"></script>
    <script src="../../resources/libs/smart-table/smart-table.min.js"></script>    
    <script src="../../resources/js/app.js"></script>
    <script src="../../resources/js/services/services.js"></script>
    <script src="../../resources/js/controllers/controllers.js"></script>
    <script src="../../resources/js/directives/directives.js"></script>
    
    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/angular-loading-bar/0.7.1/loading-bar.min.js"></script>
 
</body>
</html>