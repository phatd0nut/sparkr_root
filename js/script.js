var smapiKey = "nxo3vzJa";
var testDiv;

function init() {
  testDiv = document.getElementById("smapiLoad");
  // Get the button element by ID

}

window.addEventListener("load", init);

function requestSmapi() {
    let request = new XMLHttpRequest(); 
    request.responseType =  'json';
    request.open("GET", "https://smapi.lnu.se/api?api_key=" + smapiKey + "&controller=establishment&method=getall&debug=true", true);
    request.send(null); 
    request.onreadystatechange = function () { 
      if (request.readyState == 4) 
        if (request.status == 200) getData(request.responseText); 
        else testDiv.innerHTML = "hej"
        console.log(requestSmapi);
    };
}