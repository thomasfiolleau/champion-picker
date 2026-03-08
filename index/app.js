const btnPick = document.getElementById("btn-pick");
const championName = document.getElementById("champion-name");
const championRole = document.getElementById("champion-role");
const buildList = document.getElementById("build-list");

function getRandomChampion() {
  const index = Math.floor(Math.random() * champions.length);
  return champions[index];
}

function displayChampion(champion) {
  const result = document.getElementById("result");

  result.classList.remove("animate-in");

  void result.offsetWidth;

  result.classList.add("animate-in");

  championName.textContent = champion.nom;
  championRole.textContent = `${champion.role} — ${champion.difficulte}`;

  buildList.innerHTML = "";

  champion.build.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    buildList.appendChild(li);
  });
}

btnPick.addEventListener("click", function () {
  const champion = getRandomChampion();
  displayChampion(champion);
});
