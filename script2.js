window.onload = function () {
  fetch('data.json?_=' + new Date().getTime())
    .then(res => res.json())
    .then(images => {
      const rand = Math.random();
      let sum = 0;
      let selected = images[0];

      for (const image of images) {
        sum += image.chance;
        if (rand <= sum) {
          selected = image;
          break;
        }
      }

      const imgElement = document.getElementById('wynik');
      const szansaElement = document.getElementById('szansa');

      imgElement.src = selected.src;
      szansaElement.textContent = `Szansa na trafienie tej karty: ${(selected.chance * 100).toFixed(1)}%`;

      imgElement.classList.add('fade-in');
      szansaElement.classList.add('fade-in');

      // Gratulacje tylko przy rzadkiej karcie (np. poniżej 10%)
      if (selected.chance <= 0.1) {
        document.querySelector('.gratulacje').classList.add('flash');
      }
    })
    .catch(error => console.error('Błąd wczytywania JSON:', error));
};
