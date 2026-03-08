# TP3 — JavaScript : Premiers pas

## Objectif

À la fin de ce TP, tu sauras :
- Ce qu'est une variable et comment en créer
- Les types de données (string, number, boolean)
- Comment afficher des trucs dans la console
- Comment écrire une condition (if/else)
- Comment écrire une fonction

On ne touche pas encore au HTML. On fait tout dans la **console du navigateur**.

---

## C'est quoi JavaScript ?

JavaScript (JS) c'est le langage qui rend les pages web **interactives**. Sans JS, une page web c'est un document statique (comme un PDF). Avec JS, tu peux :

- Réagir aux clics
- Modifier le contenu de la page
- Faire des calculs
- Aller chercher des données sur internet
- Créer des jeux, des applications...

> **JavaScript ≠ Java.** Ce sont deux langages COMPLÈTEMENT différents. Le nom est juste un coup marketing des années 90. Ne les confonds jamais.

---

## Où écrire du JavaScript ?

Pour l'instant, on va utiliser la **Console** du navigateur :

1. Ouvre ta page `index.html` dans Chrome
2. Appuie sur **F12** (ou clic droit → Inspecter)
3. Clique sur l'onglet **Console**
4. Tu peux taper du JS directement ici et appuyer sur Entrée

C'est parfait pour apprendre et tester des trucs rapidement.

---

## Les variables

Une variable, c'est une **boîte avec un nom** dans laquelle tu mets une valeur.

```javascript
let champion = "Yasuo";
```

- `let` = mot-clé pour **déclarer** (créer) une variable
- `champion` = le **nom** de la variable (tu choisis)
- `=` = **assignation** (met la valeur dans la boîte)
- `"Yasuo"` = la **valeur** (ici, du texte)

### 3 mots-clés pour déclarer une variable

| Mot-clé | Peut-on changer la valeur ? | Quand l'utiliser ? |
|---------|---------------------------|-------------------|
| `let` | ✅ Oui | Variable qui peut changer |
| `const` | ❌ Non | Valeur qui ne change jamais |
| `var` | ✅ Oui | **JAMAIS** (ancien, plein de bugs) |

```javascript
let score = 0;        // Score qui va changer
const MAX_SCORE = 100; // Valeur fixe

score = 10;           // ✅ OK, let permet le changement
MAX_SCORE = 200;      // ❌ ERREUR ! const ne peut pas changer
```

> **Pourquoi pas `var` ?** C'est l'ancienne façon de déclarer des variables. `var` a un comportement bizarre avec la portée (scope) des variables. `let` et `const` ont été créés en 2015 pour corriger ces problèmes. Utilise toujours `let` ou `const`.

---

## Les types de données

En JS, chaque valeur a un **type** :

| Type | Exemple | C'est quoi ? |
|------|---------|-------------|
| **String** | `"Yasuo"`, `'Garen'` | Du texte (entre guillemets) |
| **Number** | `42`, `3.14` | Un nombre (entier ou décimal) |
| **Boolean** | `true`, `false` | Vrai ou Faux |
| **Array** | `[1, 2, 3]` | Une liste ordonnée |
| **Object** | `{ nom: "Yasuo" }` | Un ensemble clé-valeur |
| **undefined** | `undefined` | Pas de valeur assignée |
| **null** | `null` | Volontairement vide |

Essaie dans la console :

```javascript
let nom = "Jinx";
let degats = 150;
let estMage = false;

console.log(nom);          // Affiche : Jinx
console.log(typeof nom);   // Affiche : string
console.log(typeof degats); // Affiche : number
```

> **`console.log()` ?** C'est la fonction pour **afficher** quelque chose dans la console. C'est ton outil de debug #1. Tu vas l'utiliser tout le temps.

---

## Les opérations de base

### Sur les nombres

```javascript
let a = 10;
let b = 3;

console.log(a + b);   // 13 (addition)
console.log(a - b);   // 7  (soustraction)
console.log(a * b);   // 30 (multiplication)
console.log(a / b);   // 3.333... (division)
console.log(a % b);   // 1  (modulo = reste de la division)
```

### Sur les strings

```javascript
let prenom = "Lux";
let titre = "la Dame Lumineuse";

let phrase = prenom + " " + titre;
console.log(phrase);  // "Lux la Dame Lumineuse"
```

Mais il y a un truc **bien plus pratique** : les **template literals** (backticks) :

```javascript
let phrase2 = `${prenom} est ${titre}`;
console.log(phrase2);  // "Lux est la Dame Lumineuse"
```

