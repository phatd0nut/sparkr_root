  var rngId = ["1", "2", "3", "5"];
  var randomBox;
  var randomId;

  var smapiKey = "nxo3vzJa"; // SMAPI-nyckeln
  var userLocationLat; // Användarens latitud
  var userLocationLng; // Användarens longitud
  var randomId
  function init() {
    getUserLocation();   
    randomBox = document.getElementById("box");
    randomBox.addEventListener("click", randomIds);
  }

  function getUserLocation() { // Funktion för att få användarens geografiska position
    if (navigator.geolocation) { // Kontrollerar om webbläsaren stödjer geolocation-API:t
        navigator.geolocation.getCurrentPosition(function (position) { //Om webbläsaren stödjer API:t sparar den den geografiska platsen i userLocation
            userLocation = position.coords; // Användarens koordinater
            userLocationLat = position.coords.latitude;
            userLocationLng = position.coords.longitude;
            console.log(userLocation);
        }, function (error) { // Funktion som anropas om det har blivit ett fel i hämtningen av geo-platsen
            console.log(error);
        });
    } else {
        console.log("Platstjänster stöds inte av din webbläsare."); // Om webbläsaren inte stödjer geolocation api:t
    }
  }

  function getData(responseText) {
  console.log(responseText);
}


  window.addEventListener("load", init);
  function requestSmapi() {
    let request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://smapi.lnu.se/api?api_key=" +
      smapiKey +
      "&controller=establishment&method=getfromlatlng&lat=" +
      userLocationLat +
      "&lng=" +
      userLocationLng +
      "&ids=" +
      randomId +
      "?debug=true",
      true
    );
    request.send(null);
    request.onreadystatechange = function () {
      if (request.readyState == 4)
        if (request.status == 200) getData(request.responseText);
        else
          textboxfail.innerHTML = "<p>Den begärda resursen hittades inte. </p>";
    };
  }

  //slumpar establishment.
  // Randomly selects an ID from the rngId array
function getRandomId() {
  return rngId[Math.floor(Math.random() * rngId.length)];
}

// Event listener for generating random IDs
function randomIds() {
  randomId = getRandomId();
  requestSmapi();
}

  //Funktion som tar random shit från ord.
  //function randomOrd(){
  //  document.getElementById("textbox").textContent = ord[Math.floor(Math.random() * ord.length)];
  // }
