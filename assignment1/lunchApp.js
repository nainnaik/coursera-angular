
(function(){
angular.module('lunchChecker',[])
		.controller("LunchCheckController",LunchCheckController);
		function LunchCheckController($scope) {
			$scope.foodItems='';
			$scope.msg;
			LunchCheckController.$inject=[$scope];

			$scope.checkLunch =function() {
				var totalLunchEntries = countLunchEntries($scope.foodItems);
				
				if(totalLunchEntries <= 0) {
					$scope.msg="Please enter data first";
				}
				else if(totalLunchEntries.length <= 3){
					$scope.msg= "Enjoy!!";
				}
				else {
					 $scope.msg="Too Much!!";
				}
			};
			
			function countLunchEntries(lunchEntries){						
				return lunchEntries.trim()
								  .split(",");	
			}
		}
	 	
})(); 		