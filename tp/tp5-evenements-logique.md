# TP5 — Événements et logique : rendre l'app interactive

## Objectif

À la fin de ce TP, ton app sera **fonctionnelle** :
- Le bouton réagit au clic
- Un champion aléatoire s'affiche
- Son build apparaît dans la liste

C'est ici que tout s'assemble !

---

## C'est quoi un événement ?

Un **événement**, c'est quelque chose qui se **passe** dans le navigateur :

| Événement | Quand ? |
|-----------|---------|
| `click` | L'utilisateur clique |
| `mouseover` | La souris survole un élément |
| `keydown` | Une touche du clavier est pressée |
| `submit` | Un formulaire est soumis |
| `load` | La page a fini de charger |

Le JavaScript peut **écouter** ces événements et **réagir** quand ils se produisent.

---

## Le DOM : le lien entre HTML et JavaScript

Le **DOM** (Document Object Model), c'est la représentation du HTML en tant qu'objets JavaScript.

Quand le navigateur lit ton HTML :

```html
<h2 id="champion-name">???</h2>
```

Il crée un **objet JavaScript** qui représente ce `<h2>`. Tu peux le récupérer et le modifier :

```javascript
let titre = document.getElementById("champion-name");
console.log(titre.textContent);  // "???"

titre.textContent = "Yasuo";     // Change le texte affiché !
```

> **Pourquoi c'est important ?** C'est le pont entre ton HTML (ce que l'utilisateur voit) et ton JavaScript (ta logique). Tu modifies le DOM → la page se met à jour instantanément.

### Les méthodes pour sélectionner des éléments

| Méthode | Sélectionne | Exemple |
|---------|-------------|---------|
| `getElementById("id")` | UN élément par son id | `document.getElementById("btn-pick")` |
| `querySelector(".classe")` | Le PREMIER élément correspondant | `document.querySelector(".card")` |
| `querySelectorAll("li")` | TOUS les éléments correspondants | `document.querySelectorAll("li")` |

---

## Créer le fichier principal

Crée un nouveau fichier `app.js` dans ton dossier.

> **Pourquoi un fichier séparé de `champions.js` ?** Séparation des responsabilités. `champions.js` contient les **données**. `app.js` contient la **logique** (le comportement). Si tu veux ajouter des champions, tu modifies un fichier. Si tu veux changer le comportement, tu modifies l'autre.

Ajoute-le dans `index.html`, **après** `champions.js` :

```html
    <script src="champions.js"></script>
    <script src="app.js"></script>
</body>
```

> **L'ordre compte !** `app.js` utilise le tableau `champions` défini dans `champions.js`. Si tu mets `app.js` en premier, il ne trouvera pas `champions` et tu auras une erreur.

---

## Étape 1 : Récupérer les éléments du DOM

Dans `app.js`, commence par récupérer tous les éléments qu'on va manipuler :

```javascript
const btnPick = document.getElementById("btn-pick");
const championName = document.getElementById("champion-name");
const championRole = document.getElementById("champion-role");
const buildList = document.getElementById("build-list");
```

### Pourquoi stocker dans des constantes ?

On va utiliser ces éléments plusieurs fois. Au lieu de réécrire `document.getElementById(...)` à chaque fois, on les stocke une seule fois dans des variables. C'est :
- Plus lisible
- Plus performant (le navigateur ne cherche l'élément qu'une fois)
- Plus facile à maintenir

---

## Étape 2 : La fonction de sélection aléatoire

```javascript
function getRandomChampion() {
    const index = Math.floor(Math.random() * champions.length);
    return champions[index];
}
```

On a vu cette logique dans le TP3. Ici, on la met dans une fonction propre et réutilisable.

---

## Étape 3 : La fonction d'affichage

C'est la fonction qui met à jour la page avec les infos du champion :

```javascript
function displayChampion(champion) {
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

### Décortiquons cette fonction

**`championName.textContent = champion.nom;`**
Change le texte du `<h2>`. Si le champion est Yasuo, le "???" devient "Yasuo".

**`buildList.innerHTML = "";`**
Vide complètement la liste du build. `innerHTML` c'est le contenu HTML d'un élément. En le mettant à `""` (vide), on supprime tout ce qu'il y avait avant.

> **Pourquoi vider la liste ?** Parce qu'on va remplir avec un nouveau build. Si on ne vide pas, les objets du nouveau build s'ajoutent APRÈS ceux de l'ancien.

**`document.createElement("li")`**
Crée un nouvel élément `<li>` (en mémoire, pas encore sur la page).

**`buildList.appendChild(li)`**
Ajoute cet élément comme enfant de la liste `<ul>`. C'est à ce moment qu'il apparaît sur la page.

> **Pourquoi ne pas juste utiliser `innerHTML` pour tout ?** On pourrait écrire `buildList.innerHTML = "<li>objet1</li><li>objet2</li>"`. Ça marche, mais `createElement` + `appendChild` est plus sûr (pas de risque d'injection HTML) et plus performant pour de grosses listes.

---

## Étape 4 : Écouter le clic sur le bouton

```javascript
btnPick.addEventListener("click", function() {
    const champion = getRandomChampion();
    displayChampion(champion);
});
```

### C'est quoi `addEventListener` ?

C'est la méthode pour **écouter un événement** sur un élément :

- `btnPick` = l'élément qu'on écoute (le bouton)
- `"click"` = l'événement qu'on attend
- `function() { ... }` = ce qu'on fait quand ça arrive (le **callback**)

> **C'est quoi un callback ?** C'est une fonction passée en argument à une autre fonction, qui sera exécutée **plus tard** (quand l'événement se produit). Ici, la fonction anonyme n'est pas exécutée immédiatement — elle attend qu'un clic se produise.

En français : "Quand quelqu'un clique sur le bouton, choisis un champion aléatoire et affiche-le."

---

## Le code complet de `app.js`

```javascript
const btnPick = document.getElementById("btn-pick");
const championName = document.getElementById("champion-name");
const championRole = document.getElementById("champion-role");
const buildList = document.getElementById("build-list");

function getRandomChampion() {
    const index = Math.floor(Math.random() * champions.length);
    return champions[index];
}

function displayChampion(champion) {
    championName.textContent = champion.nom;
    championRole.textContent = `${champion.role} — ${champion.difficulte}`;

    buildList.innerHTML = "";

    champion.build.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        buildList.appendChild(li);
    });
}

