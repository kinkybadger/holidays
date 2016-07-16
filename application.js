/**
 * ------------------------------ Get some euro tours -------------------------------
 */

// global variable
function Holidays() {

  var countryData = [];

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

      countryData = data;

      console.log(data[0].country, status);

      var countries = $('<ul id="country"></ul>');

      for(i in data) {
        console.log(data[i].country);

        $('<li><a id='+i+' href=#'+data[i].country+'>'+data[i].country+'</a></li>').appendTo(countries);
      }


      $('#country').detach().html(countries).appendTo('.menu');

    })
    .fail(function(request, errorType, errorMessage) {
      console.log("error: " + errorType + " = " + errorMessage);
    })


  }

  // event handlers
  $('#country').on('click', 'a', function() {
    var id = $(this).attr('id');

    console.log(id);

   // console.log(countryData[id].cities);
    $('h2.country').html('');

    for(i in countryData[id].cities) {
      console.log(countryData[id].cities[i].name);
      console.log(countryData[id].cities[i].description);
      console.log(countryData[id].cities[i].price);

      $('h2.country').append(countryData[id].cities[i].name);
    }



  });


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
