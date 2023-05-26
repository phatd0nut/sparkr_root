var smapiKey = "nxo3vzJa"; // SMAPI-nyckeln
var userLocation = null; //Deklarerar en variabel för användarens position och nollställer den varje gång sidan laddas
var userLocationLat; // Användarens latitud
var userLocationLng; // Användarens longitud
var googleMap; // Google maps kartan
var googleKey = "AIzaSyANvWghf0VuGtg3EQCXSu9NoxS0blD-3NE"; // Google Maps API nyckel
var marker; // Kartmarkör
var directionsService; // Variabel för vägbeskrivningar
var directionsRenderer; // Variabel som ritar ut vägbeskrivningar
var nrOfOptions; // Referens för antal genererade resultat från SMAPI
var initialNrOfOptions = 0; // Lagrar det initiala värdet av genererade resultat från SMAPI 
var currentOptionIndex; // Referens för det resultat som visas
var establishmentData; // Referens för SMAPI-payload data
var radiusValue; // Referens för utskrift av radius i HTML
var selectedRadius = 10; // Initialt värde på radius
var radiusDiv; // Referens för radius slidern
var generateBtn; // Referens för sök knappen
var scrollBtns; // Referens för scroll-knapparna
var searchFilters; // Referens för filtreringsalternativen
var changeFiltersBtn; //Referens för knappen som visar filtreringen
var nightlifeInfo; // Referens för resultatsrutan från SMAPI
var etaInfo; // Referens för estimerad ankomst


function init() {
    getUserLocation();
    generateBtn = document.getElementById("generateResultsNattliv");
    searchFilters = document.querySelectorAll(".searchFilters");
    changeFiltersBtn = document.getElementById("changeFilters");
    nightlifeInfo = document.getElementById("establishmentInfo");
    nightlifeInfo.style.display = "none";
    scrollBtns = document.getElementById("scrollBtns");
    scrollBtns.style.display = "none";
    changeFiltersBtn.style.display = "none";
    radiusDiv = document.getElementById("changeRadius");
    document.getElementById("directions-btn").style.display = "none"
    etaInfo = document.getElementById("eta");
    let nextOptionBtn = document.getElementById("nextOption").addEventListener("click", function () {
        nextOption();
        displayedOption();
    });
    let previousOptionBtn = document.getElementById("previousOption").addEventListener("click", function () {
        previousOption();
        displayedOption();
    });

    let radiusSlider = document.getElementById("radiusSlider");
    radiusValue = document.getElementById("radiusValue");
    radiusSlider.addEventListener("input", function () {
        selectedRadius = radiusSlider.value;
        radiusValue.innerHTML = selectedRadius + " km";
    })

    generateBtn.addEventListener("click", function () {
        requestSmapi();
        generateBtn.style.display = "none";
        radiusDiv.style.display = "none";
        scrollBtns.style.display = "block";
        changeFiltersBtn.style.display = "block";
        changeFiltersBtn.addEventListener("click", showFilters);
    });

    let backArrow = document.querySelector(".left-arrow");
    backArrow.addEventListener('touchstart', function () {
        this.style.transform = 'scale(1.15)';
    });

    backArrow.addEventListener('touchend', function () {
        this.style.transform = 'none';
    });

}

window.addEventListener("load", init);

// Funktionen gjord med hjälp av ChatGPT
function getUserLocation() { // Funktion för att få användarens geografiska position
    if (navigator.geolocation) { // Kontrollerar om webbläsaren stödjer geolocation-API:t
        navigator.geolocation.getCurrentPosition(function (position) { //Om webbläsaren stödjer API:t sparar den den geografiska platsen i userLocation
            userLocation = position.coords; // Användarens koordinater
            userLocationLat = position.coords.latitude;
            userLocationLng = position.coords.longitude;
            //  userLocationLat = "56.878017011624685";
            //  userLocationLng = "14.807412906905228";
        }, function (error) { // Funktion som anropas om det har blivit ett fel i hämtningen av geo-platsen
            console.log(error);
        });
    } else {
        console.log("Platstjänster stöds inte av din webbläsare."); // Om webbläsaren inte stödjer geolocation api:t
    }
}

function requestSmapi() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://smapi.lnu.se/api?api_key=" + smapiKey + "&controller=establishment&descriptions=nattklubb&method=getfromlatlng&lat=" + userLocationLat + "&lng=" + userLocationLng + "&radius=" + selectedRadius + "&debug=true", true)
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState == 4)
            if (request.status == 200) getData(request.responseText);
            else nightlifeInfo.innerHTML = "<p>Den begärda resursen hittades inte.<p>"
    };
}

