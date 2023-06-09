function init() {
    let enkelFilmerBtn = document.getElementById("enkelFilmerBtn");
    enkelFilmerBtn.addEventListener("click", slumpaFilmEnkel);
  
    let sorgligFilmerBtn = document.getElementById("sorgligFilmerBtn");
    sorgligFilmerBtn.addEventListener("click", slumpaFilmSorglig);
  
    let djupFilmerBtn = document.getElementById("djupFilmerBtn");
    djupFilmerBtn.addEventListener("click", slumpaFilmDjup);
  
    let spannandeFilmerBtn = document.getElementById("spannandeFilmerBtn");
    spannandeFilmerBtn.addEventListener("click", slumpaFilmSpannande);
  }
  
  window.addEventListener("load", init);

  function slumpaFilmEnkel() {
    let kategoriEnkel = document.getElementById('enkelFilmerBtn');
    kategoriEnkel.addEventListener('touchstart', function () {
      this.style.transform = 'scale(1.05)';
    });
    kategoriEnkel.addEventListener('touchend', function () {
      this.style.transform = 'none';
    });
  
    let titleElement = document.querySelector('.kategori-enkel .title');
    titleElement.style.display = 'none';
  
    let filmerEnkel = [
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
  
    let slumpadFilm = filmerEnkel[Math.floor(Math.random() * filmerEnkel.length)];
    let resultat = document.getElementById("resultat-enkel");
  
    resultat.textContent = slumpadFilm;
  }
  
  function slumpaFilmSorglig() {
    let kategoriSorglig = document.getElementById('sorgligFilmerBtn');
    kategoriSorglig.addEventListener('touchstart', function () {
      this.style.transform = 'scale(1.05)';
    });
    kategoriSorglig.addEventListener('touchend', function () {
      this.style.transform = 'none';
    });
  
    let titleElement = document.querySelector('.kategori-sorglig .title');
    titleElement.style.display = 'none';
  
    let filmerSorglig = [
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
  
    let slumpadFilm = filmerSorglig[Math.floor(Math.random() * filmerSorglig.length)];
    let resultat = document.getElementById("resultat-sorglig");
  
    resultat.textContent = slumpadFilm;
  }
  
  function slumpaFilmDjup() {
    let kategoriDjup = document.getElementById('djupFilmerBtn');
    kategoriDjup.addEventListener('touchstart', function () {
      this.style.transform = 'scale(1.05)';
    });
    kategoriDjup.addEventListener('touchend', function () {
      this.style.transform = 'none';
    });
  
    let titleElement = document.querySelector('.kategori-djup .title');
    titleElement.style.display = 'none';
  
    let filmerDjup = [
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
  
    let slumpadFilm = filmerDjup[Math.floor(Math.random() * filmerDjup.length)];
    let resultat = document.getElementById("resultat-djup");
  
    resultat.textContent = slumpadFilm;
  }
  
  function slumpaFilmSpannande() {
    let kategoriSpannande = document.getElementById('spannandeFilmerBtn');
    kategoriSpannande.addEventListener('touchstart', function () {
      this.style.transform = 'scale(1.05)';
    });
    kategoriSpannande.addEventListener('touchend', function () {
      this.style.transform = 'none';
    });
  
    let titleElement = document.querySelector('.kategori-spannande .title');
    titleElement.style.display = 'none';
  
    let filmerSpannande = [
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
  
    let slumpadFilm = filmerSpannande[Math.floor(Math.random() * filmerSpannande.length)];
    let resultat = document.getElementById("resultat-spannande");
  
    resultat.textContent = slumpadFilm;
  }