function init() {
    inneMeny();
    uteMeny();
    
    let backArrow = document.querySelector(".left-arrow");

    backArrow.addEventListener('touchstart', function () {
        this.style.transform = 'scale(1.05)';
    });

    backArrow.addEventListener('touchend', function () {
        this.style.transform = 'none';
    });
}

window.addEventListener("load", init);

function inneMeny() {
    var scalingButtons = document.querySelectorAll(".button3");

    scalingButtons.forEach(function (button) {
        // Stänger av att man kan markera för flera olika webbläsare
        button.style.userSelect = 'none';
        button.style.webkitUserSelect = 'none';
        button.style.MozUserSelect = 'none';

        button.addEventListener('touchstart', function () {
            this.style.transform = 'scale(1.05)';
        });

        button.addEventListener('touchend', function () {
            this.style.transform = 'none';
        });
    });
}


function uteMeny() {
    var scalingButtons = document.querySelectorAll(".button4");

    scalingButtons.forEach(function (button) {
        // Stänger av att man kan markera för flera olika webbläsare
        button.style.userSelect = 'none';
        button.style.webkitUserSelect = 'none';
        button.style.MozUserSelect = 'none';

        button.addEventListener('touchstart', function () {
            this.style.transform = 'scale(1.05)';
        });

        button.addEventListener('touchend', function () {
            this.style.transform = 'none';
        });
    });

}