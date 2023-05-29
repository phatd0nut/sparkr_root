var kortspel;
var bradspel;
var tvspel;
var currentGameIndex = 0;

function init() {  
    kortspel = document.getElementById("kortspel").addEventListener("click", kortSpel);
    bradspel = document.getElementById("bradspel").addEventListener("click", bradSpel);
    tvspel = document.getElementById("tvspel").addEventListener("click", tvSpel);
  }
  
  window.addEventListener("load", init);

  function kortSpel() {
    let touchingFx = document.getElementById("kortspel")
    touchingFx.addEventListener('touchstart', function () {
      this.style.transform = 'scale(1.05)';
    });
    touchingFx.addEventListener('touchend', function () {
      this.style.transform = 'none';
    });

    let request = new XMLHttpRequest();
    request.open('GET', '../json/kortspel.json', true);
    request.responseType = 'json';
    request.onload = function () {
      if (request.status === 200) {
        var games = request.response;
  
        // Kontrollera om currentGameIndex är inom intervallet av spelarrayen
        if (currentGameIndex < games.length) {
          let game = games[currentGameIndex];
          let kortspelinstr = document.getElementById('kortspelinstr');
          kortspelinstr.innerHTML = game.title + '<br>' + game.instructions;
  
          // Öka indexet eller gå tillbaka till första alternativet efter att gått igenom alla spel
          if (currentGameIndex === games.length - 1) {
            currentGameIndex = 0;
          } else {
            currentGameIndex++;
          }
        }
      } else {
        kortspelinstr.innerHTML = '<p>Inget kortspel kunde laddas.</p>';
      }
    };
    request.send();
  }

  function bradSpel() {
    let touchingFx = document.getElementById("kortspel")
    touchingFx.addEventListener('touchstart', function () {
      this.style.transform = 'scale(1.05)';
    });
    touchingFx.addEventListener('touchend', function () {
      this.style.transform = 'none';
    });

    let request = new XMLHttpRequest();
    request.open('GET', '../json/bradspel.json', true);
    request.responseType = 'json';
    request.onload = function () {
      if (request.status === 200) {
        var games = request.response;
  
        // Kontrollera om currentGameIndex är inom intervallet av spelarrayen
        if (currentGameIndex < games.length) {
          let game = games[currentGameIndex];
          let bradspelinstr = document.getElementById('bradspelinstr');
          bradspelinstr.innerHTML = game.title + '<br>' + game.instructions;
  
          // Öka indexet eller gå tillbaka till första alternativet efter att gått igenom alla spel
          if (currentGameIndex === games.length - 1) {
            currentGameIndex = 0;
          } else {
            currentGameIndex++;
          }
        }
      } else {
        bradspelinstr.innerHTML = '<p>Inget brädspel kunde laddas.</p>';
      }
    };
    request.send();
  }

  function tvSpel() {
    let touchingFx = document.getElementById("kortspel")
    touchingFx.addEventListener('touchstart', function () {
      this.style.transform = 'scale(1.05)';
    });
    touchingFx.addEventListener('touchend', function () {
      this.style.transform = 'none';
    });
    
    let request = new XMLHttpRequest();
    request.open('GET', '../json/tvspel.json', true);
    request.responseType = 'json';
    request.onload = function () {
      if (request.status === 200) {
        let games = request.response;
  
        // Kontrollera om currentGameIndex är inom intervallet av spelarrayen
        if (currentGameIndex < games.length) {
          let game = games[currentGameIndex];
          let tvspelinstr = document.getElementById('tvspelinstr');
          tvspelinstr.innerHTML = game.title + '<br>' + game.instructions;
  
          // Öka indexet eller gå tillbaka till första alternativet efter att gått igenom alla spel
          if (currentGameIndex === games.length - 1) {
            currentGameIndex = 0;
          } else {
            currentGameIndex++;
          }
        }
      } else {
        tvspelinstr.innerHTML = '<p>Inget TV-spel kunde laddas.</p>';
      }
    };
    request.send();
  }
  
  