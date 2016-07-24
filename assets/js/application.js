/**
 * ------------------------------ Get some tours andy -------------------------------
 */

// global variable
function Holidays() {

    // Global stuff
    // external funtions until i understand how to use internal methods correctly.
    
    // an array of countries which has arrays of cities 
    var holidayData = [];  
    // The selected country and city id's
    var countryID = false ;
    var cityID = false ;
    
    function printHolidaysList() {
        for(var i in holidayData) {
            if (holidayData.hasOwnProperty(i)) {
               addLi('#country-list', '<a data-countryID="' + i + '" href="#' + holidayData[i].country + '">' + holidayData[i].country + '</a>');
            }
        };
    }; 
    
    function logit(string) {
        addLi('#log', string);
    };
   
    
    function addLi(targetID, content) {
        console.log(targetID);
        $('<li>' + content + '</li>').appendTo(targetID);
    }

    /**
      * Print destination cities for the selected holidayID
     */ 
    function printCities(){
        
        
        // empty the dom
        $('#city-list').html('');

        $.each(holidayData[countryID].cities, function(id, city) {
            console.log(id, city.name);
            // Inject a new ul for each city with an ID
            $('<ul id="city-' + id + '"></ul>').appendTo('#city-list');
            
            var appendID = '#city-list ul#city-'+ id ;
            
            addLi(appendID, 'Name: <a class="city" data-cityID="'+ id +'" href="#">' + city.name + '</a>');
            addLi(appendID, 'Desc: ' + city.description);
            addLi(appendID, 'Price: ' + city.price);
            
            // city images is an array
            $.each(city.images, function(x, image) {
                addLi(appendID, '<img alt="' + image.title + '" src="' + image.source + image.name +'" />') ;
            });

        }); 

    }
     
    function setCountryClickEvents() {
        $('#country-list').on('click', 'a', function() {
            // Update this HoldayID
            countryID = $(this).attr('data-countryID');
            logit('Clicked CountryID: ' + countryID) ;
                     
            $('#selected-holiday').html('countryID: ' + countryID);
            
            // The countryID has been set so we can safely print it's cities
            printCities();
            // The cities have a link that needs to do some work when clicked.
            setCityClickEvents();
        });
    };
  
    function setCityClickEvents() {
        $('#city-list').on('click', 'a', function() {
            // Update this cityID
            cityID = $(this).attr('data-cityID');
            logit('Clicked CityID: ' + cityID) ;
                     
            $('#selected-city').html('cityID: ' + cityID);

            //printCityDetail();
        });
    };

   
    this.holidaysDataUrl = '/assets/json/holidays.json';


   // A method to set the ajax url
    this.setUrl = function(url) {
        this.holidaysDataUrl = url;
    };
    
    
  
   


    

  // Get the holidays
  this.getHolidays = function() {
    // Get the json
    $.getJSON(this.holidaysDataUrl, function() {

    })
    .done(function(response, status) {
        // We have the holiday json response at last and is now a JS object
        // put it into the global holidayData array where we can get at it
        holidayData = response;
        logit('Ajax holidayData loaded ' + holidayData.length + ' items');
        printHolidaysList();
                
        // activate the links
        setCountryClickEvents();
        
    })
    .fail(function(request, errorType, errorMessage) {
        var message = "Ajax errorType: " + errorType + " errorMessage: " + errorMessage;
        logit(message);
        $('h1').html(message);

    })


  }


  

}


$(document).ready(function() {

  var holidays = new Holidays();

  holidays.getHolidays();
   
  

});

