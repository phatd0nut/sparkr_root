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
