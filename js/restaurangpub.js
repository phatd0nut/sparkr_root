var smapiKey = "nxo3vzJa"; // SMAPI-nyckeln
var userLocation = null; //Deklarerar en variabel för användarens position och nollställer den varje gång sidan laddas
var userLocationLat; // Användarens latitud
var userLocationLng; // Användarens longitud
var googleMap; // Google maps kartan
var googleKey = "AIzaSyANvWghf0VuGtg3EQCXSu9NoxS0blD-3NE"; // Google Maps API nyckel
var marker; // Kartmarkör
var directionsService; // Variabel för vägbeskrivningar
var directionsRenderer; // Variabel som ritar ut vägbeskrivningar
var foodType; // Variabel för val av mat
var foodPrice; // Variabel för prisklass
var restaurangPubInfo; // Referens för utskrift av SMAPI-information
var searchFilters; // Referens för filtreringsalternativen
var changeFiltersBtn; //Referens för knappen som visar filtreringen
var displayedId = []; // Referens för ID på alternativ som visas
var nrOfOptions; // Referens för antal genererade resultat från SMAPI
var initialNrOfOptions = 0; // Lagrar det initiala värdet av genererade resultat från SMAPI 
var currentOptionIndex; // Referens för det resultat som visas
var restaurangPubData; // Referens för SMAPI-payload data
var radiusValue; // Referens för utskrift av radius i HTML
var selectedRadius = 10; // Initialt värde på radius
var radiusDiv; // Referens för radius slidern
var generateBtn; // Referens för sök knappen
var scrollBtns; // Referens för scroll-knapparna


function init() {
    getUserLocation();
    changeFiltersBtn = document.getElementById("changeFilters");
    changeFiltersBtn.style.display = "none";
    restaurangPubInfo = document.getElementById("restaurangPubInfo");
    restaurangPubInfo.style.display = "none";
    searchFilters = document.querySelectorAll(".searchFilters");
    scrollBtns = document.getElementById("scrollBtns");
    scrollBtns.style.display = "none";
    document.getElementById("directions-btn").style.display = "none"
    let nextOptionBtn = document.getElementById("nextOption").addEventListener("click", function () {
        nextOption();
        displayedOption();
    });
    let previousOptionBtn = document.getElementById("previousOption").addEventListener("click", function () {
        previousOption();
        displayedOption();
    });
    radiusDiv = document.getElementById("changeRadius");

    let radiusSlider = document.getElementById("radiusSlider");
    radiusValue = document.getElementById("radiusValue");
    radiusSlider.addEventListener("input", function () {
        selectedRadius = radiusSlider.value;
        radiusValue.innerHTML = selectedRadius + " km";
    })
    let foodTypeInput = document.querySelectorAll(".foodOpt")
    let foodPriceInput = document.querySelectorAll(".priceOpt");
    generateBtn = document.querySelector("#generateResults");
    foodType = "Pizzeria";
    foodPrice = "0-25";

    for (let i = 0; i < foodTypeInput.length; i++) {
        foodTypeInput[i].addEventListener("change", (event) => {
            foodType = event.target.value;
        });

    }

    for (let i = 0; i < foodPriceInput.length; i++) {
        foodPriceInput[i].addEventListener("change", (event) => {
            foodPrice = event.target.value;
        });
    }

    generateBtn.addEventListener("click", function () {
        generateBtn.style.display = "none";
        radiusDiv.style.display = "none";
        scrollBtns.style.display = "block";
        searchFilters.forEach(function (searchFilters) {
            searchFilters.style.display = "none";
        });
        changeFiltersBtn.style.display = "block";
        changeFiltersBtn.addEventListener("click", showFilters);
        // Om användaren inte ändrar valen skickas de förvalda värdena till SMAPI
        if (foodType === "Pizzeria" && foodPrice === "0-25") {
            requestSmapi(foodType, foodPrice);
            getUserLocation();
        } else {
            // Om valen ändras, uppdatera anropet till SMAPI
            requestSmapi(foodType, foodPrice);
            getUserLocation();
        }
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

function requestSmapi(foodType, foodPrice) {
    let request = new XMLHttpRequest();
    request.open("GET", "https://smapi.lnu.se/api?api_key=" + smapiKey + "&controller=establishment&descriptions=" + foodType + "&method=getfromlatlng&lat=" + userLocationLat + "&lng=" + userLocationLng + "&price_ranges=" + foodPrice + "&radius=" + selectedRadius + "&debug=true", true)
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState == 4)
            if (request.status == 200) getData(request.responseText);
            else restaurangPubInfo.innerHTML = "<p>Den begärda resursen hittades inte.</p>"
    };
}

function getData(responseText) {
    restaurangPubData = JSON.parse(responseText);
    currentOptionIndex = 1;
    if (restaurangPubData.payload == null || restaurangPubData.payload.length === 0) {
        alert("Det fanns inga alternativ med dina val i närheten.");
        return;
    }

    else {
        restaurangPubData.payload.sort(() => Math.random() - 0.5);
        nrOfOptions = restaurangPubData.payload.length;
        initialNrOfOptions = nrOfOptions;
        displayedOption();
        restaurangPubInfo.style.display = "block";
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

            // Retrieve ETA for different travel modes
            drivingTime = result.routes[0].legs[0].duration.text;

            requestDirections.travelMode = google.maps.TravelMode.WALKING;
            directionsService.route(requestDirections, function (walkingResult, walkingStatus) {
                if (walkingStatus == google.maps.DirectionsStatus.OK) {
                    walkingTime = walkingResult.routes[0].legs[0].duration.text;

                    requestDirections.travelMode = google.maps.TravelMode.BICYCLING;
                    directionsService.route(requestDirections, function (bikingResult, bikingStatus) {
                        if (bikingStatus == google.maps.DirectionsStatus.OK) {
                            bikingTime = bikingResult.routes[0].legs[0].duration.text;

                            // Skriv ut uppskattad tid för åtkomst


                        }

                        let carEta = '<img src="../img/carEta.png" class="etaIcons" alt="Uppskattad ankomst: Bil"><span class="etaText">' + drivingTime + '</span>';
                        let bikeEta = '<img src="../img/bikeEta.png" class="etaIcons" alt="Uppskattad ankomst: Cykel"><span class="etaText">' + bikingTime + '</span>';
                        let walkEta = '<img src="../img/walkingEta.png" id="walkingIcon" class="etaIcons" alt="Uppskattad ankomst: Promenera"><span class="etaText">' + walkingTime + '</span>';

                        let etaContainer = document.createElement("div");
                        etaContainer.classList.add("etaIconsContainer");
                        etaContainer.innerHTML = carEta + bikeEta + walkEta;

                        document.getElementById("eta").appendChild(etaContainer);


                    });
                }
            });
        }
    });
}


