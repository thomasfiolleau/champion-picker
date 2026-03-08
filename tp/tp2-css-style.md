# TP2 — CSS : Donner du style à la page

## Objectif

À la fin de ce TP, ta page sera :

- Avec un fond sombre (thème gaming)
- Les textes centrés et lisibles
- Le bouton stylé et réactif au survol
- Le résultat mis en avant dans une carte

---

## C'est quoi le CSS ?

CSS = **C**ascading **S**tyle **S**heets (feuilles de style en cascade).

Si le HTML dit **QUOI** afficher, le CSS dit **COMMENT** l'afficher : couleurs, tailles, positions, espacements, animations...

### La syntaxe CSS

```css
sélecteur {
  propriété: valeur;
}
```

Exemple :

```css
h1 {
  color: white;
  font-size: 32px;
}
```

Ça veut dire : "Tous les `<h1>` de la page auront un texte blanc de taille 32 pixels."

---

## 3 façons d'ajouter du CSS

| Méthode     | Où ?                                                   | Quand l'utiliser ?                    |
| ----------- | ------------------------------------------------------ | ------------------------------------- |
| **Inline**  | Directement dans la balise : `<h1 style="color: red">` | Jamais (ou presque). C'est le bordel. |
| **Interne** | Dans un `<style>` dans le `<head>`                     | Pour un petit projet / apprendre      |
| **Externe** | Dans un fichier `.css` séparé                          | Pour tout projet sérieux              |

> **Pourquoi un fichier séparé ?** Ça sépare le contenu (HTML) de la présentation (CSS). Si tu veux changer toutes les couleurs de ton site, tu modifies UN fichier CSS au lieu de fouiller dans 50 fichiers HTML. C'est le principe de **séparation des responsabilités**.

On va utiliser la **méthode externe** parce que c'est la bonne pratique.

---

## Créer le fichier CSS

1. Dans VS Code, crée un nouveau fichier : `style.css` (dans le même dossier que `index.html`)
2. Dans `index.html`, ajoute cette ligne dans le `<head>`, juste avant `</head>` :

```html
<link rel="stylesheet" href="style.css" />
```

> **Qu'est-ce que ça fait ?** La balise `<link>` dit au navigateur "va chercher le fichier `style.css` et applique les styles qu'il contient à cette page". `rel="stylesheet"` précise que c'est une feuille de style. `href` c'est le chemin vers le fichier.

---

## Le CSS de base : Reset et Body

Ouvre `style.css` et commence par ceci :

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### Pourquoi ce "reset" ?

Chaque navigateur applique des styles par défaut (des marges, des espacements). Le problème : ces styles varient d'un navigateur à l'autre. Ce reset dit :

- `*` = sélectionne TOUT (toutes les balises)
- `margin: 0` = pas de marge extérieure
- `padding: 0` = pas de marge intérieure
- `box-sizing: border-box` = les tailles incluent les bordures et paddings (sinon le calcul des tailles devient un cauchemar)

Maintenant, le body :

