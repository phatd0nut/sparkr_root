ord = [
  'Hej',
  '3',
  'gay',
  'Jeff',
];

var smapiKey = "nxo3vzJa"; // SMAPI-nyckeln


function requestSmapi(){
  let request = new XMLHttpRequest();
  request.open("GET", "https://smapi.lnu.se/api?api_key=" + smapiKey + "&controller=food" + "&method=getall" + "&debug=true", true)

  request.onreadystatechange = function () {
    if (request.readyState == 4)
        if (request.status == 200) getData(request.responseText);
        else document.getElementById("textboxfail".innerHTML) = "<p>Den begärda resursen hittades inte.</p>"

}
}







//Funktion som tar random shit från ord. 
function randomOrd(){
    document.getElementById("textbox").textContent = ord[Math.floor(Math.random() * ord.length)];
  }
  


  
  
  