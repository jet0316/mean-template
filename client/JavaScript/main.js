var master = angular.module('master', ['ngResource', 'ngRoute', 'ngAnimate']);

console.log('Module working')

master.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl : '/html/test.html',
			controller  : 'test'
		})
});


//========= factory to controll all data and sending routes ============//
master.factory('productFactory', function($resource){

	// This creates a $resource model
	// Our base URL is /api/product with the option of additionally passing the /:id component
	// All the methods this $resource model uses will be in reference to those URLs
	var model = $resource('/api/product/:id', {id : '@_id'})
	// this._id
	// @_id
	// :id is optional

	// model.query() // GET all - /api/animals
	// model.get() // GET one - /api/animals/:id
	// model.$save() // POST - /api/animals
	// model.$delete()
	// model.get({id : ObjectId('5483292394823')}) // GET - /api/animals/5483292394823

	// Factories use the revealing module pattern, so we must return the relevant pieces of information
	return {
		model   : model,
		products : model.query()
	}
});


master.controller('test', function($scope, $http, productFactory){

	$scope.products = productFactory.products

	//========= Instead of using a factory, you can make a regular http request to any route ======//
	// $http.get('/api/product')
	// 		.then(function(response){
	// 			console.log(response.data)
	// 			$scope.products = response.data
	// 		});
	//============================================================================================//

	$scope.post = function(){
		
		// this makes a new instance of the factory, passing in the data this.product
		var newProduct = new productFactory.model(this.product)
		
		// this saves the new instance of the factory and pushes the return data back into the factory model so the front end updates instantly
		newProduct.$save(function(response){
			productFactory.products.push(response)
		})
		console.log($scope.product)

		//=========== another way instead of using the factory =======//
		// you can use this.property or $scope.product
		// $http.post('/api/product', this.product)
		// 	.then(function(response){
		// 		$http.get('/api/product')
		// 				.then(function(response){
		// 					console.log(response.data)
		// 					$scope.products = response.data
		// 				});
		// 	})
		$scope.product = {}
	};
});






