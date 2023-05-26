var smapiKey = "nxo3vzJa"; // SMAPI-nyckeln
var userLocation = null; //Deklarerar en variabel för användarens position och nollställer den varje gång sidan laddas
var userLocationLat; // Användarens latitud
var userLocationLng; // Användarens longitud
var googleMap; // Google maps kartan
var googleKey = "AIzaSyANvWghf0VuGtg3EQCXSu9NoxS0blD-3NE"; // Google Maps API nyckel
var marker; // Kartmarkör
var directionsService; // Variabel för vägbeskrivningar
var directionsRenderer; // Variabel som ritar ut vägbeskrivningar
var frontPageDiv; // Referens för innehållet på förstasidan
var randomInfo; // Referens för slumpa åt mig resultatet
var etaInfo; // Referens för estimerad ankomst

function init() {
  let randomBtn = document.getElementById("randomBtn").addEventListener("click", getUserLocation);
  frontPageDiv = document.getElementById("frontPageDiv");
  randomInfo = document.getElementById("randomInfo");
  randomInfo.style.display = "none";
  etaInfo = document.getElementById("eta");
}

window.addEventListener("load", init);

function getUserLocation() { // Funktion för att få användarens geografiska position
  if (navigator.geolocation) { // Kontrollerar om webbläsaren stödjer geolocation-API:t
    navigator.geolocation.getCurrentPosition(function (position) { //Om webbläsaren stödjer API:t sparar den den geografiska platsen i userLocation
      userLocation = position.coords; // Användarens koordinater
      userLocationLat = position.coords.latitude;
      userLocationLng = position.coords.longitude;
      //  userLocationLat = "56.878017011624685";
      //  userLocationLng = "14.807412906905228";
      requestSmapi();
    }, function (error) { // Funktion som anropas om det har blivit ett fel i hämtningen av geo-platsen
      console.log(error);
    });
  } else {
    console.log("Platstjänster stöds inte av din webbläsare."); // Om webbläsaren inte stödjer geolocation api:t
  }

  var scalingButtons = document.querySelectorAll(".choice1");

  scalingButtons.forEach(function (button) {
    // Stänger av att man kan markera för flera olika webbläsare
    button.style.userSelect = 'none';
    button.style.webkitUserSelect = 'none';
    button.style.MozUserSelect = 'none';

    button.addEventListener('touchstart', function () {
      this.style.transform = 'scale(1.15)';
    });

    button.addEventListener('touchend', function () {
      this.style.transform = 'none';
    });
  });

}

function requestSmapi() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://smapi.lnu.se/api?api_key=" + smapiKey + "&controller=establishment&method=getfromlatlng&lat=" + userLocationLat + "&lng=" + userLocationLng + "&radius=100&debug=true", true);
  request.send(null);
  request.onreadystatechange = function () {
    if (request.readyState == 4)
      if (request.status == 200) getData(request.responseText);
      else randomInfo.innerHTML = "<p>Den begärda resursen hittades inte.</p>"
  };
}

function getData(responseText) {
  let randomData = JSON.parse(responseText);
  if (randomData.payload == null || randomData.payload.length === 0) {
    alert("Det hittades inga resultat i din närhet.");
    return;
  }

  else {
    frontPageDiv.style.display = "none";
    randomData.payload.sort(() => Math.random() - 0.5);
    randomInfo.style.display = "block";

    let lat = randomData.payload[0].lat;
    let lng = randomData.payload[0].lng;
    requestMetWeather(lat, lng);
    let randomCity = randomData.payload[0].city;
    let randomName = randomData.payload[0].name;
    let randomDescription = randomData.payload[0].description;
    let randomTel = randomData.payload[0].phone_number;
    let randomAddress = randomData.payload[0].address;
    let randomPriceRange = randomData.payload[0].price_range;
    let randomWebsite = randomData.payload[0].website;
    let randomRating = Number(randomData.payload[0].rating).toFixed(1);
    let randomAbstract = randomData.payload[0].abstract;

    // Utskrift av information i HTML
    document.getElementById("randomName").innerHTML = randomName;
    document.getElementById("randomDescription").innerHTML = randomDescription;
    let clickableTelNr = document.createElement("a");
    clickableTelNr.setAttribute("href", "tel: " + randomTel);
    if (!randomData.phone_number) {
      // document.getElementById("randomTel").innerHTML = "Telefonnummer: Inget telefonnummer hittades."
      document.getElementById("randomTel").innerHTML = "";
      document.getElementById("randomTel").appendChild(clickableTelNr);
      let telIcon1 = document.createElement("img");
      telIcon1.setAttribute("src", "../img/phone3.png");
      clickableTelNr.appendChild(telIcon1);
      clickableTelNr.style.pointerEvents = "none";
    } else {
      document.getElementById("randomTel").innerHTML = "";
      document.getElementById("randomTel").appendChild(clickableTelNr);
      let telIcon2 = document.createElement("img");
      telIcon2.setAttribute("src", "../img/phone.png");
      clickableTelNr.appendChild(telIcon2);
    }
    if (randomData.outdoors == "Y") {
      document.getElementById("randomOutdoors").innerHTML = "Utomhusaktivitet: Ja"
    }
    else {
      document.getElementById("randomOutdoors").innerHTML = "Utomhusaktivitet: Nej"
    }
    let clickableWWW = document.createElement("a");
    clickableWWW.setAttribute("href", randomWebsite);
    let linkIcon = document.createElement("img");
    linkIcon.setAttribute("src", "../img/otherclick.png")
    clickableWWW.appendChild(linkIcon);
    // clickableWWW.textContent = activitiesDataWebsite;
    document.getElementById("randomWebsite").innerHTML = "";
    document.getElementById("randomWebsite").appendChild(clickableWWW);
    document.getElementById("randomCity").innerHTML = "Stad: " + randomCity;
    document.getElementById("randomAddress").innerHTML = "Adress:" + randomAddress;
    document.getElementById("randomPriceRng").innerHTML = "Pris: " + randomPriceRange;
    document.getElementById("randomRating").innerHTML = "Omdöme:" + randomRating + " / 5";
    document.getElementById("randomAddress").innerHTML = "Adress: " + randomAddress;
    document.getElementById("randomPriceRng").innerHTML = "Pris: " + randomPriceRange + " kr";
    document.getElementById("randomRating").innerHTML = "Omdöme: " + randomRating + " / 5";
    if (randomData.payload[0].abstract && randomData.payload[0].abstract.trim().length > 0) {
      document.getElementById("randomAbstract").innerHTML = '" ' + randomAbstract + ' "';
    }
    else {
      document.getElementById("randomAbstract").innerHTML = "";
    }

    displayMap(lat, lng);
    document.getElementById("directions-btn").addEventListener("click", function () {
      getDirections(userLocationLat, userLocationLng);
    });
  }
}

