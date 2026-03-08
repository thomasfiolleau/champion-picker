const btnPick = document.getElementById("btn-pick");
const championName = document.getElementById("champion-name");
const championRole = document.getElementById("champion-role");
const buildList = document.getElementById("build-list");
const championDescription = document.getElementById("champion-description");
const championIcons = document.getElementById("champion-icons");
const dernier = localStorage.getItem("dernierChampion");
if (dernier) {
  console.log(`Ton dernier champion était : ${dernier}`);
}
let lastChampionIndex = -1;

function getRandomChampion() {
  let index;
  do {
    index = Math.floor(Math.random() * champions.length);
  } while (index === lastChampionIndex);

  lastChampionIndex = index;
  return champions[index];
}

function displayChampion(champion) {
  const result = document.getElementById("result");

  result.classList.remove("animate-in");

  void result.offsetWidth;

  result.classList.add("animate-in");

  championName.textContent = champion.nom;
  championIcons.src = champion.icon;
  championRole.innerHTML = `${champion.role} — <span style="color: ${getDifficultyColor(champion.difficulte)}">${champion.difficulte}</span>`;
  championDescription.textContent = champion.description;
  buildList.innerHTML = "";

  champion.build.forEach((item) => {
    const li = document.createElement("li");

    // si l'item est un objet (avec icône)
    if (typeof item === "object") {
      const img = document.createElement("img");
      img.src = item.icon;
      img.alt = item.nom;
      img.classList.add("item-icon");

      const text = document.createElement("span");
      text.textContent = item.nom;

      li.appendChild(img);
      li.appendChild(text);
    }
    // si l'item est juste un texte
    else {
      li.textContent = item;
    }

    buildList.appendChild(li);
  });

  localStorage.setItem("dernierChampion", champion.nom);
}

btnPick.addEventListener("click", function () {
  btnPick.disabled = true;
  btnPick.textContent = "⏳ Tirage...";

  setTimeout(() => {
    const champion = getRandomChampion();
    displayChampion(champion);

    btnPick.disabled = false;
    btnPick.textContent = "🎲 Tirer un Champion";
  }, 500);
});
function getDifficultyColor(difficulte) {
  switch (difficulte) {
    case "Facile":
      return "#4ade80";
    case "Moyen":
      return "#fbbf24";
    case "Difficile":
      return "#ef4444";
    default:
      return "#888";
  }
}
