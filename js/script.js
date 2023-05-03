var smapiKey = "nxo3vzJa"; // SMAPI-nyckeln
var testDiv; // Test div för att få ut JSON data från SMAPI
var establishmentOpt; // Dropdown-meny för etablissemang
var userLocation = null; //Deklarerar en variabel för användarens position och nollställer den varje gång sidan laddas
var userLocationLat; // Användarens latitud
var userLocationLng; // Användarens longitud
var map; // Google maps kartan
var googleKey = "AIzaSyANvWghf0VuGtg3EQCXSu9NoxS0blD-3NE"; // Google Maps API nyckel
var marker; // Kartmarkör

function init() {
    getUserLocation();
    testDiv = document.getElementById("smapiLoad");
    establishmentOpt = document.getElementById("establishmentOpt");
    establishmentOpt.addEventListener("change", requestSmapi); // Reagerar på användarens val i listan och anropar ny data från API:t efter val
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
    let selectedEstablishment = establishmentOpt.options[establishmentOpt.selectedIndex].value;
    let request = new XMLHttpRequest();
    request.open("GET", "https://smapi.lnu.se/api?api_key=" + smapiKey + "&controller=establishment&method=getall&debug=true&method=getfromlatlng&lat=" + userLocationLat + "&lng=" + userLocationLng + "&descriptions=" + selectedEstablishment, true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState == 4)
            if (request.status == 200) getData(request.responseText);
            else testDiv.innerHTML = "Den begärda resursen hittades inte."
    };
}

function getData(responseText) {
    let establishmentData = JSON.parse(responseText); // Parsear JSON-datan från SMAPI
    let establishmentList = document.createElement("ul");
    console.log(responseText);

    for (let i = 0; establishmentData.payload && i < establishmentData.payload.length; i++) {
        let establishment = establishmentData.payload[i];
        let lat = establishment.lat;
        let lng = establishment.lng;
        let establishmentName = establishment.name;
        let establishmentAddress = establishment.address;
        let establishmentZipCode = establishment.zip_code;
        let establishmentPriceRng = establishment.price_range;
        let establishmentTelNr = establishment.phone_number;
        let establishmentRating = Number(establishment.rating).toFixed(2);
        let clickableTelNr = document.createElement("a");
        clickableTelNr.setAttribute("href", "tel: " + establishmentTelNr);
        clickableTelNr.textContent = establishmentTelNr;
        let establishmentWWW = establishment.website;
        let clickableWWW = document.createElement("a");
        clickableWWW.setAttribute("href", establishmentWWW);
        let icon = document.createElement("img");
        icon.setAttribute("src", "../img/click.png");
        icon.setAttribute("alt", establishmentWWW);
        clickableWWW.appendChild(icon);
        let establishmentCity = establishment.city;
        let fullAddress = establishmentAddress + ", " + establishmentZipCode + " " + establishmentCity;
        let establishmentListItem = document.createElement("li");
        establishmentListItem.textContent = establishmentName;
        establishmentListItem.appendChild(clickableWWW);
        icon.style.display = "none";
        establishmentListItem.addEventListener("click", function () {

            // Visa mer detaljerad information när man klickat på alternativen
            document.querySelector("#establishment-name").textContent = establishmentName;
            document.querySelector("#establishment-address").textContent = fullAddress;
            document.querySelector("#establishment-priceRange").textContent = establishmentPriceRng;
            document.querySelector("#establishment-rating").textContent = "Betyg: " + establishmentRating + " / 5";
            document.querySelector("#establishment-telNr").innerHTML = "";
            document.querySelector("#establishment-telNr").appendChild(clickableTelNr);
            document.querySelector("#establishment-website").innerHTML = "";
            document.querySelector("#establishment-website").appendChild(clickableWWW);
            document.querySelector("#moreInfo").style.display = "block";
            icon.style.display = "block";
            icon.style.width = "50px";
            icon.style.height = "50px";
            displayMap(lat, lng);
            document.getElementById("directions-btn").addEventListener("click", getDirections);

        });

        let backToListBtn = document.querySelector("#back-to-list");
        backToListBtn.addEventListener("click", function () {
            document.querySelector("#moreInfo").style.display = "none";
        });

        establishmentList.appendChild(establishmentListItem);
    }

    let currentList = testDiv.querySelector("ul"); // Variabel som kontrollerar om det existerar en ul-lista i testDiv elementet
    if (currentList) {
        testDiv.replaceChild(establishmentList, currentList); // Om det finns en föregående lista ersätter denna rad den listan med en ny
    } else {
        testDiv.appendChild(establishmentList); // Om det inte finns en lista sedan tidigare, appendar listan till testDiv elementet
    }

}

// FUNGERAR INTE SOM DET SKA

function displayMap(lat, lng) {
    // Skapa nytt kartobjekt
    console.log(lat, lng);
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: parseFloat(lat), lng: parseFloat(lng)},
        zoom: 15,
        styles: [
            {featureType: "poi", stylers: [{visibility: "off"}]},  // No points of interest.
            {featureType: "transit.station", stylers: [{visibility: "off"}]}  // No bus stations, etc.
        ]
    });
        // Lägger till markör
        marker = new google.maps.Marker({
            position: {lat: parseFloat(lat), lng: parseFloat(lng)},
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
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            directionsRenderer.setMap(map);
        }
    });
} 