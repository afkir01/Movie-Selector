console.log("Hello Angular");

var pakketten_price_currency = '&euro;';

var pakketten_price_total = 5;

var pakketten_price_decimals = true;

var disabled_films = [2, 3, 4, 12];
var disabled_lancering = [5, 6, 7, 8];
var disabled_manier_kijken = [9, 10, 11];

	// declaring the module //

var app = angular.module("movieSelector", []); 

	//declaring the controller //

app
.controller('pakkettenController', ['$scope', '$sce', '$http', 
function pakkettenController($scope, $sce, $http) {
	
	var vm = this;
	
	vm.movie_info = {};
		
		// making the API to get movie info!
		
	$http({
		method: 'GET',
		url: 'http://www.omdbapi.com/?t=The+matrix&y=&plot=short&r=json'
	}).then(function successCallback(response) {
		vm.movie_info = response.data;
	}, function errorCallback(response) {
		console.log(response);
	});		
	
	vm.mustShow = false;
	
	vm.pakketten_price_currency = pakketten_price_currency;
	vm.pakketten_price_total = vm.pakketten_total;

	// array with pakketten to select 
		
	vm.pakketten = [
	{
        name: "HBO Series",
        price: 5,
		selected: true,
		disabled: false
	},
    {
        name: "Andere premium series",
        price: 4,
		selected: false,
		disabled: false
	},
    {
        name: "Blockbusters Internationaal",
        price: 4,
		selected: false,
		disabled: true
	},
    {
        name: "Blockbusters Nederlands",
        price: 3.5,
		selected: false,
		disabled: true
	},
    {
        name: "Andere titels",
        price: 3,
		selected: false,
		disabled: true
	},
    {
        name: "Series direct",
        price: 3,
		selected: false,
		disabled: true
	},
    {
        name: "Series catalogus",
        price: 2.5,
		selected: false,
		disabled: true
	},
    {
        name: "Films direct",
        price: 1.5,
		selected: false,
		disabled: true
	},
    {
        name: "Films catalogus",
        price: 1,
		selected: false,
		disabled: true
	},
    {
        name: "HBO GO",
        price: 4,
		selected: false,
		disabled: true
	},
    {
        name: "HBO on Demand",
        price: 2.5,
		selected: false,
		disabled: true
	},  
    {
        name: "3 TV kanalen",
        price: 1.5,
		selected: false,
		disabled: true
	},	
	{  
		name: "The Matrix",
        price: 1.5,
		selected: false,
		disabled: true
    }
	];

	
	console.log("test test")
	
	// looping through the array and add each item that is selected to the total!
	
	vm.getTotal = function(){
		var total = 0;
		
		vm.pakketten.forEach(function(product) {
			if (product.selected == true) {
				total = total+product.price;
			}
		});

		return total;
	};
	
	// disable block of items if items on block before are not selected
	
	vm.disableBlock = function(block) {
		
		for(var i = 0; i <= block.length - 1; i++) {
			var val = block[i];
			
			vm.pakketten[val].disabled = true;
			vm.pakketten[val].selected = false;
		}
	};

	vm.disablePakket = function(key) {
		var pakket = vm.pakketten[key];

		if (pakket.selected == true) {
			return;
		}

		if (key == 1) {
			vm.disableBlock(disabled_films);
			vm.disableBlock(disabled_lancering);
			vm.disableBlock(disabled_manier_kijken);
		}
		else if (key >= 2 && key <= 4) {
			if (vm.checkBlockIfSelected(disabled_films) == false) {
				vm.disableBlock(disabled_lancering);
				vm.disableBlock(disabled_manier_kijken);
			}
		}
		else if (key >= 5 && key <= 8) {
			if (vm.checkBlockIfSelected(disabled_lancering) == false) {
				vm.disableBlock(disabled_manier_kijken);
			}
		}
	};

	vm.checkBlockIfSelected = function(block) {

		var counter = 0;

		for(var i = 0; i <= block.length - 1; i++) {
			var val = block[i];

			if (vm.pakketten[val].selected == true) {
				counter++;
			} 

		}

		if (counter == 0) {
			return false;
		} else {
			return true;
		}
		
	}
	
	// function voor disabling pakket row
	
	vm.checkTrForSelection = function(pakket, index) {


		if (pakket.disabled == true) {
			return;
		}
		
		pakket.selected = true;
		
		vm.enablePakket(index);
		
		
	};

	// function to enable a pakket if former packet is selected
	
	vm.enablePakket = function(key) {
		if (key == 1) {

			for(var i = 0; i <= disabled_films.length - 1; i++) {
				var val = disabled_films[i];
				vm.pakketten[val].disabled = false;
				
			}

		}
		else if (key >= 2 && key <= 4 || key == 12) {
			
			for(var i = 0; i <= disabled_lancering.length - 1; i++) {
				var val = disabled_lancering[i];
				
				vm.pakketten[val].disabled = false;
				
			}

		}
		else if (key >= 5 && key <= 8) {
			
			for(var i = 0; i <= disabled_manier_kijken.length - 1; i++) {
				var val = disabled_manier_kijken[i];
				
				vm.pakketten[val].disabled = false;
				
			}

		}

	};
	
	// function to clear all selected item with a click on the button
	
	console.log("Test 1");
	vm.clearAll = function (){
			
		vm.pakketten.forEach(function(pakket, index) {
			if (index == 0){
				return true;
			}
			
			pakket.selected = false;
		
	});
	};
	
	// function to check the opacity of the div 
	
	vm.checkOpacity = function(arr) {
		
		for(var i = 0; i <= arr.length - 1; i++) {
			var id = arr[i];
			
			if (vm.pakketten[id].selected == true) {
				return false;
			}
		}
		
		return true;
	}
}]);
