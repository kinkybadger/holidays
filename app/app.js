var holidayApp = angular.module('holidayApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
holidayApp.controller('HolidayListController', function HolidayListController($http) {

    $http.get('/app/json/holidays.json').then(function(response) {
        var self = this; 
        self.holidays = response.data;
        console.log(response.data)
    });
      

})
