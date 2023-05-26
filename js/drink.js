var kortspel;
var bradspel;
var tvspel;


function init() {
  var enkelFilmerBtn = document.getElementById("enkelFilmerBtn");
  enkelFilmerBtn.addEventListener("click", slumpaFilmEnkel);

  var sorgligFilmerBtn = document.getElementById("sorgligFilmerBtn");
  sorgligFilmerBtn.addEventListener("click", slumpaFilmSorglig);

  var djupFilmerBtn = document.getElementById("djupFilmerBtn");
  djupFilmerBtn.addEventListener("click", slumpaFilmDjup);

  var spannandeFilmerBtn = document.getElementById("spannandeFilmerBtn");
  spannandeFilmerBtn.addEventListener("click", slumpaFilmSpannande);

  kortspel = document.getElementById("kortspel");
  bradspel = document.getElementById("bradpel");
  tvspel = document.getElementById("tvspel");

  kortspel.addEventListener("click", kortSpel);
  bradspel.addEventListener("click", boardGames);
  tvspel.addEventListener("click", tvSpel);

}

window.addEventListener("load", init);

//Js för drinkar

var drinkar = document.querySelectorAll('.drinkar');

drinkar.forEach(function (drink) {
  const h1 = drink.querySelector('h1');
  const pElements = drink.querySelectorAll('p');

  // Dölj alla p-element i början
  pElements.forEach(function (pElement) {
    pElement.style.display = 'none';
  });

  // Lägg till klickhändelse på h1-elementet
  h1.addEventListener('click', function () {
    // Visa eller dölj p-elementen
    pElements.forEach(function (pElement) {
      if (pElement.style.display === 'none') {
        pElement.style.display = 'block';
      } else {
        pElement.style.display = 'none';
      }
    });
  });
});

//Slut på js för drinkar

function slumpaFilmEnkel() {
  var kategoriEnkel = document.getElementById('enkelFilmerBtn');
  kategoriEnkel.addEventListener('touchstart', function() {
    this.style.transform = 'scale(1.05)';
  });
  kategoriEnkel.addEventListener('touchend', function() {
    this.style.transform = 'none';
  });

  var titleElement = document.querySelector('.kategori-enkel .title');
  titleElement.style.display = 'none';

  var filmerEnkel = [
    "The Devil Wears Prada",
    "Easy A",
    "Crazy, Stupid, Love",
    "Pitch Perfect",
    "The Intern",
    "La La Land",
    "The Grand Budapest Hotel",
    "Silver Linings Playbook",
    "The Proposal",
    "Juno",
    "500 Days of Summer",
    "Little Miss Sunshine",
    "Zootopia",
    "Singin' in the Rain",
    "The Princess Bride",
    "Bridget Jones's Diary",
    "Mean Girls",
    "Napoleon Dynamite",
    "School of Rock",
    "The LEGO Movie",
    "The heat",
    "Chef",
    "The Holiday",
    "Spy",
    "Bridesmaids",
    "Tangled",
    "Mamma Mia!",
    "The Bucket List",
    "Deadpool",
    "Ghostbusters",
    "Despicable Me",
    "Anchorman: The Legend of Ron Burgundy",
    "The 40-Year-Old Virgin",
    "Step Brothers",
    "Superbad",
    "Legally Blonde",
    "Ratatouille",
    "The Other Guys",
    "Forgetting Sarah Marshall",
    "21 Jump Street",
    "Midnight in Paris",
    "Love, Simon",
    "The Internship",
    "The Greatest Showman",
    "The Upside",
    "Booksmart",
    "Knives Out",
    "Yesterday",
    "The Big Sick",
    "Blockers",
    "Crazy Rich Asians"
  ];

  var slumpadFilm = filmerEnkel[Math.floor(Math.random() * filmerEnkel.length)];
  var resultat = document.getElementById("resultat-enkel");

  resultat.textContent = slumpadFilm;
}

