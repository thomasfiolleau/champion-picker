# TP0 — Introduction : Avant de coder

## C'est quoi le développement web ?

Quand tu ouvres un site web (genre Google, YouTube, Twitter), ton navigateur (Chrome, Firefox...) affiche une **page**. Cette page est construite avec **3 langages** :

| Langage | Rôle | Analogie |
|---------|------|----------|
| **HTML** | La **structure** — le squelette | Les murs, le toit, les pièces d'une maison |
| **CSS** | Le **style** — l'apparence | La peinture, la déco, les meubles |
| **JavaScript** | Le **comportement** — l'interactivité | L'électricité, la plomberie, les interrupteurs |

Ces 3 langages travaillent **ensemble**. Tu ne peux pas avoir un beau site interactif sans les 3.

---

## Pourquoi ce projet ?

On va construire un **Random Champion Picker + Builds** (style League of Legends).

L'idée : tu cliques sur un bouton → un champion aléatoire apparaît avec son build recommandé.

**Ce projet est parfait pour débuter parce que :**

- Tu vois le résultat **immédiatement** dans ton navigateur
- Tu touches aux 3 langages dès le début
- C'est fun et concret (pas un énième "Hello World" ennuyeux)
- Ça t'apprend les concepts fondamentaux : variables, objets, événements, logique

---

## Ce dont tu as besoin

### 1. Un éditeur de code

Télécharge **Visual Studio Code** (VS Code) : https://code.visualstudio.com/

> **Pourquoi VS Code ?** C'est gratuit, c'est le plus utilisé au monde, et il t'aide à coder avec la coloration syntaxique (le code est coloré pour mieux le lire) et l'autocomplétion (il devine ce que tu veux écrire).

### 2. Un navigateur web

Tu en as déjà un (Chrome, Firefox, Edge...). On va utiliser **Chrome** dans les exemples parce que ses outils développeur sont les plus simples à utiliser.

### 3. Rien d'autre

Pas besoin d'installer Node.js, pas besoin de serveur, pas besoin de terminal compliqué. On fait tout avec un fichier `.html` qu'on ouvre dans le navigateur. Simple.

---

## Créer ton espace de travail

1. Crée un dossier sur ton bureau appelé `champion-picker`
2. Ouvre VS Code
3. Va dans **Fichier → Ouvrir le dossier** et sélectionne `champion-picker`
4. Dans VS Code, crée un nouveau fichier : **Fichier → Nouveau fichier**
5. Enregistre-le sous le nom `index.html`

> **Pourquoi `index.html` ?** C'est une convention. Quand un navigateur ouvre un dossier, il cherche automatiquement un fichier `index.html`. C'est la "page d'accueil" par défaut.

---

## Ton premier test

Dans `index.html`, écris juste ceci :

```html
Salut, je suis en train d'apprendre à coder !
```

Enregistre le fichier (Ctrl+S), puis double-clique dessus dans ton explorateur de fichiers. Il va s'ouvrir dans ton navigateur et afficher le texte.

**Félicitations, tu viens de créer ta première page web.**

Ce n'est pas encore du "vrai" HTML (il manque la structure), mais ça montre un truc important : **le navigateur est très tolérant**. Il essaie toujours d'afficher quelque chose, même si le code n'est pas parfait.

---

## Les outils développeur (DevTools)

C'est ton meilleur ami pour apprendre. Dans Chrome :

1. Fais un **clic droit** sur la page → **Inspecter**
2. Ou appuie sur **F12**

Tu verras plusieurs onglets :

- **Elements** : montre le HTML de la page (la structure)
- **Console** : c'est ici qu'on va tester du JavaScript et voir les erreurs
- **Styles** : montre le CSS appliqué

Essaie : clique sur l'onglet **Console**, tape `alert("Yo!")` et appuie sur Entrée. Une boîte de dialogue va apparaître. Tu viens d'exécuter du JavaScript.

---

## Résumé

| Ce que tu as fait | Ce que tu as appris |
|---|---|
| Installé VS Code | L'éditeur de code est ton outil principal |
| Créé un dossier et un fichier `.html` | Le navigateur lit des fichiers HTML |
| Ouvert le fichier dans le navigateur | Le navigateur affiche ce que tu lui donnes |
| Ouvert les DevTools | Tu peux inspecter et tester en temps réel |

---

**→ Prochaine étape : [TP1 — Construire le squelette HTML](tp1-html-structure.md)**
