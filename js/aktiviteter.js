var smapiKey = "nxo3vzJa"; // SMAPI-nyckeln
var userLocation = null; //Deklarerar en variabel för användarens position och nollställer den varje gång sidan laddas
var userLocationLat; // Användarens latitud
var userLocationLng; // Användarens longitud
var googleMap; // Google maps kartan
var googleKey = "AIzaSyANvWghf0VuGtg3EQCXSu9NoxS0blD-3NE"; // Google Maps API nyckel
var marker; // Kartmarkör
var directionsService; // Variabel för vägbeskrivningar
var directionsRenderer; // Variabel som ritar ut vägbeskrivningar
var activityType; // Variabel för val av aktivitet
var activityInfo; // Referens för utskrift av SMAPI-information
var activityFilters; // Referens för filtreringsalternativen
var changeFiltersBtn; //Referens för knappen som visar filtreringen
var displayedId = []; // Referens för ID på alternativ som visas
var nrOfOptions; // Referens för antal genererade resultat från SMAPI
var initialNrOfOptions = 0; // Lagrar det initiala värdet av genererade resultat från SMAPI 
var currentOptionIndex; // Referens för det resultat som visas
var activityData; // Referens för SMAPI-payload data
var radiusValue; // Referens för utskrift av radius i HTML
var selectedRadius = 10; // Initialt värde på radius
var radiusDiv; // Referens för radius slidern
var generateBtn; // Referens för sök knappen
var scrollBtns; // Referens för scroll-knapparna

function init() {
    getUserLocation();
    changeFiltersBtn = document.getElementById("changeFilters");
    changeFiltersBtn.style.display = "none";
    activityInfo = document.getElementById("activityInfo");
    activityInfo.style.display = "none";
    activityFilters = document.querySelectorAll(".activityFilters");
    generateBtn = document.querySelector("#generateResults");
    let activityTypeInput = document.querySelectorAll(".activityOpt")
    activityType = "Temapark";
    scrollBtns = document.getElementById("scrollBtns");
    scrollBtns.style.display = "none";
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

    for (let i = 0; i < activityTypeInput.length; i++) {
        activityTypeInput[i].addEventListener("change", (event) => {
            activityType = event.target.value;
        });
    }

    generateBtn.addEventListener("click", function () {
        generateBtn.style.display = "none";
        radiusDiv.style.display = "none";
        scrollBtns.style.display = "block";
        activityFilters.forEach(function (activityFilters) {
            activityFilters.style.display = "none";
        });
        changeFiltersBtn.style.display = "block";
        changeFiltersBtn.addEventListener("click", showFilters);
        // Om användaren inte ändrar valen skickas de förvalda värdena till SMAPI
        if (activityType === "Temapark") {
            requestSmapi(activityType);
            getUserLocation();
        } else {
            // Om valen ändras, uppdatera anropet till SMAPI
            requestSmapi(activityType);
            getUserLocation();
        }
    });
}


window.addEventListener("load", init);


function getUserLocation() { // Funktion för att få användarens geografiska position
    if (navigator.geolocation) { // Kontrollerar om webbläsaren stödjer geolocation-API:t
        navigator.geolocation.getCurrentPosition(function (position) { //Om webbläsaren stödjer API:t sparar den den geografiska platsen i userLocation
            userLocation = position.coords; // Användarens koordinater
           // userLocationLat = position.coords.latitude;
           // userLocationLng = position.coords.longitude;
             userLocationLat = "56.878017011624685";
             userLocationLng = "14.807412906905228";
        }, function (error) { // Funktion som anropas om det har blivit ett fel i hämtningen av geo-platsen
            console.log(error);
        });
    } else {
        console.log("Platstjänster stöds inte av din webbläsare."); // Om webbläsaren inte stödjer geolocation api:t
    }
}