```css
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #0a0a1a;
  color: #e0e0e0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### Explication propriété par propriété

| Propriété                 | Valeur                        | Pourquoi                                                                                                                               |
| ------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `font-family`             | Liste de polices              | Le navigateur utilise la première disponible. Si "Segoe UI" n'existe pas, il essaie Tahoma, etc. `sans-serif` est le filet de sécurité |
| `background-color`        | `#0a0a1a`                     | Un bleu très foncé (presque noir). Les couleurs en hexa : `#RRGGBB` où chaque paire va de 00 (rien) à FF (max)                         |
| `color`                   | `#e0e0e0`                     | Gris clair pour le texte. Sur fond sombre, le blanc pur (#ffffff) fatigue les yeux                                                     |
| `min-height: 100vh`       | 100% de la hauteur de l'écran | `vh` = viewport height. `100vh` = toute la hauteur visible                                                                             |
| `display: flex`           | Active Flexbox                | Un système de positionnement. C'est le plus important à apprendre en CSS                                                               |
| `justify-content: center` | Centre horizontalement        | Avec flexbox, ça centre le contenu sur l'axe principal                                                                                 |
| `align-items: center`     | Centre verticalement          | Centre le contenu sur l'axe secondaire                                                                                                 |

> **C'est quoi Flexbox ?** C'est un mode de disposition CSS. Avant Flexbox, centrer un élément verticalement en CSS c'était un cauchemar. Maintenant c'est 3 lignes. On l'utilise partout.

---

## Styliser le conteneur principal

```css
#app {
  text-align: center;
  padding: 40px;
  max-width: 600px;
  width: 100%;
}
```

> **Le `#` devant `app` ?** C'est un **sélecteur d'id**. `#app` cible l'élément qui a `id="app"`. En comparaison, un simple `h1` cible TOUTES les balises `<h1>`. Et `.classe` (avec un point) cible tous les éléments avec `class="classe"`.

---

## Styliser le titre et le texte

```css
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
```

### Nouveaux concepts

| Concept                 | Explication                                                                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `rem`                   | Unité relative à la taille de police de base (16px par défaut). `2.5rem` = 40px. C'est mieux que `px` pour l'accessibilité          |
| `linear-gradient`       | Un dégradé de couleurs. Ici, du bleu (#667eea) au violet (#764ba2) à 135 degrés                                                     |
| `background-clip: text` | Le dégradé est appliqué uniquement sur le texte (pas sur le fond). Effet stylé !                                                    |
| `#app > p`              | Le `>` signifie "enfant direct". Ça cible les `<p>` qui sont directement dans `#app`, pas ceux qui sont plus profondément imbriqués |

---

## Styliser le bouton

```css
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
```

### Ce qu'il y a de nouveau

| Propriété                   | Explication                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| `border: none`              | Enlève la bordure par défaut du bouton                                                                |
| `border-radius: 50px`       | Arrondit les coins. 50px avec un bouton de cette taille = pilule                                      |
| `cursor: pointer`           | La souris devient une main au survol (indique que c'est cliquable)                                    |
| `transition: all 0.3s ease` | Toute modification de style se fait en douceur sur 0.3 secondes                                       |
| `:hover`                    | **Pseudo-classe** : s'applique quand la souris survole l'élément                                      |
| `:active`                   | S'applique quand on clique (le bouton est enfoncé)                                                    |
| `transform: scale(1.05)`    | Agrandit l'élément de 5%                                                                              |
| `box-shadow`                | Ajoute une ombre. `rgba()` permet de définir une couleur avec transparence (le `a` = alpha = opacité) |

---

## Styliser la zone de résultat

```css
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
```

> **Pourquoi `rgba(255, 255, 255, 0.05)` ?** C'est du blanc avec 5% d'opacité. Sur notre fond sombre, ça crée un effet de "carte" légèrement plus claire que le fond. C'est subtil mais ça délimite visuellement la zone.

---

## Styliser le build

```css
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
```

### Nouveaux concepts

| Propriété          | Explication                                                               |
| ------------------ | ------------------------------------------------------------------------- |
| `list-style: none` | Enlève les puces de la liste                                              |
| `flex-wrap: wrap`  | Si les éléments ne tiennent pas en ligne, ils passent à la ligne suivante |
| `gap: 10px`        | Espace de 10px entre chaque élément flex                                  |

---

## Vérifie ton travail

Enregistre les deux fichiers et rafraîchis la page. Tu devrais voir :

- Un fond sombre
- Le titre avec un dégradé bleu-violet
- Un beau bouton arrondi qui réagit au survol
- Une carte avec "???" et le build

**C'est déjà beaucoup plus classe !** Et le bouton ne fait toujours rien — c'est le boulot du JavaScript, qu'on voit au prochain TP.

---

## Exercice bonus

Essaie de changer les couleurs du dégradé du titre. Remplace `#667eea` et `#764ba2` par d'autres couleurs. Tu peux utiliser un outil comme https://coolors.co pour trouver de belles combinaisons.

---

## Résumé

| Concept     | Ce que tu as appris                                      |
| ----------- | -------------------------------------------------------- |
| Sélecteurs  | `balise`, `#id`, `.classe`, `parent > enfant`, `:hover`  |
| Box model   | `margin`, `padding`, `border`                            |
| Flexbox     | `display: flex`, `justify-content`, `align-items`, `gap` |
| Couleurs    | Hex (`#667eea`), `rgba()`, `linear-gradient()`           |
| Transitions | `transition`, `transform`                                |
| Unités      | `px`, `rem`, `vh`, `%`                                   |

---

**→ Prochaine étape : [TP3 — Premiers pas en JavaScript](tp3-javascript-bases.md)**
