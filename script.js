window.onload = function () {
  const images = [
    { src: 'images/obrazek1.png', chance: 0.1 }, // 10%
    { src: 'images/obrazek2.png', chance: 0.9 }  // 90%
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
