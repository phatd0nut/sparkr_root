function init() {
  let recept = document.querySelectorAll('.recept');

  recept.forEach(function (recept) {
    // const h1 = recept.querySelector('h1');
    const pElements = recept.querySelectorAll('p');

    // Dölj alla p-element i början
    pElements.forEach(function (pElement) {
      pElement.style.display = 'none';
    });

    recept.addEventListener('click', function () {
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
}

window.addEventListener("load", init);

//Slut på js för recept