function slumpaFilmSorglig() {
  var kategoriSorglig = document.getElementById('sorgligFilmerBtn');
  kategoriSorglig.addEventListener('touchstart', function() {
    this.style.transform = 'scale(1.05)';
  });
  kategoriSorglig.addEventListener('touchend', function() {
    this.style.transform = 'none';
  });

  var titleElement = document.querySelector('.kategori-sorglig .title');
  titleElement.style.display = 'none';

  var filmerSorglig = [
    "The Fault in Our Stars",
    "A Monster Calls",
    "Blue Valentine",
    "Room",
    "The Lovely Bones",
    "Her",
    "Never Let Me Go",
    "Manchester by the Sea",
    "The Pursuit of Happyness",
    "If Beale Street Could Talk",
    "Lion",
    "Brooklyn",
    "Inside Out",
    "The Book Thief",
    "The Perks of Being a Wallflower",
    "Marley & Me",
    "The Help",
    "Moonlight",
    "Carol",
    "Life of Pi",
    "The Theory of Everything",
    "The Spectacular Now",
    "Still Alice",
    "The Descendants",
    "Warrior",
    "The Wrestler",
    "Dallas Buyers Club",
    "Blue Is the Warmest Color",
    "Beasts of the Southern Wild",
    "Boyhood",
    "The Shape of Water",
    "Three Billboards Outside Ebbing, Missouri",
    "Lady Bird",
    "Call Me by Your Name",
    "Eighth Grade",
    "The Florida Project",
    "I, Tonya",
    "A Star Is Born",
    "First Man",
    "The Favourite",
    "Roma",
    "Bohemian Rhapsody",
    "Green Book",
    "The Hate U Give",
    "Wildlife",
    "Leave No Trace",
    "Beautiful Boy",
    "Never Look Away",
    "The Farewell",
    "Parasite"
  ];

  var slumpadFilm = filmerSorglig[Math.floor(Math.random() * filmerSorglig.length)];
  var resultat = document.getElementById("resultat-sorglig");

  resultat.textContent = slumpadFilm;
}

function slumpaFilmDjup() {
  var kategoriDjup = document.getElementById('djupFilmerBtn');
  kategoriDjup.addEventListener('touchstart', function() {
    this.style.transform = 'scale(1.05)';
  });
  kategoriDjup.addEventListener('touchend', function() {
    this.style.transform = 'none';
  });

  var titleElement = document.querySelector('.kategori-djup .title');
  titleElement.style.display = 'none';

  var filmerDjup = [
    "Inception",
    "Interstellar",
    "The Social Network",
    "The Tree of Life",
    "Moon",
    "Birdman",
    "Whiplash",
    "Arrival",
    "Blade Runner 2049",
    "The Master",
    "No Country for Old Men",
    "Drive",
    "Eternal Sunshine of the Spotless Mind",
    "The Prestige",
    "Hereditary",
    "Black Swan",
    "There Will Be Blood",
    "The Revenant",
    "12 Years a Slave",
    "A Separation",
    "The Lobster",
    "Gone Girl",
    "The Big Short",
    "Boyhood",
    "Inside Llewyn Davis",
    "The Grand Budapest Hotel",
    "The Shape of Water",
    "Moonlight",
    "Birdman",
    "Room",
    "The Social Network",
    "The Master",
    "Manchester by the Sea",
    "Arrival",
    "A Ghost Story",
    "The Florida Project",
    "Call Me by Your Name",
    "Blade Runner 2049",
    "Phantom Thread",
    "The Killing of a Sacred Deer",
    "Get Out",
    "La La Land",
    "Blue Valentine",
    "The Place Beyond the Pines",
    "Melancholia",
    "Silver Linings Playbook",
    "The Fountain",
    "Inherent Vice",
    "Prisoners",
    "Ex Machina",
    "Nightcrawler"
  ];

  var slumpadFilm = filmerDjup[Math.floor(Math.random() * filmerDjup.length)];
  var resultat = document.getElementById("resultat-djup");

  resultat.textContent = slumpadFilm;
}

function slumpaFilmSpannande() {
  var kategoriSpannande = document.getElementById('spannandeFilmerBtn');
  kategoriSpannande.addEventListener('touchstart', function() {
    this.style.transform = 'scale(1.05)';
  });
  kategoriSpannande.addEventListener('touchend', function() {
    this.style.transform = 'none';
  });

  var titleElement = document.querySelector('.kategori-spannande .title');
  titleElement.style.display = 'none';

  var filmerSpannande = [
    "The Babadook",
    "Hereditary",
    "A Quiet Place",
    "The Conjuring",
    "The Witch",
    "It Follows",
    "The Descent",
    "The Strangers",
    "Sinister",
    "Insidious",
    "Don't Breathe",
    "Midsommar",
    "Us",
    "The Invisible Man",
    "Train to Busan",
    "The Ritual",
    "The Autopsy of Jane Doe",
    "The Visit",
    "Annihilation",
    "Inception",
    "The Dark Knight",
    "Mad Max: Fury Road",
    "The Bourne Ultimatum",
    "Edge of Tomorrow",
    "The Raid: Redemption",
    "Baby Driver",
    "Mission: Impossible - Fallout",
    "Skyfall",
    "John Wick",
    "Prisoners",
    "Gone Girl",
    "The Girl with the Dragon Tattoo",
    "No Country for Old Men",
    "Drive",
    "The Departed",
    "The Revenant",
    "The Town",
    "Black Swan",
    "Shutter Island",
    "Sicario",
    "The Prestige",
    "The Hurt Locker",
    "Oldboy",
    "Gravity",
    "Captain Phillips",
    "Arrival",
    "Wind River",
    "Taken",
    "District 9",
    "Warrior",
    "Ex Machina",
    "Interstellar",
    "Snowpiercer",
    "Primal Fear",
    "Source Code",
    "Hell or High Water",
    "The Martian",
    "The Revenant",
    "John Wick: Chapter 2",
    "Blade Runner 2049",
    "Split",
    "A Quiet Place",
    "Mission: Impossible - Fallout",
    "Logan",
    "The Girl on the Train",
    "Upgrade",
    "Searching",
    "Get Out"
  ];

  var slumpadFilm = filmerSpannande[Math.floor(Math.random() * filmerSpannande.length)];
  var resultat = document.getElementById("resultat-spannande");

  resultat.textContent = slumpadFilm;
}

