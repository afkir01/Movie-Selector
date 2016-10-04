console.log("Hello Angular");

var pakketten_price_currency = '&euro;';

var pakketten_price_total = 5;

var pakketten_price_decimals = true;

var disabled_films = [2, 3, 4];
var disabled_lancering = [5, 6, 7, 8];
var disabled_manier_kijken = [9, 10, 11];

	// declaring the module //

var app = angular.module("movieSelector", []); 

	//declaring the controller //

	
app
.controller('pakkettenController', ['$scope', '$sce', 
function pakkettenController($scope, $sce) {
	
	var vm = this;
		
	
	vm.pakketten_price_currency = pakketten_price_currency;
	vm.pakketten_price_total = vm.pakketten_total;

	// array with items to select 
	
	// vm.pakketten.name;
	// vm.pakketten.price;
	// vm.pakketten.selected true/false
	
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
	}   
    ];

	
	vm.safeHTML = function(t) {
		return $sce.trustAsHtml(t);
	};
	
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
	

	vm.disableBlock = function(block) {
		//console.log(block);
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


	vm.enablePakket = function(key) {
		if (key == 1) {

			for(var i = 0; i <= disabled_films.length - 1; i++) {
				var val = disabled_films[i];
				vm.pakketten[val].disabled = false;
			}

		}
		else if (key >= 2 && key <= 4) {
			
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
	
	
	console.log("Test 1");
	vm.clearAll = function (){
			
		vm.pakketten.forEach(function(pakket, index) {
			if (index == 0){
				return true;
			}
			
			pakket.selected = false;
		
	});
	};
}]);
