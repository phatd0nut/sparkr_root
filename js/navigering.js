function init() {
    inneMeny();
    uteMeny();
}

window.addEventListener("load", init);

function inneMeny() {
    var scalingButtons = document.querySelectorAll(".button3");

    scalingButtons.forEach(function(button) {
      button.addEventListener('touchstart', function() {
        this.style.transform = 'scale(1.05)';
      });
    
      button.addEventListener('touchend', function() {
        this.style.transform = 'none';
      });
    });
    
}

function uteMeny() {
    var scalingButtons = document.querySelectorAll(".button4");

    scalingButtons.forEach(function(button) {
      button.addEventListener('touchstart', function() {
        this.style.transform = 'scale(1.05)';
      });
    
      button.addEventListener('touchend', function() {
        this.style.transform = 'none';
      });
    });
    
}
}