//Slut på js för filmer

//js för spel
function kortSpel() {
  var pElement = document.querySelector('.instructions');
  var kortSpel = [
    { title: "Kortspel", instructions: "Tryck för att få förslag på ett kortspel med tillhörande instruktioner." },
    { title: "Spansk skitgubbe", instructions: "Kortlek: Spansk 40-kortlek (utan åttor och nior). Varje spelare får tre kort och fyra kort placeras med framsidan uppåt på bordet. Målet är att bli av med alla dina kort genom att matcha dina kort med korten på bordet. Om du inte kan matcha ett kort måste du lägga ner ett kort från din hand på bordet. Om du inte har några kort kvar i handen blir du 'skitgubbe'. Spelet fortsätter tills en spelare blir 'skitgubbe' tre gånger. Den spelaren blir förloraren." },
    { title: "Spaderdam", instructions: "Antal spelare 2-6: Spelarna får i given sex kort var, och de återstående korten bildar en talong, från vilken spelarna kompletterar sina händer under spelets gång. Den som är i tur att spela ut lägger upp ett valfritt antal kort i en och samma färg. Nästa spelare ska försöka sticka över, det vill säga matcha dessa kort med högre kort i samma färg eller spela trumf. Lyckas detta vänds korten bort och utgår ut spelet. De kort som inte gått att sticka över får spelaren ta upp på hand. En spelare som kunnat sticka över alla kort får göra nästa utspel. Om spelaren varit tvungen att ta upp kort på hand blir det i stället nästa spelare som får spela ut. Spader dam, benämnd Svarta Maja eller Maja, är spelets viktigaste kort. Det kan inte användas för att sticka över med och kan heller inte stickas över av något annat kort. En utlagd spader dam måste tas upp på hand men får användas som utspelskort vid ett senare tillfälle. Mot slutet av partiet blir deltagarna en efter en av med alla sina kort och utgår ur spelet. Den som är sist kvar sitter med spader dam på handen och har förlorat." },
    { title: "Plump", instructions: "2-5 spelare: Man måste alltid följa färg. Saknar man kort i den färg som lagts får man lägga vilket kort man vill. Om man misslyckas sätts det en så kallad 'plump' i spelprotokollet, därav namnet på kortspelet. Att ta ett stick betyder att man har högsta kortet av de som är utlagda. Eller att man lagt en färg som ingen annan spelare har. Det är därför väldigt bra att ha många kort av samma kulör. Första omgången får alla spelare 10 kort vardera. Därefter börjar spelarna (medsols) att gissa hur många stick dessa tror att de kommer ta under denna spelrunda. Man får tippa på allt mellan 10 och 0 stick. Antalet förutspådda stick får aldrig gå jämnt ut på spelprotokollet. Sista spelaren kan alltså inte alltid välja det han vill. (EX om 3 spelare: Spelare 1 tippar på 5 stick, spelare 2 på 5 stick, spelare 3 får ej välja 0 stick) Efter att rundan spelats klart tittar man vilka som lyckats ta exakt så många stick de förutspått. Om en spelare lyckats får denne en etta framför antalet stick. När det är dags för en omgång med endast ett kort per person finns det flera olika varianter. Var spelare får titta på sitt kort och avgöra om det ger vinst eller ej (0 eller 1 stick). Var spelare håller upp kortet i pannan, utan att titta på det själv. Genom att se de andras kort avgör spelaren då om denne tror att det egna kortet är bättre eller sämre. Ingen spelare tittar på något kort och alla chansar på 0 eller 1 stick. I slutet räknas samtliga poäng och den spelare med flest poäng vinner." },
    { title: "Gin Rummy", instructions: "I Gin Rummy ska varje spelare försöka samla tretal och fyrtal i samma färg eller en sekvens som går i följd och färg, alltså en stege. Ess räknas som lägst valör och de klädda korten har alla en valör på 10 poäng men om de spelas i en stege kommer de i ordningen knekt, dam och kung. Lyckas man få Gin så är alla kort på handen i en och samma sekvens. Det gäller att komma först till 100 poäng för att vinna hela spelet." },
    { title: "Chicago", instructions: "Man spelar Chicago med en vanlig kortlek utan jokrar och det går bra att spela på 2 eller fler spelare. Man börjar med att välja ut vem som börjar att dela ut, till exempel genom att dra ett kort där den som får högst börjar vara 'giv'. Varje omgång börjar med att varje spelare får fem kort var. De ska nu skapa en så bra pokerhand som möjligt enligt poängen nedan genom att byta ut kort. Under dessa byten får man byta hur många av korten som helst. Väljer man att bara byta ut ett kort kan man få se ett öppet och antingen ta det eller få ett nytt stängt kort. Antal byten är 2-3 per runda beroende på vad man har kommit överens om från början. Vid varje byte, förutom det sista innan utspelet, frågar given vad spelarna har på handen och den som har bäst hand får poäng. Man berättar inte exakt vad man har men säger t ex ett par, triss eller stege. När alla spelare gjort sina byten spelar man en stickspelsrunda med de fem kort man har på hand. Spelaren till vänster om given (given roterar medurs efter varje spelomgång) börjar lägga ut ett av de fem korten denne har på handen. Därefter ska resten av spelarna följa färg och lyckas ta över kommandot på utspelet genom att 'slå' det lagda kortet. Den som lyckas ta sista sticket får poäng. Efter utspelet får spelaren med bäst hand poäng. Utspel - 2 poäng. 5 - poäng. Par - 1 poäng. Två par - 2 poäng. Triss - 3 poäng Stege - 4 poäng. Färg - 5 poäng. Kåk - 6 poäng. Fyrtal - ger 8 poäng (eller nollställa övriga spelares poäng). Färgstege - 11 poäng. Royal Flush - 20 p." },
  ];

  var currentIndex = 0;
  updateGame(currentIndex);

  pElement.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % kortSpel.length;
    updateGame(currentIndex);
  });

  function updateGame(index) {
    var spel = kortSpel[index];
    gameTitle.textContent = spel.title;
    pElement.textContent = spel.instructions;
  }
};