function displayMap(lat, lng) {
  // Skapa nytt kartobjekt
  map = new google.maps.Map(document.getElementById("googleMap"), {
    center: { lat: parseFloat(lat), lng: parseFloat(lng) },
    zoom: 15,
    styles: [
      { featureType: "poi", stylers: [{ visibility: "off" }] },  // No points of interest.
      { featureType: "transit.station", stylers: [{ visibility: "off" }] }  // No bus stations, etc.
    ],
    mapTypeControl: false
  });
  // Lägger till markör
  marker = new google.maps.Marker({
    position: { lat: parseFloat(lat), lng: parseFloat(lng) },
    map: map
  });

  // Skapar ny instans av vägbeskrivningar och en instans som renderar vägbeskrivningen
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    map: map
  });

}

function getDirections(userLocationLat, userLocationLng) {
  let myLocation = new google.maps.LatLng(parseFloat(userLocationLat), parseFloat(userLocationLng));
  let destination = new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng());

  let requestDirections = {
    origin: myLocation,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING
  };

  let drivingTime, bikingTime, walkingTime;

  directionsService.route(requestDirections, function (result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // Tar bort den tidigare markören (så att det inte blir dubbla markörer på destinationen)
      if (marker) {
        marker.setMap(null);
      }

      // Visar vägbeskrivningarna på kartan
      directionsRenderer.setDirections(result);
      directionsRenderer.setMap(map);

      // Estimerad ankomst för cykel och gång
      drivingTime = result.routes[0].legs[0].duration.text;

      requestDirections.travelMode = google.maps.TravelMode.WALKING;
      directionsService.route(requestDirections, function (walkingResult, walkingStatus) {
        if (walkingStatus == google.maps.DirectionsStatus.OK) {
          walkingTime = walkingResult.routes[0].legs[0].duration.text;

          requestDirections.travelMode = google.maps.TravelMode.BICYCLING;
          directionsService.route(requestDirections, function (bikingResult, bikingStatus) {
            if (bikingStatus == google.maps.DirectionsStatus.OK) {
              bikingTime = bikingResult.routes[0].legs[0].duration.text;

            }
            // Skriv ut uppskattad tid för ankomst
            etaInfo.innerHTML = "";

            let carEta = '<img src="../img/carEta.png" class="etaIcons" alt="Uppskattad ankomst: Bil"><span class="etaText">' + drivingTime + '</span>';
            let bikeEta = '<img src="../img/bikeEta.png" class="etaIcons" alt="Uppskattad ankomst: Cykel"><span class="etaText">' + bikingTime + '</span>';
            let walkEta = '<img src="../img/walkingEta.png" id="walkingIcon" class="etaIcons" alt="Uppskattad ankomst: Promenera"><span class="etaText">' + walkingTime + '</span>';

            etaContainer = document.createElement("div");
            etaContainer.classList.add("etaIconsContainer");
            etaContainer.innerHTML = carEta + bikeEta + walkEta;
            etaInfo.appendChild(etaContainer);
            etaInfo.classList.remove("modified");
            etaInfo.classList.add("visible");
          });
        }
      });
    }
  });
}

function requestMetWeather(lat, lng) {
  let request = new XMLHttpRequest();
  request.open("GET", "https://api.met.no/weatherapi/locationforecast/2.0/classic?lat=" + lat + "&lon=" + lng, true);
  request.send(null);
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      if (request.status == 200) {
        getWeather(request.responseXML);
      } else {
        return;
      }
    }
  };
}

function getWeather(responseXML) {
  // Hitta temperaturinformationen i XML-filen från METs API
  let temperatureElement = responseXML.getElementsByTagName("temperature")[0];

  if (temperatureElement) {

    // Få tag i temperaturvärden
    let temperatureValue = temperatureElement.getAttribute("value");

    // Skriv ut informationen
    document.getElementById("weatherInfo").innerHTML = temperatureValue + " °C";
  } else {
    document.getElementById("weatherInfo").innerHTML = "<p>Ingen väderdata hittades.</p>"
  }
}