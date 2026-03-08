# TP1 — HTML : Construire le squelette de la page

## Objectif

À la fin de ce TP, tu auras une page avec :
- Un titre
- Une zone pour afficher le champion
- Un bouton "Tirer un champion"
- Une zone pour afficher le build

Pas de style, pas d'interactivité encore — juste la **structure**.

---

## C'est quoi le HTML ?

HTML = **H**yper**T**ext **M**arkup **L**anguage (langage de balisage hypertexte).

C'est un système de **balises** (tags). Une balise, c'est un mot entre `< >` :

```html
<p>Ceci est un paragraphe</p>
```

- `<p>` = balise **ouvrante** (début du paragraphe)
- `</p>` = balise **fermante** (fin du paragraphe, avec le `/`)
- Le texte entre les deux = le **contenu**

> **Pourquoi des balises ?** Parce que le navigateur a besoin de savoir QUOI est chaque élément. Est-ce un titre ? Un paragraphe ? Un bouton ? Une image ? Les balises lui donnent cette info.

---

## Les balises essentielles

| Balise | Signification | Quand l'utiliser |
|--------|--------------|-----------------|
| `<h1>` à `<h6>` | Heading (titre) | Titres de section. `<h1>` = le plus gros |
| `<p>` | Paragraph | Du texte normal |
| `<div>` | Division | Un bloc/conteneur pour regrouper des éléments |
| `<button>` | Bouton | Un bouton cliquable |
| `<img>` | Image | Afficher une image |
| `<span>` | Span | Un petit bout de texte dans une ligne |

---

## La structure de base d'une page HTML

Remplace tout le contenu de ton `index.html` par ceci :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Champion Picker</title>
</head>
<body>

    <h1>Random Champion Picker</h1>

</body>
</html>
```

### Explication ligne par ligne

| Ligne | Explication |
|-------|-------------|
| `<!DOCTYPE html>` | Dit au navigateur "ce fichier est du HTML5" (la version actuelle) |
| `<html lang="fr">` | La racine de toute la page. `lang="fr"` indique que c'est en français |
| `<head>` | La "tête" : contient des infos POUR le navigateur (pas affichées à l'écran) |
| `<meta charset="UTF-8">` | Permet d'afficher les accents (é, è, ê, etc.) correctement |
| `<meta name="viewport"...>` | Rend la page responsive (lisible sur mobile) |
| `<title>` | Le texte affiché dans l'onglet du navigateur |
| `<body>` | Le "corps" : tout ce qui est VISIBLE sur la page va ici |
| `<h1>` | Notre titre principal |

> **Pourquoi séparer `<head>` et `<body>` ?** Le `<head>` c'est les "réglages" de la page (titre de l'onglet, encodage, liens vers les fichiers CSS...). Le `<body>` c'est ce que l'utilisateur voit. Le navigateur a besoin de cette séparation pour savoir quoi afficher et quoi garder en coulisse.

---

## Ajouter la structure du Champion Picker

Maintenant, on va ajouter tous les éléments dont on a besoin. Remplace le contenu du `<body>` :

```html
<body>

    <div id="app">

        <h1>🎮 Random Champion Picker</h1>
        <p>Clique sur le bouton pour découvrir ton champion !</p>

        <button id="btn-pick">🎲 Tirer un Champion</button>

        <div id="result">
            <div id="champion-info">
                <h2 id="champion-name">???</h2>
                <p id="champion-role">En attente...</p>
            </div>

            <div id="build-info">
                <h3>Build recommandé</h3>
                <ul id="build-list">
                    <li>Clique sur le bouton pour voir le build</li>
                </ul>
            </div>
        </div>

    </div>

</body>
```

### Explication de chaque élément

**`<div id="app">`**
Un conteneur qui englobe TOUT notre app. On lui donne un `id` pour pouvoir le cibler facilement en CSS et JavaScript plus tard.

> **C'est quoi un `id` ?** C'est un identifiant UNIQUE. Comme un numéro de sécurité sociale : chaque élément ne peut avoir qu'un seul `id`, et chaque `id` ne peut être utilisé qu'une seule fois dans la page. On s'en sert pour retrouver un élément précis.

**`<button id="btn-pick">`**
Le bouton sur lequel l'utilisateur va cliquer. On lui donne un `id` parce qu'en JavaScript, on va avoir besoin de "l'écouter" (détecter quand il est cliqué).

**`<div id="result">`**
Le conteneur pour le résultat. Pour l'instant il affiche "???" et "En attente...".

**`<h2 id="champion-name">???</h2>`**
Le nom du champion. On utilise `<h2>` (sous-titre) parce que `<h1>` est déjà pris par le titre principal. En HTML, on utilise les titres par ordre hiérarchique.

**`<ul>` et `<li>`**
`<ul>` = **U**nordered **L**ist (liste à puces). Chaque élément de la liste est un `<li>` (**L**ist **I**tem). On les utilise pour la liste des objets du build.

---

## Vérifie ton travail

1. Enregistre le fichier (Ctrl+S)
2. Ouvre-le dans ton navigateur (ou rafraîchis la page avec F5)

Tu devrais voir :
- Le titre "🎮 Random Champion Picker"
- Le texte d'instruction
- Un bouton (qui ne fait rien encore, c'est normal)
- "???" et "En attente..."
- "Build recommandé" avec un élément de liste

C'est moche ? **C'est normal.** On n'a pas encore touché au CSS. Le HTML brut, c'est comme une maison sans peinture ni meubles : la structure est là, mais c'est pas joli.

---

## Les erreurs courantes à éviter

| Erreur | Exemple | Correction |
|--------|---------|------------|
| Oublier la balise fermante | `<h1>Titre` | `<h1>Titre</h1>` |
| Mal imbriquer les balises | `<div><p></div></p>` | `<div><p></p></div>` |
| Mettre un espace dans l'id | `id="mon id"` | `id="mon-id"` |
| Utiliser le même id deux fois | Deux `id="name"` | Chaque id doit être unique |

> **Astuce** : dans VS Code, les balises sont colorées. Si tu vois une balise en rouge ou un soulignement bizarre, tu as probablement une erreur de syntaxe.

---

## Exercice bonus

Essaie d'ajouter un `<footer>` en bas de la page (après le `</div>` de `#app` mais avant `</body>`) avec un petit texte comme "Fait avec ❤️ par [ton prénom]". Un `<footer>` c'est une balise sémantique qui indique le pied de page.

```html
<footer>
    <p>Fait avec ❤️ par Moi</p>
</footer>
```

---

## Résumé

| Concept | Ce que tu as appris |
|---------|-------------------|
| Balises | Le HTML est composé de balises ouvrantes et fermantes |
| Structure | `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` |
| Hiérarchie | Les éléments sont imbriqués les uns dans les autres |
| id | Un identifiant unique pour cibler un élément |
| Balises courantes | `<h1>`, `<p>`, `<div>`, `<button>`, `<ul>`, `<li>` |

---

**→ Prochaine étape : [TP2 — Styliser avec CSS](tp2-css-style.md)**
