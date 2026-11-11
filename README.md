# Portfolio — DANDOU Jenovi

Portfolio personnel de **DANDOU Jenovi**, technicien Systèmes & Réseaux à Brazzaville
(Congo) : administration systèmes, réseaux, cybersécurité, supervision et support IT.

Site statique, **bilingue FR/EN**, sans framework ni build : HTML, CSS et JavaScript vanilla.
Thème terminal / cyber dark, galerie de projets filtrable, fiches projets détaillées,
téléchargement du CV et formulaire de contact via le client mail.

**En ligne :** https://jenov-i.github.io

---

## Aperçu

- Hero animé avec topologie réseau dessinée en `<canvas>` (respecte `prefers-reduced-motion`).
- Bascule **FR / EN** instantanée, mémorisée dans `localStorage`.
- 14 projets filtrables par domaine (sécurité, réseaux, systèmes, dev & services).
- Modales de fiches projets : contexte, missions, résultat, stack.
- Timeline expérience / formation, certifications.
- CV PDF téléchargeable, coordonnées copiables, formulaire `mailto:` prérempli.
- Responsive, accessible (navigation clavier, focus visible, skip link), SEO + Open Graph.

## Lancer en local

Aucune dépendance, aucun build. Un simple serveur statique suffit :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

> Ouvrir `index.html` directement en `file://` fonctionne aussi, mais un serveur local
> est préférable (chemins, polices, comportement du presse-papiers).

## Structure

```
.
├── index.html                  # structure et contenu statique
├── assets/
│   ├── css/styles.css          # thème complet, responsive, print
│   ├── js/
│   │   ├── i18n.js             # dictionnaire FR/EN des textes statiques
│   │   ├── projects.js         # données des projets (FR/EN)
│   │   └── main.js             # interactions : langue, filtres, modales, canvas…
│   ├── img/
│   │   ├── photo.jpg           # portrait
│   │   ├── og-image.jpg        # image de partage 1200×630
│   │   └── favicon.svg
│   └── cv/CV_Jenovi_Dandou.pdf # CV téléchargeable
├── .nojekyll                   # indispensable pour GitHub Pages
└── README.md
```

## Modifier le contenu

### Projets

Tout est dans `assets/js/projects.js`. Chaque projet suit ce schéma :

```js
{
  id: "mon-projet",
  year: "2026",
  cat: "sec",              // sec | net | sys | dev
  featured: true,
  title:   { fr: "…", en: "…" },
  tagline: { fr: "…", en: "…" },
  context: { fr: "…", en: "…" },
  bullets: { fr: ["…"], en: ["…"] },
  result:  { fr: "…", en: "…" },
  stack: ["pfSense", "Zabbix"]
}
```

Ajouter ou retirer un projet met automatiquement à jour la grille et les filtres.

### Textes de l'interface

Les libellés sont dans `assets/js/i18n.js`, sous les clés `fr` et `en`.
Dans `index.html`, un élément se traduit avec :

```html
<h2 data-i18n="about.title">Derrière le terminal</h2>
```

Attributs disponibles : `data-i18n` (texte), `data-i18n-html`, `data-i18n-placeholder`,
`data-i18n-aria`.

### CV et photo

- Remplacer `assets/cv/CV_Jenovi_Dandou.pdf` (même nom) pour mettre le CV à jour.
- Remplacer `assets/img/photo.jpg` par un portrait vertical ; le cadrage circulaire est en CSS.

## Formulaire de contact

Le formulaire ne dépend d'aucun serveur : il compose un e-mail prérempli vers
`dandoujenovi@gmail.com` via `mailto:` (destinataire défini dans `assets/js/main.js`,
fonction `initContact`). Aucun tracker, aucune donnée envoyée à un tiers.

Pour un envoi direct sans quitter le site, remplacer la soumission par un service
type Formspree ou Netlify Forms.

## Déploiement GitHub Pages

Le site est prévu pour être servi depuis la racine du dépôt `jenov-i.github.io`.

```bash
git init -b main
git add -A
git commit -m "Portfolio initial"
gh repo create jenov-i.github.io --public --source=. --remote=origin --push
```

Puis, si nécessaire, activer Pages :

```bash
gh api --method POST repos/jenov-i/jenov-i.github.io/pages \
  -f 'source[branch]=main' -f 'source[path]=/'
```

Le fichier `.nojekyll` évite le traitement Jekyll et permet de servir tous les fichiers.

## Notes techniques

- Aucune dépendance npm, aucun build : modifier un fichier puis pousser suffit.
- Polices : Space Grotesk et JetBrains Mono (Google Fonts), avec repli système.
- `main.js` gère aussi le compteur animé, le scrollspy, la barre de progression et le menu mobile.
- Le canvas est mis en pause quand il sort de l'écran ou quand l'onglet est masqué.

---

© 2026 DANDOU Jenovi — Brazzaville, Congo.
