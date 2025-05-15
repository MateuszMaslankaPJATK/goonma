window.onload = function () {
  const images = [
    { src: 'images/1.png', chance: 0.02 },
    { src: 'images/2.png', chance: 0.40 },
    { src: 'images/3.png', chance: 0.60 },
  ];

  const rand = Math.random(); // liczba z przedziału 0.0–1.0
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

    // Ustaw dane i animację
    imgElement.src = selected.src;
    szansaElement.textContent = `Szansa: ${(selected.chance * 100).toFixed(1)}%`;

    imgElement.classList.add('fade-in');
    szansaElement.classList.add('fade-in');
};
