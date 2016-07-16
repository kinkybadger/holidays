/**
 * ------------------------------ Get some tours -------------------------------
 */
function Holidays() {

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

      var countries = $('<li></li>');

      for(country in data) {
        console.log(country);

        $('<a href=#'+country.country+'>'+country.country+'</a>').appendTo(countries);
      }


      $('#country').detach().html(countries).appendTo('.menu');

    })
    .fail(function(request, errorType, errorMessage) {
      console.log("error: " + errorType + " = " + errorMessage);
    })



  }

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
  //$('#country').on('click', 'a', this.setCountry);

}


$(document).ready(function() {

  getTime();

  var holidays = new Holidays();

  console.log(holidays.countryUrl);

  holidays.getCountries();

  holidays.setUrl('bad url');

  holidays.getCountries();

  console.log(holidays.countryUrl);


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
