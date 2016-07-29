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
    
    /**
     * print the countries with a linked name
     */
    function printHolidaysList() {
        for(var i in holidayData) {
            if (holidayData.hasOwnProperty(i)) {
               addLi('#country-list', '<a data-countryID="' + i + '" href="#' + holidayData[i].country + '">' + holidayData[i].country + '</a>');
            }
        };
    }; 
    
    /**
     * Log to the log panel
     * @param {string} message to log
     */
    function logit(string) {
        addLi('#log', string);
    };
   
    /**
     * Add a list item.
     * @param {string} targetID - The id to append to.
     * @param {string} content - The text.
     */ 
    function addLi(targetID, content) {
        $('<li>' + content + '</li>').appendTo(targetID);
    }

    /**
     * Print destination cities for the selected countryID
     */ 
    function printCities(){
        
        
        // empty the dom
        $('#city-list').html('');

        $.each(holidayData[countryID].cities, function(id, city) {
            // Inject a new ul for each city with an ID
            $('<ul id="city-' + id + '"></ul>').appendTo('#city-list');
            
            // The element ID to append to (see above ul id)
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
                     
            $('#selected-country').html('countryID: ' + countryID);
            
            // The countryID has been set so we can safely print it's cities
            printCities();
            // The cities have a link that needs to do some work when clicked.
            setCityClickEvents();
            return false;
        });
    };
  
    function setCityClickEvents() {
        $('#city-list').on('click', 'a', function() {
            // Update  cityID from the clicked link attribute
            cityID = $(this).attr('data-cityID');
            logit('Clicked: ' + holidayData[countryID].cities[cityID].name);
            
            $('#selected-city').html('cityID: ' + cityID);
            logit( 'do something with clicked countryID: ' + countryID + ' cityID.name: '+ holidayData[countryID].cities[cityID].name);
            return false;
       });     
    };
            
   // A method to set the ajax :url
    this.setUrl = function(url) {
        this.holidaysDataUrl = url;
    };
    


    // Get the holidays
    this.getHolidays = function() {
        // Get the json
        console.log('holidaysDataUrl',this.holidaysDataUrl);
        $.getJSON(this.holidaysDataUrl, function() {


        })
        .done(function(response) {
            // We have the holiday json response at last and is now a JS object
            // put it into the global holidayData array where we can get at it
            holidayData = response;
            logit('Ajax holidayData loaded ' + holidayData.length + ' countries');
            printHolidaysList();
                    
            // activate the links
            setCountryClickEvents();
            
        })
        .fail(function(request, errorType, errorMessage) {
            var message = "Ajax errorType: errorType=" + errorType + " errorMessage: " + errorMessage;
            logit(message);
            $('h1').html(message);

        })
    }
}


$(document).ready(function() {

  var holidays = new Holidays();
  holidays.setUrl('assets/json/holidays.json');
  holidays.getHolidays();

});

