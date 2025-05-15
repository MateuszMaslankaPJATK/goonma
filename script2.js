window.onload = function () {
  const images = [
    { src: "images/1.png", chance: 0.3 },
    { src: "images/2.png", chance: 0.3 },
    { src: "images/3.png", chance: 0.3 }
  ];

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
  szansaElement.textContent = `SZANSA: ${(selected.chance * 100).toFixed(1)}%`;

  imgElement.classList.add('fade-in');
  szansaElement.classList.add('fade-in');

  if (selected.chance <= 1) {
    document.querySelector('.ultra').classList.add('flash');
  }
};
