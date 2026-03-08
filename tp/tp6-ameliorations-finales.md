# TP6 — Améliorations et finalisation

## Objectif

Ton app marche ! Maintenant on va la rendre **vraiment bien** :
- Ajouter une animation quand un champion apparaît
- Empêcher de tomber deux fois de suite sur le même champion
- Ajouter une description du champion
- Ajouter un indicateur visuel de difficulté
- Bonus : stocker le dernier champion dans le navigateur

---

## Amélioration 1 : Animation à l'apparition

Quand un champion est tiré, on veut un petit effet visuel. On va utiliser une **animation CSS** déclenchée par JavaScript.

### Dans `style.css`, ajoute :

```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-in {
    animation: fadeInUp 0.4s ease forwards;
}
```

### Explication

**`@keyframes`** : définit une animation. On lui donne un nom (`fadeInUp`) et on décrit ce qui se passe du début (`from`) à la fin (`to`) :
- Au début : invisible (`opacity: 0`) et décalé vers le bas (`translateY(20px)`)
- À la fin : visible et en place

**`.animate-in`** : une classe CSS qu'on va ajouter/retirer en JavaScript pour déclencher l'animation.

### Dans `app.js`, modifie la fonction `displayChampion` :

Remplace la fonction par :

```javascript
function displayChampion(champion) {
    const result = document.getElementById("result");

    result.classList.remove("animate-in");

    void result.offsetWidth;

    result.classList.add("animate-in");

    championName.textContent = champion.nom;
    championRole.textContent = `${champion.role} — ${champion.difficulte}`;

    buildList.innerHTML = "";

    champion.build.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        buildList.appendChild(li);
    });
}
```

### Pourquoi `void result.offsetWidth` ?

C'est une astuce. Quand tu retires puis remets une classe CSS, le navigateur est trop rapide : il voit que le résultat final est identique et ne relance pas l'animation. En lisant `offsetWidth`, tu forces le navigateur à "recalculer" le rendu — et il relance l'animation.

> C'est un pattern connu et utilisé partout. C'est un peu du "hack", mais c'est la façon standard de faire.

---

## Amélioration 2 : Pas le même champion deux fois de suite

Rien de plus frustrant que de tirer le même champion. On va garder en mémoire le dernier tiré :

### Modifie `app.js` :

Ajoute une variable en haut (après les constantes du DOM) :

```javascript
let lastChampionIndex = -1;
```

Et modifie `getRandomChampion` :

```javascript
function getRandomChampion() {
    let index;
    do {
        index = Math.floor(Math.random() * champions.length);
    } while (index === lastChampionIndex);

    lastChampionIndex = index;
    return champions[index];
}
```

### Explication

**`do...while`** : c'est une boucle qui s'exécute **au moins une fois**, puis continue tant que la condition est vraie.

En français : "Choisis un index aléatoire. Si c'est le même que le dernier, recommence."

> **Pourquoi `-1` au départ ?** Parce qu'aucun index valide n'est `-1` (les index vont de 0 à 7). Donc au premier tirage, la condition `index === -1` sera toujours fausse et n'importe quel champion pourra sortir.

---

## Amélioration 3 : Afficher la description

On a un champ `description` dans nos données mais on ne l'affiche pas encore.

### Dans `index.html`, ajoute un paragraphe dans `#champion-info` :

```html
<div id="champion-info">
    <h2 id="champion-name">???</h2>
    <p id="champion-role">En attente...</p>
    <p id="champion-description"></p>
</div>
```

### Dans `app.js`, récupère l'élément et mets-le à jour :

Ajoute dans les constantes en haut :

```javascript
const championDescription = document.getElementById("champion-description");
```

Et dans `displayChampion`, après la ligne du rôle :

```javascript
championDescription.textContent = champion.description;
```

### Dans `style.css`, stylise la description :

```css
#champion-description {
    color: #aaa;
    font-size: 0.95rem;
    margin-top: 8px;
    font-style: italic;
}
```

---

## Amélioration 4 : Indicateur visuel de difficulté

On va ajouter un badge coloré pour la difficulté.

