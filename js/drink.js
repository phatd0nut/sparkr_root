function init() {
  var enkelFilmerBtn = document.getElementById("enkelFilmerBtn");
  enkelFilmerBtn.addEventListener("click", slumpaFilmEnkel);

  var sorgligFilmerBtn = document.getElementById("sorgligFilmerBtn");
  sorgligFilmerBtn.addEventListener("click", slumpaFilmSorglig);

  var djupFilmerBtn = document.getElementById("djupFilmerBtn");
  djupFilmerBtn.addEventListener("click", slumpaFilmDjup);

  var spannandeFilmerBtn = document.getElementById("spannandeFilmerBtn");
  spannandeFilmerBtn.addEventListener("click", slumpaFilmSpannande);

  var slumpaSpelBtn = document.getElementById("slumpaSpelBtn");
  slumpaSpelBtn.addEventListener("click", slumpaSpel);
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
// var spel = document.querySelectorAll('.spel');

// drinkar.forEach(function (drink) {
//   const h1 = drink.querySelector('h1');
//   const pElements = drink.querySelectorAll('p');

//   // Dölj alla p-element i början
//   pElements.forEach(function (pElement) {
//     pElement.style.display = 'none';
//   });

//   // Lägg till klickhändelse på h1-elementet
//   h1.addEventListener('click', function () {
//     // Visa eller dölj p-elementen
//     pElements.forEach(function (pElement) {
//       if (pElement.style.display === 'none') {
//         pElement.style.display = 'block';
//       } else {
//         pElement.style.display = 'none';
//       }
//     });
//   });
// });


var games = document.querySelectorAll('.games');

games.forEach(function (game) {
  var pElement = game.querySelector('.instructions');
  var gameImage = game.querySelector('.game-image');
  var gameTitle = game.querySelector('.game-title');

  var spelData = [
    { title: "Spansk skitgubbe",instructions: "Kortlek: Spansk 40-kortlek (utan åttor och nior). Varje spelare får tre kort och fyra kort placeras med framsidan uppåt på bordet.Målet är att bli av med alla dina kort genom att matcha dina kort med korten på bordet.Om du inte kan matcha ett kort måste du lägga ner ett kort från din hand på bordet.Om du inte har några kort kvar i handen blir du 'skitgubbe'.Spelet fortsätter tills en spelare blir 'skitgubbe' tre gånger. Den spelaren blir förloraren." },

    { title: "Spaderdam", instructions: "Antal spelare 2-6: Spelarna får i given sex kort var, och de återstående korten bildar en talong, från vilken spelarna kompletterar sina händer under spelets gång. Den som är i tur att spela ut lägger upp ett valfritt antal kort i en och samma färg. Nästa spelare ska försöka sticka över, det vill säga matcha dessa kort med högre kort i samma färg eller spela trumf. Lyckas detta vänds korten bort och utgår ut spelet. De kort som inte gått att sticka över får spelaren ta upp på hand. En spelare som kunnat sticka över alla kort får göra nästa utspel. Om spelaren varit tvungen att ta upp kort på hand blir det i stället nästa spelare som får spela ut.Spader dam, benämnd Svarta Maja eller Maja, är spelets viktigaste kort. Det kan inte användas för att sticka över med och kan heller inte stickas över av något annat kort. En utlagd spader dam måste tas upp på hand men får användas som utspelskort vid ett senare tillfälle. Mot slutet av partiet blir deltagarna en efter en av med alla sina kort och utgår ur spelet. Den som är sist kvar sitter med spader dam på handen och har förlorat." },

    { title: "Plump", instructions: "Här är instruktionerna för Kortspel 3..." },
  ];

  var currentIndex = 0;
  updateGame(currentIndex);

  pElement.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % spelData.length;
    updateGame(currentIndex);
  });

  function updateGame(index) {
    var spel = spelData[index];
    gameTitle.textContent = spel.title;
    gameImage.src = spel.image;
    pElement.textContent = spel.instructions;
  }
});



// function slumpaSpel() {
//   var spel = [
//     "Poker",
//     "Uno",
//     "Monopol",
//     "Scrabble",
//     "Yatzy",
//     "Schack",
//     "Cluedo",
//     "Twister",
//     "Kubb",
//     "Biljard",
//     "Minecraft",
//     "Fortnite",
//     "Among Us",
//     "League of Legends",
//     "Counter-Strike: Global Offensive",
//     "Overwatch",
//     "Super Mario Bros",
//     "The Legend of Zelda",
//     "Final Fantasy",
//     "World of Warcraft",
//     "Call of Duty",
//     "GTA V",
//     "Red Dead Redemption 2",
//     "FIFA",
//     "NBA 2K",
//     "Madden NFL",
//     "Animal Crossing: New Horizons"
//   ];

//   var slumpatSpel = spel[Math.floor(Math.random() * spel.length)];
//   var resultat = document.getElementById("resultat-spel");

//   resultat.textContent = slumpatSpel;
// }

// var slumpaSpelBtn = document.getElementById("slumpaSpelBtn");
// slumpaSpelBtn.addEventListener("click", slumpaSpel);