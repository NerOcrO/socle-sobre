# Socle sobre

- Routing : [Astro](https://docs.astro.build/en/basics/astro-pages/)
- Authentification : [Better-auth](https://www.better-auth.com/docs/introduction)
- Observabilité : [Sentry](https://sentry.io/welcome/)
- ORM et migration : [Prisma](https://www.prisma.io/)
- HTML : [Astro](https://docs.astro.build/en/basics/astro-components/)
- CSS : classique, scopé avec [Astro](https://docs.astro.build/en/guides/styling/)
- Typing : TypeScript configurer ultra strict avec [Astro](https://docs.astro.build/en/guides/typescript/#tsconfig-templates)
- Bundler : [Vite](https://vite.dev/)
- Optimisation SVG : [svgo](https://github.com/svg/svgo)
- Linter : Eslint et Stylelint configurer ultra strict
- Formateur : [dprint](https://dprint.dev/)
- Test : [Vitest](https://github.com/vitest-dev/vitest)
- Test de mutation : [Stryker Mutator](https://stryker-mutator.io/docs/stryker-js/introduction/)
- Package manager : [yarn](https://yarnpkg.com/)
- Serveur : [Hono](https://hono.dev/)

## Pourquoi une Hypermedia-Driven Application (HDA) ?

- [Hypermedia-Driven Applications](https://htmx.org/essays/hypermedia-driven-applications/)
- [You Can't Build Interactive Web Apps Except as Single Page Applications... And Other Myths](https://htmx.org/essays/you-cant/)
- [Virtual DOM is pure overhead](https://svelte.dev/blog/virtual-dom-is-pure-overhead)

## DSFR

Copie du css core, du favicon, des fonts et des svg dans le répertoire public correspondant en changeant le numéro de version.

## Github

- [Pour configurer l'authentification et avoir les variables d'environnement](https://github.com/settings/developers)

## Google

- [Pour configurer l'authentification et avoir les variables d'environnement](https://console.cloud.google.com/apis/dashboard)
- Créer un projet
- [Créer un identifiant](https://console.cloud.google.com/apis/credentials)
- Créer des identifiants -> ID client OAuth
- Remplir le formulaire

## Todo

- les tests de mutation ne savent pas reconnaitre les .astro via tsconfig
  - c'est le même problème que l'on avait quand on lançait `tsc` que l'on a résolu en utilisant plutôt `@astrojs/check`
- Quand je suis dans un fichier astro, il n'y a pas d'autocomplete sur les props
- Je n'ai pas réussi à compresser le HTML avec Hono

## Limitations

- Les props astro ne sont pas utilisable directement dans `<script>`
- Alpine.js ne permet pas de rajouter `data-` devant ses attributs ce qui rend le HTML non valide
- Je me demande comment est géré le SEO car avec HTMX, on peuple à la volée des "div vides"
