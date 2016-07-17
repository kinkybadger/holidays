/**
 * ------------------------------ Get some Euro tours -------------------------------
 */
// Global variable
function Holidays() {

  var countryData = [];
  this.countryUrl = 'tours.json';

  // this.setUrl = function(url) {
  //   this.countryUrl = url;
  // };

  // Helpers.
  this.getCountries = function() {
    // Get the json.
    $.getJSON(this.countryUrl, function() {})
    // Retrieval.
    .done(function(data) {
      countryData = data;
      var countries = $('<ul id="country"></ul>');

      // loop and add as 'li a' to ul#country.
      for(i in data) {
        $('<li><a id='+i+' href=#'+data[i].country+'>'+data[i].country+'</a></li>').appendTo(countries);
      }

      $('#country').detach().html(countries).appendTo('.menu');
      $('h2.country').html(data[i].country).prepend('.tour');
    })
    // If Error, report.
    .fail(function(request, errorType, errorMessage) {
      console.log("Request by: " + request + " error: " + errorType + " = " + errorMessage);
    })
  };

  this.loadCitiesByCountry = function() {
    var id = $(this).attr('id'),
        cityList = $('.tour'),
        markUp =  cityList.html('');

    // Not pretty, but works!
    var countryPhoto = countryData[id].photo[0].image,
        countryPhotoTitle = countryData[id].photo[0].title,
        countryPhotoSrc = countryData[id].photo[0].src,
        countryName = countryData[id].country;

    for(i in countryData[id].cities) {

      var cityName = countryData[id].cities[i].name,
        cityDesc = countryData[id].cities[i].description,
        cityPrice = countryData[id].cities[i].price,
        cityPriceSymbol = countryData[id].cities[i].symbol;

      markUp.append('<div class="city" data-location="' + cityName + '">'
        + '<h3 class="name">' + cityName + '</h3>'
        + '<p class="description">' + cityDesc + '</p>'
        + '<p class="price">'+ cityPriceSymbol + cityPrice + '</p></div>');
    }

    console.log(countryName + ': ' + countryPhotoSrc + countryPhoto);

    $("<img title=" + countryPhotoTitle + " src=" + countryPhotoSrc + countryPhoto + " />").prependTo(cityList);
    $('<h2 class="country">' + countryName + '</h2>').prependTo(cityList);

    // Display the result for the clicked item.
    markUp.append(markUp).fadeIn();
  };

  //this.loadPhotosFromCity = function() {
  //
  //}

  // Event handlers
  $('#country').on('click', 'a', this.loadCitiesByCountry);

  // $('').on('', '', this.loadPhotosFromCity);

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