### Dans `app.js`, crée une fonction utilitaire :

```javascript
function getDifficultyColor(difficulte) {
    switch (difficulte) {
        case "Facile":   return "#4ade80";
        case "Moyen":    return "#fbbf24";
        case "Difficile": return "#ef4444";
        default:          return "#888";
    }
}
```

> **C'est quoi `switch` ?** C'est comme une série de `if/else if`, mais plus lisible quand tu compares une variable à plusieurs valeurs. Chaque `case` teste une valeur, et `default` s'exécute si aucun `case` ne correspond.

### Modifie la ligne du rôle dans `displayChampion` :

Remplace la ligne `championRole.textContent = ...` par :

```javascript
championRole.innerHTML = `${champion.role} — <span style="color: ${getDifficultyColor(champion.difficulte)}">${champion.difficulte}</span>`;
```

> **`innerHTML` vs `textContent` ?** Ici on utilise `innerHTML` parce qu'on injecte du HTML (un `<span>` avec un style). `textContent` ignorerait les balises et afficherait le HTML en tant que texte brut.

---

## Amélioration 5 : Effet sur le bouton pendant le tirage

On va désactiver le bouton pendant un court instant pour donner un effet "tirage en cours" :

### Modifie le `addEventListener` dans `app.js` :

```javascript
btnPick.addEventListener("click", function() {
    btnPick.disabled = true;
    btnPick.textContent = "⏳ Tirage...";

    setTimeout(() => {
        const champion = getRandomChampion();
        displayChampion(champion);

        btnPick.disabled = false;
        btnPick.textContent = "🎲 Tirer un Champion";
    }, 500);
});
```

### Explication

**`btnPick.disabled = true`** : désactive le bouton (il ne réagit plus aux clics et apparaît grisé).

**`setTimeout(callback, ms)`** : exécute la fonction callback après un délai en millisecondes. Ici, 500ms = 0.5 seconde.

> **Pourquoi `setTimeout` ?** Pour simuler un petit délai de "tirage". Sans ça, le résultat apparaît instantanément, ce qui est moins satisfaisant. Le petit délai de 500ms crée un sentiment d'anticipation.

### Ajoute du CSS pour le bouton désactivé :

```css
#btn-pick:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}
```

---

## Le code final complet

### `index.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Champion Picker</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div id="app">

        <h1>🎮 Random Champion Picker</h1>
        <p>Clique sur le bouton pour découvrir ton champion !</p>

        <button id="btn-pick">🎲 Tirer un Champion</button>

        <div id="result">
            <div id="champion-info">
                <h2 id="champion-name">???</h2>
                <p id="champion-role">En attente...</p>
                <p id="champion-description"></p>
            </div>

            <div id="build-info">
                <h3>Build recommandé</h3>
                <ul id="build-list">
                    <li>Clique sur le bouton pour voir le build</li>
                </ul>
            </div>
        </div>

    </div>

    <footer>
        <p>Fait avec ❤️ pour apprendre le dev web</p>
    </footer>

    <script src="champions.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

### `style.css`

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #0a0a1a;
    color: #e0e0e0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#app {
    text-align: center;
    padding: 40px;
    max-width: 600px;
    width: 100%;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

#app > p {
    color: #888;
    margin-bottom: 30px;
    font-size: 1.1rem;
}

#btn-pick {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 15px 40px;
    font-size: 1.2rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 30px;
}

#btn-pick:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 25px rgba(102, 126, 234, 0.4);
}

#btn-pick:active {
    transform: scale(0.98);
}

#btn-pick:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

#result {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 30px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

#champion-info {
    margin-bottom: 25px;
}

#champion-name {
    font-size: 2rem;
    color: #667eea;
    margin-bottom: 5px;
}

#champion-role {
    color: #888;
    font-size: 1rem;
    font-style: italic;
}

#champion-description {
    color: #aaa;
    font-size: 0.95rem;
    margin-top: 8px;
    font-style: italic;
}

#build-info h3 {
    color: #764ba2;
    margin-bottom: 15px;
    font-size: 1.2rem;
}

