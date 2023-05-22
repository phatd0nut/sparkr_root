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

drinkar.forEach(function(drink) {
  const h1 = drink.querySelector('h1');
  const pElements = drink.querySelectorAll('p');

  // Dölj alla p-element i början
  pElements.forEach(function(pElement) {
    pElement.style.display = 'none';
  });

  // Lägg till klickhändelse på h1-elementet
  h1.addEventListener('click', function() {
    // Visa eller dölj p-elementen
    pElements.forEach(function(pElement) {
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




 
//   var kategorier = Object.keys(filmer); // Hämta alla kategorier

//   // Slumpa en kategori
//   var slumpadKategori = kategorier[Math.floor(Math.random() * kategorier.length)];
//   var filmerIKategori = filmer[slumpadKategori];

//   var resultatTagg = document.getElementById("resultat-" + slumpadKategori);
//   var räknareTagg = document.getElementById("räknare-" + slumpadKategori);

//   if (filmerIKategori.length === 0) {
//     resultatTagg.textContent = "Du har sett alla filmer i denna kategori.";
//     räknareTagg.textContent = "0";
//     return;
//   }

//   var filmerVisade = filmer.visade || {}; // Array för visade filmer (initieras första gången)

//   if (!filmerVisade[slumpadKategori] || filmerVisade[slumpadKategori].length === 0) {
//     // Om alla filmer har visats eller ingen har visats än, återställ arrayen
//     filmerVisade[slumpadKategori] = [...filmerIKategori];
//   }

//   // Hämta nuvarande räknare
//   var räknare = parseInt(räknareTagg.textContent);

//   // Slumpa en ny film från den valda kategorin
//   var index = Math.floor(Math.random() * filmerVisade[slumpadKategori].length);
//   var film = filmerVisade[slumpadKategori][index];

//   // Ta bort den visade filmen från arrayen
//   filmerVisade[slumpadKategori].splice(index, 1);

//   // Uppdatera räknaren för nästa gång
//   räknare = (räknare + 1) % filmerIKategori.length;
//   räknareTagg.textContent = räknare;

//   // Spara uppdaterad array för visade filmer
//   filmer.visade = filmerVisade;

//   // Visa den slumpade filmen
//   resultatTagg.style.textAlign = "center";
//   resultatTagg.textContent = film;
// }



  // // Hämta nästa film baserat på räknaren
  // var räknareTagg = document.getElementById("räknare-" + kategorier);
  // var räknare = parseInt(räknareTagg.textContent);
  // var film = filmer[kategorier][räknare];

  // // Öka räknaren för nästa gång
  // räknare++;
  // räknareTagg.textContent = räknare;

  

  // var resultatTagg = document.getElementById("resultat-" + kategorier);
  // resultatTagg.style.textAlign = "center";
  // resultatTagg.textContent = "" + film;