function getData(responseText) {
    nightlifeData = JSON.parse(responseText);
    currentOptionIndex = 1;

    if (nightlifeData.payload == null || nightlifeData.payload.length === 0) {
        alert("Det fanns inga nattklubbar i din närhet tyvärr.");
        return;
    }
    else {
        nightlifeData.payload.sort(() => Math.random() - 0.5);
        nightlifeInfo.style.display = "block";
        nrOfOptions = nightlifeData.payload.length;
        initialNrOfOptions = nrOfOptions;
        displayedOption();
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

function showFilters() {
    searchFilters.forEach(function (searchFilters) {
        searchFilters.style.display = "block";
        radiusDiv.style.display = "block";
        generateBtn.style.display = "block";
        scrollBtns.style.display = "none";
        nightlifeInfo.style.display = "none";
    });
    changeFiltersBtn.style.display = "none";
}

function displayedOption() {
    document.getElementById("indexCounter").innerHTML = currentOptionIndex + " / " + initialNrOfOptions;
    let selectedEntry = nightlifeData.payload[currentOptionIndex - 1];

    let lat = selectedEntry.lat;
    let lng = selectedEntry.lng;
    requestMetWeather(lat, lng);
    let estCity = selectedEntry.city;
    let estName = selectedEntry.name;
    let estDescription = selectedEntry.description;
    let estTel = selectedEntry.phone_number;
    let estAddress = selectedEntry.address;
    let estPriceRange = selectedEntry.price_range;
    let estWebsite = selectedEntry.website;
    let estRating = Number(selectedEntry.rating).toFixed(1);
    let estAbstract = selectedEntry.abstract;

    // Utskrift av information i HTML
    document.getElementById("establishmentName").innerHTML = estName;
    document.getElementById("establishmentDescription").innerHTML = estDescription;
    let clickableTelNr = document.createElement("a");
    clickableTelNr.setAttribute("href", "tel: " + estTel);
    let telIcon = document.createElement("img");
    telIcon.setAttribute("src", "../img/phone.png");
    clickableTelNr.appendChild(telIcon);
    // clickableTelNr.textContent = estTel;
    let clickableWWW = document.createElement("a");
    clickableWWW.setAttribute("href", estWebsite);
    let linkIcon = document.createElement("img");
    linkIcon.setAttribute("src", "../img/otherclick.png")
    clickableWWW.appendChild(linkIcon);
    // clickableWWW.textContent = estWebsite;
    document.getElementById("establishmentWebsite").innerHTML = "";
    document.getElementById("establishmentWebsite").appendChild(clickableWWW);
    document.getElementById("establishmentTel").innerHTML = "";
    document.getElementById("establishmentTel").appendChild(clickableTelNr);
    document.getElementById("establishmentCity").innerHTML = "Stad: " + estCity;
    document.getElementById("establishmentAddress").innerHTML = "Adress: " + estAddress;
    document.getElementById("establishmentPriceRng").innerHTML = "Pris: " + estPriceRange + " kr";
    document.getElementById("establishmentRating").innerHTML = "Omdöme: " + parseFloat(estRating) + " / 5";
    if (selectedEntry.abstract) {
        document.getElementById("establishmentAbstract").innerHTML = '" ' + estAbstract + ' "';
    }
    else {
        document.getElementById("establishmentAbstract").innerHTML = "";
    }

    displayMap(lat, lng);
    document.getElementById("directions-btn").style.display = "block";
    document.getElementById("directions-btn").addEventListener("click", function () {
        getDirections(userLocationLat, userLocationLng);
    });
}


function nextOption() {
    currentOptionIndex++;
    if (currentOptionIndex > nightlifeData.payload.length) {
        currentOptionIndex = 1; // Gå tillbaka till första valet
    }
    displayedOption();
    etaInfo.classList.remove("visible");
    etaInfo.classList.add("modified");
    etaInfo.innerHTML = "";
}

function previousOption() {
    if (currentOptionIndex === 1) {
        currentOptionIndex = nightlifeData.payload.length; // Gå tillbaka till sista valet
    } else {
        currentOptionIndex--;
    }
    displayedOption();
    etaInfo.classList.remove("visible");
    etaInfo.classList.add("modified");
    etaInfo.innerHTML = "";
}

// Funktion som hämtar väderdata från MET API
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