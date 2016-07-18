/**
 * ------------------------------ Get some tours andy -------------------------------
 */

// global variable
function Holidays() {

  var countryData = [];

  this.countryUrl = '/assets/json/holidays.json';

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
        var countries = $('<ul id="country"></ul>');

        for(i in data) {
            $('<li><a id=' + i + ' href=#' + data[i].country + '>' + data[i].country + '</a></li>').appendTo(countries);
            $('<li>data: ' + data[i].country + '</li>').appendTo('#log');
        }

        $('#country').detach().html(countries).appendTo('.menu');

    })
    .fail(function(request, errorType, errorMessage) {
        console.log("error: " + errorType + " = " + errorMessage);
        $('<li>Fail: ' + errorType + '=' + errorMessage + '</li>').appendTo('#log');

    })


  }

  // event handlers when clicking on a city
  $('#country').on('click', 'a', function() {
    var id = $(this).attr('id');
    $('<li>Clicked a Country ID: ' + id + '</li>').appendTo('#log');
    $('h1').html('Country: ' + id);
     
    var htmlOut = '' ;

    $.each(countryData[id].cities, function(i, value) {
        for(x in value) {
         //console.log('name', x);
         //console.log('val='+value[x]);
         htmlOut = htmlOut + '<br />' + x + ' >> ' + value[x];
        }
    }); 
    
        // update the html
    $('#cities').html(htmlOut);
     $('.city').fadeIn();
        




  });
  
    function xxxhtmlList(name, data) {

        var list = [];
        var html = '';
        
        for(var index in data) { 
           if (data.hasOwnProperty(index)) {
               var attr = data[index];
               console.log('field =' + attr);
           }
        }
        return '<ul class="' + name + '"><label>' + name + '</label><li>' + list.join('</li><li>') + '</li></ul>';
    }


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
