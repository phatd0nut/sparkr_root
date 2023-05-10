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
let displayedId = []; // Referens för ID på alternativ som visas


function init() {
    getUserLocation();
    changeFiltersBtn = document.getElementById("changeFilters");
    changeFiltersBtn.style.display = "none";
    restaurangPubInfo = document.getElementById("restaurangPubInfo");
    restaurangPubInfo.style.display = "none";
    searchFilters = document.querySelectorAll(".searchFilters");
    let foodTypeInput = document.querySelectorAll(".foodOpt")
    let foodPriceInput = document.querySelectorAll(".priceOpt");
    let generateBtn = document.querySelector("#generateResults");
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
}

window.addEventListener("load", init);


function getUserLocation() { // Funktion för att få användarens geografiska position
    if (navigator.geolocation) { // Kontrollerar om webbläsaren stödjer geolocation-API:t
        navigator.geolocation.getCurrentPosition(function (position) { //Om webbläsaren stödjer API:t sparar den den geografiska platsen i userLocation
            userLocation = position.coords; // Användarens koordinater
            userLocationLat = position.coords.latitude;
            userLocationLng = position.coords.longitude;
        }, function (error) { // Funktion som anropas om det har blivit ett fel i hämtningen av geo-platsen
            console.log(error);
        });
    } else {
        console.log("Platstjänster stöds inte av din webbläsare."); // Om webbläsaren inte stödjer geolocation api:t
    }
}

function requestSmapi(foodType, foodPrice) {
    let request = new XMLHttpRequest();
    request.open("GET", "https://smapi.lnu.se/api?api_key=" + smapiKey + "&controller=establishment&descriptions=" + foodType + "&method=getfromlatlng&lat=" + userLocationLat + "&lng=" + userLocationLng + "&price_ranges=" + foodPrice + "&radius=10&debug=true", true)
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState == 4)
            if (request.status == 200) getData(request.responseText);
            else restaurangPubInfo.innerHTML = "<p>Den begärda resursen hittades inte.</p>"
    };
}

function getData(responseText) {
    let restaurangPubData = JSON.parse(responseText);

    if (restaurangPubData.payload == null || restaurangPubData.payload.length === 0) {
        alert("Det fanns inga alternativ med dina val i närheten.");
        return;
    }

    else {
        restaurangPubInfo.style.display = "block";   
        let restaurangPub = restaurangPubData.payload.filter(entry => !displayedId.includes(entry.id)); // Filtrerar bort alternativ som redan blivit genererade med hjälp av ID:t från varje objekt i SMAPI // Kod genererad med hjälp av ChatGPT
        if (restaurangPub.length === 0) {
            alert("Inga nya alternativ hittades.");
            return;
        }

        // Slumpar resultaten enligt förvalda kriterier från SMAPI
        let randomIndex = Math.floor(Math.random() * restaurangPub.length);
        let selectedEntry = restaurangPub[randomIndex];

        // De resultat som har visats pushas till displayedId array för att inte visas dubbelt
        displayedId.push(selectedEntry.id);

        let lat = selectedEntry.lat;
        let lng = selectedEntry.lng;
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
        clickableTelNr.textContent = restaurangPubTel;
        let clickableWWW = document.createElement("a");
        clickableWWW.setAttribute("href", restaurangPubWebsite);
        if (!selectedEntry.phone_number) {
            document.getElementById("restaurangPubTel").innerHTML = "Telefonnummer: Inget telefonnummer hittades."
        } else {
            document.getElementById("restaurangPubTel").innerHTML = "Telefonnummer: ";
            document.getElementById("restaurangPubTel").appendChild(clickableTelNr);
        }
        document.getElementById("restaurangPubWebsite").innerHTML = "";
        clickableWWW.textContent = restaurangPubWebsite;
        document.getElementById("restaurangPubWebsite").appendChild(clickableWWW);
        document.getElementById("restaurangPubAddress").innerHTML = "Adress: " + restaurangPubAddress;
        document.getElementById("restaurangPubPriceRng").innerHTML = "Pris: " + restaurangPubPriceRange + ":-";
        document.getElementById("restaurangPubRating").innerHTML = "Omdöme: " + restaurangPubRating + " / 5";

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
    directionsService.route(requestDirections, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            // Tar bort den tidigare markören (så att det inte blir dubbla markörer på destinationen)
            if (marker) {
                marker.setMap(null);
            }
            // Visar vägbeskrivningarna på kartan
            directionsRenderer.setDirections(result);
            directionsRenderer.setMap(map);
        }
    });
}

function showFilters() {
    searchFilters.forEach(function (filter) {
        filter.style.display = "block";
    });
    changeFiltersBtn.style.display = "none";
}
