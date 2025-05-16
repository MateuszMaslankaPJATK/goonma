document.addEventListener("DOMContentLoaded", function () {
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
  const dataElement = document.getElementById("data");
  const kodElement = document.getElementById("kod");

  imgElement.src = selected.src;
  szansaElement.textContent = `SZANSA: ${selected.chance.toFixed(1)}%`;

  // Unikalny kod losowania
  const kod = [...Array(10)].map(() => Math.random().toString(36)[2].toUpperCase()).join("");
  kodElement.textContent = "Kod potwierdzający: " + kod;

  imgElement.classList.add('fade-in');
  szansaElement.classList.add('fade-in');

  // Ultra rare efekt
  if (selected.chance <= 0.1) {
    document.querySelector(".ultra").style.display = "block";
  }
  {// Pobierz istniejące statystyki
const stats = JSON.parse(localStorage.getItem("goonma_stats")) || {};
const fileName = selected.src.split("/").pop();

// Zlicz konkretną kartę
stats[fileName] = (stats[fileName] || 0) + 1;

// Zlicz ogólnie liczbę losowań
stats["total"] = (stats["total"] || 0) + 1;

// Kolor na podstawie nazwy pliku
let kolor = fileName.split("_")[0]; // Green, Blue, Red...
if (fileName === "Mythic.png") kolor = "Mythic";

stats[kolor] = (stats[kolor] || 0) + 1;

// Zapisz ponownie
localStorage.setItem("goonma_stats", JSON.stringify(stats));
}
});
