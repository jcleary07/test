// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})


//function to get 
function getLocation()
{
    navigator.geolocation.getCurrentPosition(geoCallback, onError);
}

function geoCallback (position){
    var element = document.getElementById('gpslocation');
    element.innerHTML = 'Longitude: ' + position.coords.longitude + '<br>' +
                        'Latitude: ' + position.coords.latitude + '<br>' +
                        'Timestamp ' + position.timestamp + '<br>';
}

// onError callback
function onError (msg){ 
    console.log(msg);
}

function initMap() 
{
    var cct = {lat: 53.346, lng: -6.2588};
    var newloc = {lat: 53.3458, lng: -6.2575};
    var map = new google.maps.Map(document.getElementById('map'),
    { zoom: 4,
    center: cct
    }
    );
    
    var marker = new google.maps.Marker({
    position: cct, 
    map: map
    });
    
    var marker2 = new google.maps.Marker({
    position: newloc, 
    map: map
    });

}

function openCage()
{
    var http = new XMLHttpRequest();
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=53.346+-6.2588&key=b95ccb4da5784bfca72b01a6b2af690f';
    http.open("GET", url);
    http.send();

    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);

        console.log(responseJSON);

        var city = responseJSON.results[0].components.city;
        var country = responseJSON.results[0].components.country;
        var currency = responseJSON.results[0].annotations.currency.name;

        document.getElementById('opencage').innerHTML = "Country: " + country + "<br>City: " + city + "<br>Currency: " + currency;
    }
}

    