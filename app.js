console.log("hello Mustapha");	

var pakketten_price_currency = '&euro;';

	// declaring the module //

var app = angular.module("movieSelector", ['ngSanitize']); 

	//declaring the controller //

app
.controller('pakkettenController', ['$scope', '$sce', 
function pakkettenController($scope, $sce) {
	
	var vm = this;
	
	
	vm.pakketten_price_currency = pakketten_price_currency;
	
	
	// array with items to select //
	
	vm.pakketten = [
	{
        name: "HBO Series",
        price: 5
	},
    {
        name: "Andere premium series",
        price: 4
	},
    {
        name: "Blockbusters Internationaal",
        price: 4
	},
    {
        name: "Blockbusters Nederlands",
        price: 3.5
	},
    {
        name: "Andere titels",
        price: 3
	},
    {
        name: "Series direct",
        price: 3
	},
    {
        name: "Series catalogus",
        price: 2.5
	},
    {
        name: "Films direct",
        price: 1.5
	},
    {
        name: "Films catalogus",
        price: 1
	},
    {
        name: "HBO GO",
        price: 4
	},
    {
        name: "HBO on Demand",
        price: 2.5
	},  
    {
        name: "3 TV kanalen",
        price: 1.5
	}   
    ];

	vm.safeHTML = function(t) {
		return $sce.trustAsHtml(t);
	};
	/*
for(var i=0; i < vm.pakketten.length; i++) {
        console.log(vm.pakketten[i]);
	}
	*/
}]);

