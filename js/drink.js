function init() {
  var enkelFilmerBtn = document.getElementById("enkelFilmerBtn");
  enkelFilmerBtn.addEventListener("click", slumpaFilmEnkel);

  var sorgligFilmerBtn = document.getElementById("sorgligFilmerBtn");
  sorgligFilmerBtn.addEventListener("click", slumpaFilmSorglig);

  var djupFilmerBtn = document.getElementById("djupFilmerBtn");
  djupFilmerBtn.addEventListener("click", slumpaFilmDjup);

  var spannandeFilmerBtn = document.getElementById("spannandeFilmerBtn");
  spannandeFilmerBtn.addEventListener("click", slumpaFilmSpannande);
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

function slumpaSpel() {
  var spel = [
      {
          namn: "Poker",
          beskrivning: "Poker är ett kortspel där spelarna satsar på den bästa kombinationen av kort i sin hand. Målet är att vinna potten genom att antingen ha den bästa handen eller genom att bluffa andra spelare att ge upp sina insatser.",
          bild: "/img/poker.jpg"
      },
      {
          namn: "Uno",
          beskrivning: "Uno är ett kortspel där spelarna försöker bli av med sina kort genom att matcha dem efter färg, nummer eller symbol. Spelet innehåller även specialkort som kan ställa till det för motspelarna.",
          bild: "/img/uno.jpg"
      },
      // Add more games with their descriptions and images here
  ];

  var slumpatIndex = Math.floor(Math.random() * spel.length);
  var slumpatSpel = spel[slumpatIndex];
  var resultat = document.getElementById("resultat-spel");
  var beskrivning = document.getElementById("beskrivning-spel");
  var bild = document.getElementById("bild-spel");

  resultat.textContent = slumpatSpel.namn;
  beskrivning.textContent = slumpatSpel.beskrivning;
  bild.src = slumpatSpel.bild;
}

var slumpaSpelBtn = document.getElementById("slumpaSpelBtn");
slumpaSpelBtn.addEventListener("click", slumpaSpel);


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