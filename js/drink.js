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

function slumpaFilm(kategorier) {
  var filmer = {
    enkel: [
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
        "Crazy Rich Asians",
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
    ],
    sorglig: [
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
    ],
    djup: [
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
    ],
    spannande: [  
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
      ]
  };
 
  var index = Math.floor(Math.random() * filmer[kategorier].length);
  var film = filmer[kategorier][index];
 // var film = filmList[index];

//index = (index + 1) % filmList.length;

  if (filmer[kategorier].length === 0) {
    var resultatTagg = document.getElementById("resultat-" + kategorier);
    resultatTagg.textContent = "Du har sett alla filmer i denna kategori.";
    return;
  }

  // Hämta nästa film baserat på räknaren
  var räknareTagg = document.getElementById("räknare-" + kategorier);
  var räknare = parseInt(räknareTagg.textContent);
  var film = filmer[kategorier][räknare];

  // Öka räknaren för nästa gång
  räknare++;
  räknareTagg.textContent = räknare;

  

  var resultatTagg = document.getElementById("resultat-" + kategorier);
  resultatTagg.style.textAlign = "center";
  resultatTagg.textContent = "" + film;
}