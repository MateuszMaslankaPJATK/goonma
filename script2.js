window.onload = function () {
  const images = [
    { src: "images/Green_1.png", chance: 64.9 },
    { src: "images/Green_2.png", chance: 64.9 },
    { src: "images/Green_3.png", chance: 64.9 },
    { src: "images/Green_4.png", chance: 64.9 },
    { src: "images/Green_5.png", chance: 64.9 },
    { src: "images/Green_6.png", chance: 64.9 },
    { src: "images/Blue_1.png", chance: 20 },
    { src: "images/Blue_2.png", chance: 20 },
    { src: "images/Blue_3.png", chance: 20 },
    { src: "images/Blue_4.png", chance: 20 },
    { src: "images/Red_1.png", chance: 10 },
    { src: "images/Red_2.png", chance: 10 },
    { src: "images/Red_3.png", chance: 10 },
    { src: "images/Yellow_1.png", chance: 5 },
    { src: "images/Yellow_2.png", chance: 5 },
    { src: "images/Mythic.png", chance: 0.1 }
  ];

  const totalWeight = images.reduce((sum, img) => sum + img.chance, 0);
  const rand = Math.random() * totalWeight;

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
  szansaElement.textContent = `SZANSA: ${selected.chance.toFixed(1)}%`;

  imgElement.classList.add('fade-in');
  szansaElement.classList.add('fade-in');

  if (selected.chance <= 0.1) {
    document.querySelector('.ultra').classList.add('flash');
  }
  // Data losowania
const dataElement = document.getElementById("data");
const now = new Date();
dataElement.textContent = "Data losowania: " + now.toLocaleString();

// Unikalny kod losowania
const kodElement = document.getElementById("kod");
const kod = [...Array(10)]
  .map(() => Math.random().toString(36)[2].toUpperCase())
  .join("");
kodElement.textContent = "Kod potwierdzający: " + kod;

// Pokaż komunikat, jeśli ultra rare
if (selected.chance <= 0.1) {
  document.querySelector(".ultra").style.display = "block";
}

};
