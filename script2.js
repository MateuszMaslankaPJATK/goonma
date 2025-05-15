window.onload = function () {
    const images = [
        { src: "images/1.png", chance: 0.1 },
        { src: "images/2.png", chance: 0.1 },
        { src: "images/3.png", chance: 0.8 }
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
    szansaElement.textContent = `Szansa na trafienie tej karty: ${(selected.chance * 100).toFixed(1)}%`;

    imgElement.classList.add('fade-in');
    szansaElement.classList.add('fade-in');

    if (selected.chance <= 0.1) {
        document.querySelector('.gratulacje').classList.add('flash');
    }
};
