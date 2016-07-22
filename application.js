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
      var countryMenu = $('<ul id="country"></ul>');

      // Loop and add as 'li a' to ul#country.
      for(var i in data) {
        if(data.hasOwnProperty(i)) {
          $('<li><a id='+i+' href=#'+data[i].country+'>'+data[i].country+'</a></li>').appendTo(countryMenu);
        }
      }

      $('#country').detach().html(countryMenu).appendTo('.menu');
      $('h2.country').html(data[i].country).prepend('.tour');
    })

    // If Error, report.
    .fail(function(request, errorType, errorMessage) {
      console.log("Request by: " + request + " error: " + errorType + " = " + errorMessage);
    })
  };

  this.loadCitiesByCountry = function(e) {
    e.preventDefault();
    var id = $(this).attr('id'),
        cityList = $('.tour'),
        markUp =  cityList.html('');

    // Store photo nodes for country.
    var countryPhoto = countryData[id].photo[0].image,
        countryPhotoTitle = countryData[id].photo[0].title,
        countryPhotoSrc = countryData[id].photo[0].src,
        countryName = countryData[id].country;

    // Loop cities of selected country.
    for(var i in countryData[id].cities) {
      if(countryData[id].cities.hasOwnProperty(i)) {
        var cityName = countryData[id].cities[i].name,
            cityDesc = countryData[id].cities[i].description,
            cityPrice = countryData[id].cities[i].price,
            cityPriceSymbol = countryData[id].cities[i].symbol;

        // Populate results into html output.
        markUp.append('<a href="#'+cityName+'" class data-location="'+cityName+'">'
          + '<div class="city">'
          + '<h3 class="name">' + cityName + '</h3>'
          + '<p class="description">' + cityDesc + '</p>'
          + '<p class="price">'+ cityPriceSymbol + cityPrice + '</p>'
          + '</div></a>');
      }
    }
    // console.log(countryName + ': ' + countryPhotoSrc + countryPhoto);

    // Print selected country elements 'title' 'src' and 'image'.
    $('<img class="bgimg" title="' + countryPhotoTitle + '" src="' + countryPhotoSrc + countryPhoto + '" />').prependTo(cityList);
    $('<h2 class="country">' + countryName + '</h2>').prependTo(cityList);

    // Display the result for the clicked item.
    markUp.append(markUp).fadeIn();
  };

  //this.loadCityPhotos = function() {
  // Loop cities of selected country.
  //  for(i in countryData[id].cities) {
  //    var cityName = countryData[id].cities[i].images,

  //    console.log(cityName);
  //
  //    // Populate results into html output.
  //    markUp.append('<div class="cityDetails" data-location="' + cityName + '">'
  //      + '<h3 class="name">' + cityName + '</h3>'
  //      + '<p class="description">' + cityDesc + '</p></div>');
  //  }
  //}

  this.hoverTourIn = function() {
    $(this).closest('a').addClass('highlight');
  };

  this.hoverTourOut = function() {
    $(this).closest('a').removeClass('highlight');
  };

  // Event handlers
  $('#country').on('click', 'a', this.loadCitiesByCountry);

//  $('.tour').on('click', '.goo', function(event) {
//    console.log($(this));
//    event.preventDefault();
//  });
  //$('').on('', '', this.loadCityPhotos);

  $('.tour').on('mouseenter', 'a', this.hoverTourIn);
  $('.tour').on('mouseleave', 'a', this.hoverTourOut);
}
// End function Holidays();


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

