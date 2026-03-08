# TP4 — Les objets : structurer les données des champions

## Objectif

À la fin de ce TP, tu sauras :
- Créer et utiliser des objets JavaScript
- Structurer des données complexes (un champion avec son nom, rôle, build...)
- Parcourir des tableaux d'objets
- Pourquoi les objets sont le cœur de la programmation

---

## C'est quoi un objet ?

Un objet, c'est un **regroupement de données liées entre elles**.

Imagine un champion de LoL. Il a un nom, un rôle, des sorts, un build... Toutes ces infos **appartiennent au même champion**. Un objet permet de les regrouper :

```javascript
let champion = {
    nom: "Yasuo",
    role: "Combattant",
    difficulte: 10
};
```

- `{ }` = les accolades délimitent l'objet
- `nom: "Yasuo"` = une **propriété** (clé: valeur)
- Les propriétés sont séparées par des virgules

### Accéder aux propriétés

```javascript
console.log(champion.nom);        // "Yasuo"
console.log(champion.role);       // "Combattant"
console.log(champion["difficulte"]); // 10 (autre syntaxe)
```

> **`.nom` vs `["nom"]` ?** Les deux marchent. Le point (`.`) est plus courant et plus lisible. Les crochets (`["..."]`) sont utiles quand le nom de la propriété est dans une variable ou contient des caractères spéciaux.

---

## Objets imbriqués (objets dans des objets)

Un objet peut contenir d'autres objets et des tableaux :

```javascript
let champion = {
    nom: "Jinx",
    role: "Tireur",
    difficulte: 6,
    stats: {
        pv: 610,
        attaque: 57,
        vitesse: 325
    },
    sorts: ["Pow-Pow", "Zap!", "Mâchoire", "Méga Rocket"]
};
```

Pour accéder aux données imbriquées :

```javascript
console.log(champion.stats.pv);    // 610
console.log(champion.sorts[0]);    // "Pow-Pow"
console.log(champion.sorts[2]);    // "Mâchoire"
```

> **Pourquoi imbriquer ?** Parce que les données du monde réel sont complexes. Un champion n'a pas juste un nom — il a des stats, des sorts, un build... L'imbrication reflète cette complexité de manière organisée.

---

## Créer notre base de données de champions

C'est le moment de créer les données de notre projet. On va créer un **tableau d'objets** : chaque objet représente un champion avec toutes ses infos.

Crée un nouveau fichier `champions.js` dans ton dossier `champion-picker` :

```javascript
const champions = [
    {
        nom: "Yasuo",
        role: "Combattant / Assassin",
        difficulte: "Difficile",
        description: "Un samouraï errant qui contrôle le vent.",
        build: [
            "Lame d'infini",
            "Danseur fantôme",
            "Coupeur d'os immortel",
            "Mort du danseur",
            "Ange gardien"
        ]
    },
    {
        nom: "Lux",
        role: "Mage / Support",
        difficulte: "Facile",
        description: "Une magicienne de la lumière de Demacia.",
        build: [
            "Luminescence de Luden",
            "Chapeau de Rabadon",
            "Bâton du vide",
            "Sablier de Zhonya",
            "Orbe de la morellenomicon"
        ]
    },
    {
        nom: "Garen",
        role: "Tank / Combattant",
        difficulte: "Facile",
        description: "Le fier guerrier de Demacia, simple mais efficace.",
        build: [
            "Fendeur de Stridebreaker",
            "Mort du danseur",
            "Plate de Sterak",
            "Armure de Randuin",
            "Force de la nature"
        ]
    },
    {
        nom: "Jinx",
        role: "Tireur",
        difficulte: "Moyen",
        description: "Une criminelle surexcitée fan de chaos et d'explosions.",
        build: [
            "Kraken Slayer",
            "Ouragan de Runaan",
            "Lame d'infini",
            "Rappel de Lord Dominik",
            "Danse de la mort"
        ]
    },
    {
        nom: "Thresh",
        role: "Support / Tank",
        difficulte: "Difficile",
        description: "Le geôlier spectral qui collecte les âmes.",
        build: [
            "Mélodie spectrale",
            "Armure de Zeke",
            "Vœu du chevalier",
            "Cœur de glace",
            "Rédemption"
        ]
    },
    {
        nom: "Ahri",
        role: "Mage / Assassin",
        difficulte: "Moyen",
        description: "Une renarde à neuf queues, charmeuse et mortelle.",
        build: [
            "Luminescence de Luden",
            "Chapeau de Rabadon",
            "Sablier de Zhonya",
            "Hextèque de rocketbelt",
            "Bâton du vide"
        ]
    },
    {
        nom: "Darius",
        role: "Combattant / Tank",
        difficulte: "Moyen",
        description: "Le bourreau de Noxus. Un dunk et c'est fini.",
        build: [
            "Hache noire",
            "Fendeur de Stridebreaker",
            "Plate de Sterak",
            "Cœur de glace",
            "Ange gardien"
        ]
    },
    {
        nom: "Zed",
        role: "Assassin",
        difficulte: "Difficile",
        description: "Le maître des ombres, furtif et mortel.",
        build: [
            "Eclipse",
            "Lame du collectionneur",
            "Rancune de Serylda",
            "Lame d'infini",
            "Danse de la mort"
        ]
    }
];
```

