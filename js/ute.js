var smapiKey = "nxo3vzJa"; // SMAPI-nyckeln
var userLocation = null; //Deklarerar en variabel för användarens position och nollställer den varje gång sidan laddas
var userLocationLat; // Användarens latitud
var userLocationLng; // Användarens longitud
var googleMap; // Google maps kartan
var googleKey = "AIzaSyANvWghf0VuGtg3EQCXSu9NoxS0blD-3NE"; // Google Maps API nyckel
var marker; // Kartmarkör

function init() {
    establishmentInfo = document.getElementById("establishmentInfo");
    getUserLocation();
    requestSmapi();
}

window.addEventListener("load", init);

function getUserLocation() { // Funktion för att få användarens geografiska position
    if (navigator.geolocation) { // Kontrollerar om webbläsaren stödjer geolocation-API:t
        navigator.geolocation.getCurrentPosition(function (position) { //Om webbläsaren stödjer API:t sparar den den geografiska platsen i userLocation
            userLocation = position.coords; // Användarens koordinater
            userLocationLat = position.coords.latitude;
            userLocationLng = position.coords.longitude;
            requestSmapi();
        }, function (error) { // Funktion som anropas om det har blivit ett fel i hämtningen av geo-platsen
            console.log(error);
        });
    } else {
        console.log("Platstjänster stöds inte av din webbläsare."); // Om webbläsaren inte stödjer geolocation api:t
    }
}




function requestSmapi() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://smapi.lnu.se/api?api_key=" + smapiKey + "&controller=establishment&descriptions=nattklubb&method=getfromlatlng&lat=" + userLocationLat + "&lng=" + userLocationLng + "&debug=true", true)
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState == 4)
            if (request.status == 200) getData(request.responseText);
            else establishmentInfo.innerHTML = "Den begärda resursen hittades inte."
    };
}

function getData(responseText) {
    let establishmentData = JSON.parse(responseText);
  
    if (establishmentData.payload != null) {
      let establishments = establishmentData.payload;
      // Shuffle the establishments array
      establishments.sort(() => Math.random() - 0.5); // Slumpar nattklubb efter innehåll i payload
  
      let establishment = establishments[0];
      let lat = establishment.lat;
      let lng = establishment.lng;
      let estName = establishment.name;
      let estDescription = establishment.description;
      let estTel = establishment.phone_number;
      let estAddress = establishment.address;
      let estPriceRange = establishment.price_range;
      let estWebsite = establishment.website;
      let estRating = Number(establishment.rating).toFixed(2);
  
      // Utskrift av information i HTML
      document.getElementById("establishmentName").innerHTML = estName;
      document.getElementById("establishmentDescription").innerHTML = estDescription;
      let clickableTelNr = document.createElement("a");
      clickableTelNr.setAttribute("href", "tel: " + estTel);
      clickableTelNr.textContent = estTel;
      let clickableWWW = document.createElement("a");
      clickableWWW.setAttribute("href", estWebsite);
      let icon = document.createElement("img");
      icon.setAttribute("src", "../img/click.png");
      icon.setAttribute("alt", estWebsite);
      clickableWWW.appendChild(icon);
      document.querySelector("#establishmentWebsite").appendChild(clickableWWW);
      document.querySelector("#establishmentTel").appendChild(clickableTelNr);
      document.getElementById("establishmentAddress").innerHTML = estAddress;
      document.getElementById("establishmentPriceRng").innerHTML = estPriceRange;
      document.getElementById("establishmentRating").innerHTML = estRating + " / 5";
  
      displayMap(lat, lng);
      document.getElementById("directions-btn").addEventListener("click", getDirections);
    }
  }
  

function displayMap(lat, lng) {
    // Skapa nytt kartobjekt
    console.log(lat, lng);

    map = new google.maps.Map(document.getElementById("googleMap"), {
        center: { lat: parseFloat(lat), lng: parseFloat(lng) },
        zoom: 15,
        styles: [
            { featureType: "poi", stylers: [{ visibility: "off" }] },  // No points of interest.
            { featureType: "transit.station", stylers: [{ visibility: "off" }] }  // No bus stations, etc.
        ]
    });
    // Lägger till markör
    marker = new google.maps.Marker({
        position: { lat: parseFloat(lat), lng: parseFloat(lng) },
        map: map
    });

}

function getDirections() {
    let origin = new google.maps.LatLng(userLocationLat, userLocationLng);
    let destination = new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng());
    let request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            directionsRenderer.setMap(map);
        }
    });
} 