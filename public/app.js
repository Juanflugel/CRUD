angular.module('mean',[])

.directive('jpForm',function(){
	return{
		restrict:'E',
		templateUrl:'html/iform.html',

	};
})
. controller('meanCtrl',['$scope','$http',function ($scope,$http){

	var refresh = function(){
		$http.get('/primo').success(function (res){
			$scope.registros=res;
			$scope.dato={};
		});
	};

	refresh();

	$scope.add = function(){
		$http.post('/primo',$scope.dato).success(function (res){
			refresh();
		});
	};

	$scope.borrar = function(id){
		$http.delete('/primo/'+ id).success(function (res){
			refresh();
		});
	};

	$scope.editar = function(id){
		$http.get('/primo/'+ id).success(function (res){
			console.log(res);
			$scope.dato = res;
		});
	};

	$scope.Update = function(){
		$http.put('/primo/'+ $scope.dato._id, $scope.dato).success(function (res){
			console.log('se actualizo esa mierda:',res);
			refresh();
		});
	};
		
}]);