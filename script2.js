from pathlib import Path

# Ponowne utworzenie pliku po resecie stanu
js_code = """
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
    //hologramy
    { src: "images/blue1_holo.png", chance: 5 },
    { src: "images/blue2_holo.png", chance: 5 },
    { src: "images/blue3_holo.png", chance: 5 },
    { src: "images/blue4_holo.png", chance: 5 },
    { src: "images/red1_holo.png", chance: 2 },
    { src: "images/red2_holo.png", chance: 2 },
    { src: "images/red3_holo.png", chance: 2 },
    { src: "images/Yellow1_holo.png", chance: 1 },
    { src: "images/Yellow2_holo.png", chance: 1 },
    //z podpisem
    { src: "images/Yellow1_monosig.png", chance: 0.5 },
    { src: "images/red2_monosig.png", chance: 0.5 },
    { src: "images/blue2_monosig.png", chance: 0.5 },
    { src: "images/green1_monosig.png", chance: 0.5 },
    //mityczna
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
  imgElement.onload = function () {
    imgElement.classList.add("flip-in");
  };
  szansaElement.textContent = `SZANSA: ${selected.chance.toFixed(1)}%`;

  // Dodaj efekt flash jeśli karta nie jest zielona
  const kolorKarty = selected.src.split("/").pop().split("_")[0];
  if (kolorKarty !== "Green") {
    imgElement.classList.add("flash");
  }

  // Unikalny kod losowania
  const kod = [...Array(10)].map(() => Math.random().toString(36)[2].toUpperCase()).join("");
  kodElement.textContent = "Kod potwierdzający: " + kod;

  imgElement.classList.add('fade-in');
  szansaElement.classList.add('fade-in');

  // Ultra rare efekt
  if (selected.chance <= 0.1) {
    document.querySelector(".ultra").style.display = "block";
  }

  // Statystyki lokalne
  const stats = JSON.parse(localStorage.getItem("goonma_stats")) || {};
  const fileName = selected.src.split("/").pop();
  stats[fileName] = (stats[fileName] || 0) + 1;
  stats["total"] = (stats["total"] || 0) + 1;
  let kolor = fileName.split("_")[0];
  if (fileName === "Mythic.png") kolor = "Mythic";
  stats[kolor] = (stats[kolor] || 0) + 1;
  localStorage.setItem("goonma_stats", JSON.stringify(stats));
});
"""

path = Path("/mnt/data/script2.js")
path.write_text(js_code)

path.name
