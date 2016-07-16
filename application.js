/**
 * ------------------------------ Get some tours -------------------------------
 */

// global variable


function Holidays() {

  var data = [];

  this.countryUrl = 'tours.json';

  this.setUrl = function(url) {
    this.countryUrl = url;
  };

  // Helpers
  this.getCountries = function() {
    // Get the json
    $.getJSON(this.countryUrl, function() {

    })
    .done(function(data, status) {
      console.log(data[0].country, status);

      var countries = $('<ul id="country"></ul>');

      for(i in data) {
        console.log(data[i].country);

        $('<li><a href=#'+data[i].country+'>'+data[i].country+'</a></li>').appendTo(countries);
      }


      $('#country').detach().html(countries).appendTo('.menu');

    })
    .fail(function(request, errorType, errorMessage) {
      console.log("error: " + errorType + " = " + errorMessage);
    })


  }


  $('#country').on('click', 'a', function() {
    console.log('i was clicked', $(this).attr('href'));
  });
  //return this.countries;


  // Set the country object on click in new TakeTour() object.
//  this.setCountry = function(e) {
//
//    e.preventDefault();
//
//    var selected = $(this).attr('href');
//
//    this.country = selected;
//
//    //console.log(selected);
//
//    $('.city').fadeIn();
//    //$(this).find('.city').fadeIn();
//
//    return this.country;
//
//
//  }

  // Events

}


$(document).ready(function() {

  getTime();

  var holidays = new Holidays();

  holidays.getCountries();



});


// -----------------------------------------------------------------------------
var currentTime = new Date($.now());

// Debug tool.
//function logIt(text) {
//  console.log(text);
//}

// Date time.
function getTime() {
  $('#date').append(currentTime);
}
