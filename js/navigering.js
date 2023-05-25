function init() {
    inneMeny();
    uteMeny();
    tillbakaPil();
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

function tillbakaPil() {
    let backArrow = document.querySelector(".left-arrow");

    backArrow.addEventListener('touchstart', function () {
        this.style.transform = 'scale(1.15)';
    });

    backArrow.addEventListener('touchend', function () {
        this.style.transform = 'none';
    });
}