kortSpel();

function boardGames() {
  var games = document.querySelectorAll(".games");

  games.forEach(function (game) {
    var pElement = game.querySelector("#beskrivning-bradspel");
    var gameTitle = game.querySelectorAll(".game-title");
    var boardGames = [
      { title: "Brädspel", instructions: "Tryck för att få förslag på ett brädspel med tillhörande instruktioner." },

      { title: "Monopol", instructions: "Monopol är ett klassiskt brädspel där spelarna försöker bygga upp en fastighetsimperium genom att köpa, sälja och handla med fastigheter. Målet är att driva sina motståndare i konkurs och bli den sista spelaren med pengar kvar." },

      { title: "Risk", instructions: "Risk är ett strategiskt brädspel där spelarna försöker erövra territorier och eliminera motståndarna. Genom att placera ut arméer, anfalla och försvara territorier, och använda strategiska kort kan spelarna försöka dominera världskartan och vinna spelet." },

      { title: "Catan", instructions: "Catan, även känt som Settlers of Catan, är ett resursbaserat brädspel där spelarna bygger och handlar med resurser för att skapa bosättningar och städer på ön Catan. Målet är att samla tillräckligt med poäng genom att bygga och utveckla för att vinna spelet." },

      { title: "Ticket to Ride", instructions: "Ticket to Ride är ett tågspelsbrädspel där spelarna försöker bygga järnvägslinjer mellan olika städer. Genom att samla och använda rätt färgade kort kan spelarna bygga sina rutter och försöka slutföra sina biljetter för att få poäng och vinna spelet." },

      { title: "Scrabble", instructions: "Scrabble är ett ordspel där spelarna försöker bilda ord på spelbrädet genom att placera bokstavstegel med olika poängvärden. Varje spelare har en given mängd bokstavstegel och försöker maximera poängen genom att skapa ord på bästa möjliga sätt." }
    ];

    var currentIndex = 0;
    updateGame(currentIndex);

    pElement.addEventListener('click', function () {
      currentIndex = (currentIndex + 1) % boardGames.length;
      updateGame(currentIndex);
    });

    function updateGame(index) {
      var spel = boardGames[index];
      gameTitle.textContent = spel.title;
      pElement.textContent = spel.instructions;
    }
  });
}

boardGames();

