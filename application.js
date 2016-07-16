/**
 * ------------------------------ View some tours -------------------------------
 */
function Holidays() {

  // Helpers
  this.getCountries = function() {
    // Get the json
    $.getJSON('tours.json')
      .done(function(data) {
        console.log(data);

        //var countries = $('<li></li>');

        //$('<a href=#'+country.country+' id='+index+'>'+country.country+'</a>').appendTo(countries);

      });

      //$('#country').detach().html(countries).appendTo('.menu');

    }

    //return this.countries;


  // Set the country object on click in new TakeTour() object.
//  this.setCountry = function(e, selected) {
//
//    e.preventDefault();
//
//    selected = $(this).attr('href');
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