function requestSmapi(activityType) {
    let request = new XMLHttpRequest();
    request.open("GET", "https://smapi.lnu.se/api?api_key=" + smapiKey + "&controller=establishment&types=activity&descriptions=" + activityType + "&method=getfromlatlng&lat=" + userLocationLat + "&lng=" + userLocationLng + "&radius=" + selectedRadius + "&debug=true", true)
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState == 4)
            if (request.status == 200) getData(request.responseText);
            else activityInfo.innerHTML = "<p>Den begärda resursen hittades inte.</p>"
    };
}

function getData(responseText) {
    activityData = JSON.parse(responseText);
    currentOptionIndex = 1;

    if (activityData.payload == null || activityData.payload.length === 0) {
        alert("Det fanns inga alternativ med dina val i närheten.");
        return;
    }

    else {
        nrOfOptions = activityData.payload.length;
        initialNrOfOptions = nrOfOptions;
        displayedOption();
        activityInfo.style.display = "block";
        activityInfo.style.display = "block";
        let activitiesData = activityData.payload.filter(entry => !displayedId.includes(entry.id)); // Filtrerar bort alternativ som redan blivit genererade med hjälp av ID:t från varje objekt i SMAPI // Kod genererad med hjälp av ChatGPT
        if (activitiesData.length === 0) {
            alert("Inga nya alternativ hittades.");
            return;
        }

        // Slumpar resultaten enligt förvalda kriterier från SMAPI
        let randomIndex = Math.floor(Math.random() * activitiesData.length);
        let selectedEntry = activitiesData[randomIndex];

        // De resultat som har visats pushas till displayedId array för att inte visas dubbelt
        displayedId.push(selectedEntry.id);

        let lat = selectedEntry.lat;
        let lng = selectedEntry.lng;
        let activitiesDataName = selectedEntry.name;
        let activitiesDataDescription = selectedEntry.description;
        let activitiesDataTel = selectedEntry.phone_number;
        let activitiesDataAddress = selectedEntry.address;
        let activitiesDataPriceRange = selectedEntry.price_range;
        let activitiesDataWebsite = selectedEntry.website;
        let activitiesDataRating = Number(selectedEntry.rating).toFixed(1);

        // Utskrift av information i HTML
        document.getElementById("activityName").innerHTML = activitiesDataName;
        document.getElementById("activityDescription").innerHTML = activitiesDataDescription;
        let clickableTelNr = document.createElement("a");
        clickableTelNr.setAttribute("href", "tel: " + activitiesDataTel);

        if (!selectedEntry.phone_number) {
            document.getElementById("activityTel").innerHTML = "Telefonnummer: Inget telefonnummer hittades."
        } else {
            document.getElementById("activityTel").innerHTML = "";
            document.getElementById("activityTel").appendChild(clickableTelNr);
            let telIcon = document.createElement("img");
            telIcon.setAttribute("src", "../img/phone.png");
            clickableTelNr.appendChild(telIcon);
        }

        if (selectedEntry.outdoors == "Y") {
            document.getElementById("activityOutdoors").innerHTML = "Utomhusaktivitet: Ja"
        }
        else {
            document.getElementById("activityOutdoors").innerHTML = "Utomhusaktivitet: Nej"
        }
        let clickableWWW = document.createElement("a");
        clickableWWW.setAttribute("href", activitiesDataWebsite);
        let linkIcon = document.createElement("img");
        linkIcon.setAttribute("src", "../img/otherclick.png")
        clickableWWW.appendChild(linkIcon);
        // clickableWWW.textContent = activitiesDataWebsite;
        document.getElementById("activityWebsite").innerHTML = "";
        document.getElementById("activityWebsite").appendChild(clickableWWW);
        document.getElementById("activityAddress").innerHTML = "Adress:" + activitiesDataAddress;
        document.getElementById("activityPriceRng").innerHTML = "Pris: " + activitiesDataPriceRange;
        document.getElementById("activityRating").innerHTML = "Omdöme:" + activitiesDataRating + " / 5";
        document.getElementById("activityAddress").innerHTML = "Adress: " + activitiesDataAddress;
        document.getElementById("activityPriceRng").innerHTML = "Pris: " + activitiesDataPriceRange + ":-";
        document.getElementById("activityRating").innerHTML = "Omdöme: " + activitiesDataRating + " / 5";


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
    activityFilters.forEach(function (activityFilter) {
        activityFilter.style.display = "block";
        radiusDiv.style.display = "block";
        generateBtn.style.display = "block";
        scrollBtns.style.display = "none";
    });
    changeFiltersBtn.style.display = "none";
}

function displayedOption() {
    document.getElementById("indexCounter").innerHTML = currentOptionIndex + " / " + initialNrOfOptions;

    let selectedEntry = activityData.payload[currentOptionIndex - 1];

    let lat = selectedEntry.lat;
    let lng = selectedEntry.lng;
    let activitiesDataName = selectedEntry.name;
    let activitiesDataDescription = selectedEntry.description;
    let activitiesDataTel = selectedEntry.phone_number;
    let activitiesDataAddress = selectedEntry.address;
    let activitiesDataPriceRange = selectedEntry.price_range;
    let activitiesDataWebsite = selectedEntry.website;
    let activitiesDataRating = Number(selectedEntry.rating).toFixed(1);

    // Utskrift av information i HTML
    document.getElementById("activityName").innerHTML = activitiesDataName;
    document.getElementById("activityDescription").innerHTML = activitiesDataDescription;
    let clickableTelNr = document.createElement("a");
    clickableTelNr.setAttribute("href", "tel: " + activitiesDataTel);

    if (!selectedEntry.phone_number) {
        document.getElementById("activityTel").innerHTML = "Telefonnummer: Inget telefonnummer hittades."
    } else {
        document.getElementById("activityTel").innerHTML = "";
        document.getElementById("activityTel").appendChild(clickableTelNr);
        let telIcon = document.createElement("img");
        telIcon.setAttribute("src", "../img/phone.png");
        clickableTelNr.appendChild(telIcon);
    }

    if (selectedEntry.outdoors == "Y") {
        document.getElementById("activityOutdoors").innerHTML = "Utomhusaktivitet: Ja"
    }
    else {
        document.getElementById("activityOutdoors").innerHTML = "Utomhusaktivitet: Nej"
    }
    let clickableWWW = document.createElement("a");
    clickableWWW.setAttribute("href", activitiesDataWebsite);
    let linkIcon = document.createElement("img");
    linkIcon.setAttribute("src", "../img/otherclick.png")
    clickableWWW.appendChild(linkIcon);
    // clickableWWW.textContent = activitiesDataWebsite;
    document.getElementById("activityWebsite").innerHTML = "";
    document.getElementById("activityWebsite").appendChild(clickableWWW);
    document.getElementById("activityAddress").innerHTML = "Adress:" + activitiesDataAddress;
    document.getElementById("activityPriceRng").innerHTML = "Pris: " + activitiesDataPriceRange;
    document.getElementById("activityRating").innerHTML = "Omdöme:" + activitiesDataRating + " / 5";
    document.getElementById("activityAddress").innerHTML = "Adress: " + activitiesDataAddress;
    document.getElementById("activityPriceRng").innerHTML = "Pris: " + activitiesDataPriceRange + ":-";
    document.getElementById("activityRating").innerHTML = "Omdöme: " + activitiesDataRating + " / 5";


    displayMap(lat, lng);
    document.getElementById("directions-btn").addEventListener("click", function () {
        getDirections(userLocationLat, userLocationLng);
    });
}


function nextOption() {
    currentOptionIndex++;
    if (currentOptionIndex > activityData.payload.length) {
        currentOptionIndex = 1; // Gå tillbaka till första valet
    }
    displayedOption();
}

function previousOption() {
    if (currentOptionIndex === 1) {
        currentOptionIndex = activityData.payload.length; // Gå tillbaka till sista valet
    } else {
        currentOptionIndex--;
    }
    displayedOption();
}

