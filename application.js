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
  function printCities(country) {
    // Store photo nodes for country.
    console.log(country)

    var countryPhoto = country.photo[0].image,
      countryPhotoTitle = country.photo[0].title,
      countryPhotoSrc = country.photo[0].src,
      countryName = country.country,
      cityList = $('.tour'),
      markUp =  cityList.html('');

    // Loop cities of selected country.
    for(var i in country.cities) {
      if(country.cities.hasOwnProperty(i)) {

        // Populate results into html output.
        markUp.append('<a href="#'+country.cities[i].name+'" class data-location="'+country.cities[i].name+'">'
          + country.cities[i].name + '</a>');
      }

    }

    // Print selected country elements 'title' 'src' and 'image'.
    $('<img class="bgimg" title="' + countryPhotoTitle + '" src="' + countryPhotoSrc + countryPhoto + '" />').prependTo(cityList);
    $('<h2 class="country">' + countryName + '</h2>').prependTo(cityList);

    // Display the result for the clicked item.
    markUp.append(markUp).fadeIn();
  };
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
          $('<li><a id='+i+' class="country" href=#'+data[i].country+'>'+data[i].country+'</a></li>').appendTo(countryMenu);
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
    var id = $(this).attr('id');

    printCities(countryData[id]);
    // console.log(countryName + ': ' + countryPhotoSrc + countryPhoto);
  };

  this.loadPhotosByCity = function() {
    printCities(countryData[id].cities);

    //  markUp.append('<a href="#'+country.cities[i].name+'" class data-location="'+country.cities[i].name+'">'
//    + '<div class="city">'
//    + '<h3 class="name">' + country.cities[i].name + '</h3>'
//    + '<p class="description">' + country.cities[i].description + '</p>'
//    + '<p class="price">'+ country.cities[i].symbol + country.cities[i].price + '</p>'
//    + '</div></a>');
  };


  this.hoverTourIn = function() {
    $(this).closest('a').addClass('highlight');
  };

  this.hoverTourOut = function() {
    $(this).closest('a').removeClass('highlight');
  };

  // Event handlers
  $('#country').on('click', '.country', this.loadCitiesByCountry);

//  $('.tour').on('click', '.city', function(event) {
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