btnPick.addEventListener("click", function() {
    const champion = getRandomChampion();
    displayChampion(champion);
});
```

---

## Teste ton app !

1. Enregistre tous les fichiers
2. Rafraîchis la page dans le navigateur
3. Clique sur le bouton "🎲 Tirer un Champion"

**Tu devrais voir :**
- Le nom du champion changer
- Son rôle et difficulté apparaître
- La liste du build se mettre à jour

**Clique plusieurs fois** — un champion différent apparaît à chaque fois (parfois le même, c'est normal, c'est aléatoire).

---

## Débugger si ça marche pas

Ouvre la console (F12) et regarde s'il y a des erreurs en rouge.

| Erreur courante | Cause | Solution |
|----------------|-------|----------|
| `champions is not defined` | `champions.js` n'est pas chargé ou est chargé APRÈS `app.js` | Vérifie l'ordre des `<script>` |
| `Cannot read property of null` | Un `getElementById` ne trouve pas l'élément | Vérifie que les `id` dans le HTML correspondent |
| Rien ne se passe au clic | L'événement n'est pas attaché | Vérifie que `app.js` est bien chargé |

> **La console est ton meilleur ami pour debugger.** Si quelque chose ne marche pas, la réponse est presque toujours dans la console.

---

## Comment ça marche : le flux complet

```
1. Le navigateur charge index.html
2. Il lit le CSS → applique les styles
3. Il charge champions.js → le tableau `champions` existe en mémoire
4. Il charge app.js → les éléments du DOM sont récupérés, l'événement est attaché
5. L'utilisateur attend...
6. *CLIC sur le bouton*
7. addEventListener déclenche la fonction callback
8. getRandomChampion() choisit un champion au hasard
9. displayChampion() met à jour le DOM
10. L'utilisateur voit le résultat instantanément
```

---

## Résumé

| Concept | Ce que tu as appris |
|---------|-------------------|
| DOM | Le HTML vu comme des objets JavaScript |
| `getElementById` | Récupérer un élément par son id |
| `textContent` | Modifier le texte d'un élément |
| `innerHTML` | Modifier le contenu HTML d'un élément |
| `createElement` | Créer un nouvel élément en JS |
| `appendChild` | Ajouter un élément comme enfant |
| `addEventListener` | Écouter un événement (clic, etc.) |
| Callback | Fonction exécutée quand un événement se produit |

---

**→ Prochaine étape : [TP6 — Améliorations et finalisation](tp6-ameliorations-finales.md)**