#build-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

#build-list li {
    background: rgba(102, 126, 234, 0.15);
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #a0b0ff;
}

footer {
    margin-top: 40px;
    color: #555;
    font-size: 0.85rem;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-in {
    animation: fadeInUp 0.4s ease forwards;
}
```

### `app.js`

```javascript
const btnPick = document.getElementById("btn-pick");
const championName = document.getElementById("champion-name");
const championRole = document.getElementById("champion-role");
const championDescription = document.getElementById("champion-description");
const buildList = document.getElementById("build-list");

let lastChampionIndex = -1;

function getRandomChampion() {
    let index;
    do {
        index = Math.floor(Math.random() * champions.length);
    } while (index === lastChampionIndex);

    lastChampionIndex = index;
    return champions[index];
}

function getDifficultyColor(difficulte) {
    switch (difficulte) {
        case "Facile":   return "#4ade80";
        case "Moyen":    return "#fbbf24";
        case "Difficile": return "#ef4444";
        default:          return "#888";
    }
}

function displayChampion(champion) {
    const result = document.getElementById("result");

    result.classList.remove("animate-in");
    void result.offsetWidth;
    result.classList.add("animate-in");

    championName.textContent = champion.nom;
    championRole.innerHTML = `${champion.role} — <span style="color: ${getDifficultyColor(champion.difficulte)}">${champion.difficulte}</span>`;
    championDescription.textContent = champion.description;

    buildList.innerHTML = "";

    champion.build.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        buildList.appendChild(li);
    });
}

btnPick.addEventListener("click", function() {
    btnPick.disabled = true;
    btnPick.textContent = "⏳ Tirage...";

    setTimeout(() => {
        const champion = getRandomChampion();
        displayChampion(champion);

        btnPick.disabled = false;
        btnPick.textContent = "🎲 Tirer un Champion";
    }, 500);
});
```

---

## Exercice bonus : LocalStorage

Le `localStorage` permet de **sauvegarder des données dans le navigateur** (elles persistent même après avoir fermé l'onglet).

Essaie d'ajouter ceci à la fin de `displayChampion` :

```javascript
localStorage.setItem("dernierChampion", champion.nom);
```

Et au chargement de la page (en haut de `app.js`) :

```javascript
const dernier = localStorage.getItem("dernierChampion");
if (dernier) {
    console.log(`Ton dernier champion était : ${dernier}`);
}
```

> **`localStorage` :** C'est un stockage clé-valeur simple dans le navigateur. `setItem(clé, valeur)` pour sauver, `getItem(clé)` pour récupérer. Les données sont des strings — pour sauver un objet, il faut utiliser `JSON.stringify()` et `JSON.parse()`.

---

## Ce que tu as construit

En partant de ZERO, tu as créé une application web fonctionnelle avec :

| Techno | Ce que tu as utilisé |
|--------|---------------------|
| **HTML** | Structure sémantique, balises, id, imbrication |
| **CSS** | Flexbox, dégradés, animations, pseudo-classes, responsive |
| **JavaScript** | Variables, objets, tableaux, fonctions, DOM, événements, callbacks |

---

## Et maintenant ?

Voici des idées pour aller plus loin (par ordre de difficulté) :

1. **Ajouter plus de champions** — simplement ajouter des objets dans `champions.js`
2. **Ajouter des images** — utiliser des images de champions avec la balise `<img>`
3. **Ajouter un filtre par rôle** — un menu déroulant qui filtre les champions avant le tirage
4. **Ajouter un historique** — garder les 5 derniers champions tirés dans une liste
5. **Ajouter un son** — jouer un son quand un champion est tiré avec `new Audio("son.mp3").play()`
6. **Utiliser une API** — au lieu de données en dur, aller chercher les données sur l'API Riot Games
7. **Apprendre un framework** — React, Vue, ou Svelte pour structurer des apps plus grosses

**Le plus important : continue à coder.** Le meilleur moyen d'apprendre, c'est de construire des trucs. Chaque projet te rend meilleur.

---

Bravo, tu viens de terminer ton premier vrai projet web ! 🎮