### Pourquoi `const` et pas `let` ?

On utilise `const` parce que la **référence** au tableau ne va jamais changer. On ne va pas faire `champions = autreTableau`. Par contre, on peut toujours modifier le contenu du tableau (ajouter/supprimer des champions) — `const` empêche seulement de réassigner la variable.

### Pourquoi un tableau d'objets ?

C'est le pattern le plus courant en programmation : une **collection d'éléments structurés**. Tu le retrouveras partout :

- Une liste d'utilisateurs
- Un catalogue de produits
- Des messages dans un chat
- Des posts sur un réseau social

---

## Lier le fichier JavaScript au HTML

Retourne dans `index.html` et ajoute cette ligne **juste avant `</body>`** :

```html
    <script src="champions.js"></script>
</body>
```

> **Pourquoi en bas du `<body>` ?** Si tu mets le `<script>` dans le `<head>`, le JavaScript s'exécute AVANT que le HTML soit chargé. Résultat : le JS essaie de manipuler des éléments qui n'existent pas encore → erreur. En le mettant en bas, on est sûr que tout le HTML est chargé avant d'exécuter le JS.

---

## Tester dans la console

1. Enregistre tout et rafraîchis la page
2. Ouvre la console (F12)
3. Tape :

```javascript
console.log(champions);            // Affiche le tableau complet
console.log(champions[0]);         // Le premier champion (Yasuo)
console.log(champions[0].nom);     // "Yasuo"
console.log(champions[3].build);   // Le build de Jinx
console.log(champions.length);     // 8 (nombre de champions)
```

Si ça marche, le fichier est bien lié.

---

## Parcourir un tableau d'objets

### Avec une boucle `for`

```javascript
for (let i = 0; i < champions.length; i++) {
    console.log(champions[i].nom);
}
```

### Avec `forEach` (plus moderne)

```javascript
champions.forEach(function(champ) {
    console.log(`${champ.nom} - ${champ.role}`);
});
```

### Avec une arrow function (encore plus court)

```javascript
champions.forEach(champ => {
    console.log(`${champ.nom} - ${champ.role}`);
});
```

> **`forEach` vs `for` ?** `forEach` est plus lisible et plus "moderne". La boucle `for` classique est utile quand tu as besoin de l'index ou de casser la boucle avec `break`. Pour simplement parcourir tous les éléments, `forEach` est parfait.

---

## Exercice pratique

Dans la console, essaie :

### 1. Trouver les champions "Difficile"

```javascript
let champsDifficiles = champions.filter(champ => champ.difficulte === "Difficile");
console.log(champsDifficiles);
```

> **`filter()` ?** C'est une méthode qui crée un NOUVEAU tableau contenant uniquement les éléments qui passent le test. Ici, seuls les champions avec `difficulte === "Difficile"` sont gardés.

### 2. Obtenir juste les noms

```javascript
let noms = champions.map(champ => champ.nom);
console.log(noms);
// ["Yasuo", "Lux", "Garen", "Jinx", "Thresh", "Ahri", "Darius", "Zed"]
```

> **`map()` ?** C'est une méthode qui crée un NOUVEAU tableau en transformant chaque élément. Ici, on transforme chaque objet champion en juste son nom.

### 3. Champion aléatoire

```javascript
let random = champions[Math.floor(Math.random() * champions.length)];
console.log(`${random.nom} - ${random.role}`);
console.log("Build :", random.build);
```

C'est exactement ce qu'on va faire dans l'app !

---

## Résumé

| Concept | Ce que tu as appris |
|---------|-------------------|
| Objets | `{ clé: valeur }` pour regrouper des données |
| Propriétés | Accès avec `.` ou `[""]` |
| Imbrication | Objets dans des objets, tableaux dans des objets |
| Tableau d'objets | Le pattern le plus courant pour des collections |
| `<script src>` | Lier un fichier JS au HTML |
| `filter()` | Filtrer un tableau selon une condition |
| `map()` | Transformer chaque élément d'un tableau |

---

**→ Prochaine étape : [TP5 — Événements et logique : rendre l'app interactive](tp5-evenements-logique.md)**
