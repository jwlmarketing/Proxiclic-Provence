# Proxiclic-Provence

Site vitrine de **Proxiclic-Provence** — assistance et dépannage informatique à domicile pour les particuliers et les professionnels, à Digne-les-Bains et dans les Alpes-de-Haute-Provence.

🔗 **Site en ligne :** [proxiclic-provence.fr](https://www.proxiclic-provence.fr)

---

## À propos

Proxiclic-Provence accompagne particuliers, seniors et professionnels (notaires, avocats, cabinets médicaux, pharmacies, experts-comptables, artisans, commerçants, TPE/PME) pour tout ce qui touche à l'informatique : dépannage, maintenance, changement de matériel, réseau et Wi-Fi.

## Stack technique

- HTML / CSS / JavaScript natifs — aucun framework, aucune dépendance de build
- Polices : [Poppins](https://fonts.google.com/specimen/Poppins) (titres) et [Inter](https://fonts.google.com/specimen/Inter) (texte courant), via Google Fonts
- Hébergement et déploiement continu : **[Vercel](https://vercel.com)**
- Déploiement automatique à chaque `push` sur la branche `main`

## Structure du projet

```
├── index.html              # Page d'accueil
├── pro/                     # Espace professionnels
├── mentions-legales/
├── confidentialite/
├── politique-cookies/
├── assets/
│   ├── css/                # Feuille de style principale
│   ├── js/                 # Scripts (slider, formulaire, cookies…)
│   └── images/
└── middleware.js            # Middleware Vercel (verrouillage temporaire du site)
```

## Développement local

Aucun outil de build requis — servir simplement les fichiers statiques :

```bash
python3 -m http.server 8000
```

Puis ouvrir [http://localhost:8000](http://localhost:8000).

---

## Copyright & propriété

© 2026 **Proxiclic-Provence** — Tous droits réservés.

Ce site, son contenu, ses textes, images et son code source sont la propriété de Proxiclic-Provence et sont protégés par le droit d'auteur. Toute reproduction, distribution ou réutilisation, en tout ou partie, sans autorisation écrite préalable est interdite.

**Conception, stratégie digitale & développement :** [JWL Marketing](https://www.jwl-marketing.fr) — *« Une stratégie freelance, portée par la qualité d'une agence à taille humaine. »*
