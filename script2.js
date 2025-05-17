document.addEventListener("DOMContentLoaded", function () {
  const images = [
    { src: "images/Green_1.png", chance: 70 },
    { src: "images/Green_2.png", chance: 70 },
    { src: "images/Green_3.png", chance: 70 },
    { src: "images/Green_4.png", chance: 70 },
    { src: "images/Green_5.png", chance: 70 },
    { src: "images/Green_6.png", chance: 70 },
    { src: "images/Blue_1.png", chance: 20 },
    { src: "images/Blue_2.png", chance: 20 },
    { src: "images/Blue_3.png", chance: 20 },
    { src: "images/Blue_4.png", chance: 20 },
    { src: "images/Red_1.png", chance: 10 },
    { src: "images/Red_2.png", chance: 10 },
    { src: "images/Red_3.png", chance: 10 },
    { src: "images/Yellow_1.png", chance: 5 },
    { src: "images/Yellow_2.png", chance: 5 },
    { src: "images/blue1_holo.png", chance: 5 },
    { src: "images/blue2_holo.png", chance: 5 },
    { src: "images/blue3_holo.png", chance: 5 },
    { src: "images/blue4_holo.png", chance: 5 },
    { src: "images/red1_holo.png", chance: 2 },
    { src: "images/red2_holo.png", chance: 2 },
    { src: "images/red3_holo.png", chance: 2 },
    { src: "images/Yellow1_holo.png", chance: 1 },
    { src: "images/Yellow2_holo.png", chance: 1 },
    { src: "images/Yellow1_monosig.png", chance: 0.5 },
    { src: "images/red2_monosig.png", chance: 0.5 },
    { src: "images/blue2_monosig.png", chance: 0.5 },
    { src: "images/green1_monosig.png", chance: 0.5 },
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

  if (!imgElement) {
    console.error("Nie znaleziono elementu IMG");
    return;
  }

  imgElement.src = selected.src;

  imgElement.onload = function () {
    imgElement.classList.add("flip-in");
  };

  imgElement.onerror = function () {
    imgElement.alt = "Nie udało się załadować obrazka.";
    szansaElement.textContent = "Błąd: Nie znaleziono karty.";
    console.error("Błąd ładowania obrazu:", selected.src);
  };

  szansaElement.textContent = `SZANSA: ${selected.chance.toFixed(1)}%`;

  const kolorKarty = selected.src.split("/").pop().split("_")[0];
  if (kolorKarty !== "Green") {
    imgElement.classList.add("flash");
  }

  const kod = [...Array(10)].map(() => Math.random().toString(36)[2].toUpperCase()).join("");
  kodElement.textContent = "Kod potwierdzający: " + kod;

  if (selected.chance <= 0.1) {
    document.querySelector(".ultra").style.display = "block";
  }

  const stats = JSON.parse(localStorage.getItem("goonma_stats")) || {};
  const fileName = selected.src.split("/").pop();
  stats[fileName] = (stats[fileName] || 0) + 1;
  stats["total"] = (stats["total"] || 0) + 1;
  let kolor = fileName.split("_")[0];
  if (fileName === "Mythic.png") kolor = "Mythic";
  stats[kolor] = (stats[kolor] || 0) + 1;
  localStorage.setItem("goonma_stats", JSON.stringify(stats));
});