function showFilters() {
    searchFilters.forEach(function (filter) {
        filter.style.display = "block";
        radiusDiv.style.display = "block";
        generateBtn.style.display = "block";
        scrollBtns.style.display = "none";
        restaurangPubInfo.style.display = "none";
    });
    changeFiltersBtn.style.display = "none";
}

function displayedOption() {
    document.getElementById("indexCounter").innerHTML = currentOptionIndex + " / " + initialNrOfOptions;
    let selectedEntry = restaurangPubData.payload[currentOptionIndex - 1];

    let lat = selectedEntry.lat;
    let lng = selectedEntry.lng;
    let restaurangPubAbstract = selectedEntry.abstract;
    let restaurangPubCity = selectedEntry.city;
    let restaurangPubName = selectedEntry.name;
    let restaurangPubDescription = selectedEntry.description;
    let restaurangPubTel = selectedEntry.phone_number;
    let restaurangPubAddress = selectedEntry.address;
    let restaurangPubPriceRange = selectedEntry.price_range;
    let restaurangPubWebsite = selectedEntry.website;
    let restaurangPubRating = Number(selectedEntry.rating).toFixed(1);

    // Utskrift av information i HTML
    document.getElementById("restaurangPubName").innerHTML = restaurangPubName;
    document.getElementById("restaurangPubDescription").innerHTML = restaurangPubDescription;
    let clickableTelNr = document.createElement("a");
    clickableTelNr.setAttribute("href", "tel: " + restaurangPubTel);
    if (!selectedEntry.phone_number) {
        // document.getElementById("restaurangPubTel").innerHTML = "Telefonnummer: Inget telefonnummer hittades."
        document.getElementById("restaurangPubTel").innerHTML = "";
        document.getElementById("restaurangPubTel").appendChild(clickableTelNr);
        let telIcon1 = document.createElement("img");
        telIcon1.setAttribute("src", "../img/phone3.png");
        clickableTelNr.appendChild(telIcon1);
        clickableTelNr.style.pointerEvents = "none";
    } else {
        document.getElementById("restaurangPubTel").innerHTML = "";
        document.getElementById("restaurangPubTel").appendChild(clickableTelNr);
        let telIcon2 = document.createElement("img");
        telIcon2.setAttribute("src", "../img/phone.png");
        clickableTelNr.appendChild(telIcon2);
    }

    let clickableWWW = document.createElement("a");
    clickableWWW.setAttribute("href", restaurangPubWebsite);
    let linkIcon = document.createElement("img");
    linkIcon.setAttribute("src", "../img/otherclick.png");
    clickableWWW.appendChild(linkIcon);
    document.getElementById("restaurangPubWebsite").innerHTML = "";
    document.getElementById("restaurangPubWebsite").appendChild(clickableWWW);
    document.getElementById("restaurangPubCity").innerHTML = "Stad: " + restaurangPubCity;
    document.getElementById("restaurangPubAddress").innerHTML = "Adress: " + restaurangPubAddress;
    document.getElementById("restaurangPubPriceRng").innerHTML = "Pris: " + restaurangPubPriceRange + " kr";
    document.getElementById("restaurangPubRating").innerHTML = "Omdöme: " + restaurangPubRating + " / 5";
    document.getElementById("restaurangPubAbstract").innerHTML = restaurangPubAbstract;

    displayMap(lat, lng);
    document.getElementById("directions-btn").style.display = "block"
    document.getElementById("directions-btn").addEventListener("click", function () {
        getDirections(userLocationLat, userLocationLng);
    });
}


function nextOption() {
    currentOptionIndex++;
    if (currentOptionIndex > restaurangPubData.payload.length) {
        currentOptionIndex = 1; // Gå tillbaka till första valet
    }
    displayedOption();
}

function previousOption() {
    if (currentOptionIndex === 1) {
        currentOptionIndex = restaurangPubData.payload.length; // Gå tillbaka till sista valet
    } else {
        currentOptionIndex--;
    }
    displayedOption();
}

