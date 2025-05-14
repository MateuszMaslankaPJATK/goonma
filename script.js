window.onload = function () {
  const images = [
    { src: 'images/1.png', chance: 0.33 },
    { src: 'images/2.png', chance: 0.33 },
    { src: 'images/3.png', chance: 0.33 },
  ];

  const rand = Math.random(); // liczba 0.0 - 1.0
  let sum = 0;
  let selected = images[0].src;

  for (const image of images) {
    sum += image.chance;
    if (rand <= sum) {
      selected = image.src;
      break;
    }
  }

  document.getElementById('wynik').src = selected;
};