> **Pourquoi les backticks sont mieux ?** Avec les `+`, ça devient vite illisible quand tu as beaucoup de variables. Les backticks (`` ` ``) te permettent d'insérer des variables directement dans le texte avec `${}`. C'est plus propre et plus lisible.

---

## Les conditions : if / else

Les conditions permettent de faire des choix :

```javascript
let role = "Assassin";

if (role === "Assassin") {
    console.log("Attention, champion fragile mais dangereux !");
} else if (role === "Tank") {
    console.log("Champion costaud, fonce dans le tas !");
} else {
    console.log("Rôle classique, amuse-toi bien !");
}
```

### Opérateurs de comparaison

| Opérateur | Signification | Exemple |
|-----------|---------------|---------|
| `===` | Strictement égal | `5 === 5` → true |
| `!==` | Strictement différent | `5 !== 3` → true |
| `>` | Supérieur | `5 > 3` → true |
| `<` | Inférieur | `3 < 5` → true |
| `>=` | Supérieur ou égal | `5 >= 5` → true |
| `<=` | Inférieur ou égal | `3 <= 5` → true |

> **Pourquoi `===` et pas `==` ?** `==` fait des conversions bizarres. Par exemple `"5" == 5` renvoie `true` (il convertit le texte en nombre). `===` compare la valeur ET le type : `"5" === 5` renvoie `false` (string ≠ number). Utilise **toujours** `===`.

---

## Les fonctions

Une fonction, c'est un **bloc de code réutilisable** auquel tu donnes un nom :

```javascript
function saluer(nom) {
    console.log(`Salut ${nom} !`);
}

saluer("Yasuo");  // Affiche : Salut Yasuo !
saluer("Lux");    // Affiche : Salut Lux !
```

- `function` = mot-clé pour déclarer une fonction
- `saluer` = le nom de la fonction
- `(nom)` = le **paramètre** (une variable locale à la fonction)
- `{ ... }` = le corps de la fonction (ce qu'elle fait)

### Fonctions qui retournent une valeur

```javascript
function calculerDegats(base, multiplicateur) {
    let resultat = base * multiplicateur;
    return resultat;
}

let degats = calculerDegats(100, 1.5);
console.log(degats);  // 150
```

`return` renvoie une valeur. Sans `return`, la fonction renvoie `undefined`.

### Les fonctions fléchées (arrow functions)

C'est une syntaxe plus courte :

```javascript
const saluer = (nom) => {
    console.log(`Salut ${nom} !`);
};

const doubler = (n) => n * 2;

console.log(doubler(5));  // 10
```

> **Pourquoi deux syntaxes ?** Les fonctions fléchées (`=>`) ont été ajoutées en 2015. Elles sont plus courtes et ont un comportement différent avec `this` (un concept avancé). Pour l'instant, tu peux utiliser l'une ou l'autre. Les fonctions fléchées sont très populaires dans le code moderne.

---

## Les tableaux (Arrays)

Un tableau c'est une **liste ordonnée** de valeurs :

```javascript
let champions = ["Yasuo", "Lux", "Garen", "Jinx", "Thresh"];

console.log(champions[0]);     // "Yasuo"  (le premier !)
console.log(champions[2]);     // "Garen"
console.log(champions.length); // 5 (nombre d'éléments)
```

> **Pourquoi ça commence à 0 ?** Convention historique en informatique. Le premier élément est à l'index 0, le deuxième à l'index 1, etc. C'est perturbant au début, mais tu t'y habitueras.

### Opérations utiles sur les tableaux

```javascript
champions.push("Ahri");         // Ajoute à la fin
console.log(champions.length);  // 6

champions.includes("Lux");     // true (vérifie si présent)
champions.indexOf("Garen");    // 2 (donne l'index)
```

---

## Exercice pratique dans la console

Tape tout ça dans la console, ligne par ligne :

```javascript
// 1. Crée un tableau de 5 champions
let mesChampions = ["Darius", "Ahri", "Zed", "Leona", "Ezreal"];

// 2. Crée une fonction qui prend un tableau et retourne un élément aléatoire
function elementAleatoire(tableau) {
    let index = Math.floor(Math.random() * tableau.length);
    return tableau[index];
}

// 3. Teste-la
console.log(elementAleatoire(mesChampions));
console.log(elementAleatoire(mesChampions));
console.log(elementAleatoire(mesChampions));
```

### Décortiquons `Math.floor(Math.random() * tableau.length)`

C'est LA ligne la plus importante du projet. Décomposons-la :

1. `Math.random()` → donne un nombre décimal entre 0 et 1 (ex: `0.7362`)
2. `* tableau.length` → on multiplie par la taille du tableau (ex: `0.7362 * 5 = 3.681`)
3. `Math.floor()` → arrondit vers le bas (ex: `3.681` → `3`)

Résultat : un index aléatoire valide pour notre tableau (entre 0 et 4).

---

## Résumé

| Concept | Ce que tu as appris |
|---------|-------------------|
| Variables | `let` (modifiable), `const` (fixe) |
| Types | String, Number, Boolean, Array |
| Console | `console.log()` pour afficher/debugger |
| Conditions | `if`, `else if`, `else`, `===` |
| Fonctions | `function nom(param) { }` et `() => {}` |
| Tableaux | `[]`, `.push()`, `.length`, index à partir de 0 |
| Aléatoire | `Math.floor(Math.random() * n)` |

---

**→ Prochaine étape : [TP4 — Les objets : structurer les données des champions](tp4-objets-et-donnees.md)**
