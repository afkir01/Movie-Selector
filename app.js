console.log("Hello Angular");

var pakketten_price_currency = '&euro;';

var pakketten_price_total = 5;

var pakketten_price_decimals = true;


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
		selected: true
	},
    {
        name: "Andere premium series",
        price: 4,
		selected: false
	},
    {
        name: "Blockbusters Internationaal",
        price: 4,
		selected: false
	},
    {
        name: "Blockbusters Nederlands",
        price: 3.5,
		selected: false
	},
    {
        name: "Andere titels",
        price: 3,
		selected: false
	},
    {
        name: "Series direct",
        price: 3,
		selected: false
	},
    {
        name: "Series catalogus",
        price: 2.5,
		selected: false
	},
    {
        name: "Films direct",
        price: 1.5,
		selected: false
	},
    {
        name: "Films catalogus",
        price: 1,
		selected: false
	},
    {
        name: "HBO GO",
        price: 4,
		selected: false
	},
    {
        name: "HBO on Demand",
        price: 2.5,
		selected: false
	},  
    {
        name: "3 TV kanalen",
        price: 1.5,
		selected: false
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
	
}]);

