var smapiKey = "nxo3vzJa";
var testDiv;


function init() {
    testDiv = document.getElementById("smapiLoad");
}
window.addEventListener("load", init);

function initSmapi() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://smapi.lnu.se/api/?api_key=" + smapiKey + "https://smapi.lnu.se/api/?api_key=nxo3vzJa&controller=activity&method=getall");
}

