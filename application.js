/**
 * ------------------------------ Get some Euro tours -------------------------------
 */
// Global variable
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
    // Successful retrieval.
    .done(function(data, status) {
      countryData = data;
      var countries = $('<ul id="country"></ul>');
      // loop and add as li to ul#country.
      for(i in data) {
        $('<li><a id='+i+' href=#'+data[i].country+'>'+data[i].country+'</a></li>').appendTo(countries);
      }

      $('#country').detach().html(countries).appendTo('.menu');
      $('h2.country').html(data[0].country).prepend('.tour');
    })
    // Error report.
    .fail(function(request, errorType, errorMessage) {
      console.log("error: " + errorType + " = " + errorMessage);
    })
  }

  // Event handlers
  $('#country').on('click', 'a', function() {
    var id = $(this).attr('id');
    var markUp =  $('.tour').html('');
    for(i in countryData[id].cities) {
      markUp.append('<div class="city" data-location="' + countryData[id].cities[i].name + '">'
        + '<h3 class="name">' + countryData[id].cities[i].name + '</h3>'
        + '<p class="description">' + countryData[id].cities[i].description + '</p>'
        + '<p class="price">'+ countryData[id].cities[i].symbol + countryData[id].cities[i].price
        + '</p></div>');
    }
    // Not pretty, but works!
    $('<h2 class="country">'+ countryData[id].country + '</h2>').prependTo('.tour');
    // Display result for clicked item.
    markUp.append(markUp).fadeIn();
  });

}


$(document).ready(function() {

  var holidays = new Holidays();
  holidays.getCountries();

});


// -----------------------------------------------------------------------------
var currentTime = new Date($.now());

// Debug tool.
function logIt(text) {
  console.log(text);
}

// Date time.
function getTime() {
  $('#date').append(currentTime);
}
