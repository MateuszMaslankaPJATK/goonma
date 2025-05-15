window.onload = async function () {
    try {
        const response = await fetch('data.json');
        const images = await response.json();

        const rand = Math.random();
        let sum = 0;
        let selected = images[0]; // domyślnie pierwszy

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
        szansaElement.textContent = `Szansa: ${(selected.chance * 100).toFixed(1)}%`;

        imgElement.classList.add('fade-in');
        szansaElement.classList.add('fade-in');
    } catch (error) {
        console.error('Błąd ładowania danych:', error);
    }
};
