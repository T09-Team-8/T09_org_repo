# KindDesign website

This repository contains the KindDesign website built with Astro. The site is a static website with reusable Astro components and a small number of React dependencies available through the Astro React integration.

## Getting started

Use Node.js 22.23.4 or newer. Run these commands from the repository root:

    npm install
    npm run dev

Astro prints the local address in the terminal, normally **http://localhost:4321/**. Keep that terminal open while developing. Press **Ctrl+C** in that terminal to stop the server.

Before committing, build the static site:

    npm run build

The build output is written to **dist/**. To inspect that output locally:

    npm run preview

Other available script:

    npm run astro -- --help

## Repository structure

    .
    ├── .github/
    │   └── workflows/
    │       └── deploy.yml       # Builds and deploys GitHub Pages on pushes to main
    ├── public/
    │   ├── images/
    │   │   ├── about/           # About page photos, collage pieces, and SVGs
    │   │   ├── community/       # Community section photos
    │   │   └── events/          # Event section photos and artwork
    │   ├── home-hero-animated-background.gif
    │   ├── home-hero-animated-background.webp
    │   └── kind-design-logo.png
    ├── src/
    │   ├── assets/              # Imported assets processed by Astro/Vite
    │   ├── components/          # Reusable page sections and shared UI
    │   ├── layouts/             # Shared page shell
    │   ├── lib/                 # Supporting runtime and custom-effect code
    │   └── pages/               # URL routes; file names determine URLs
    ├── supabase/
    │   └── migrations/          # SQL migration drafts; these are not applied
    ├── .env.example             # Placeholder environment variable names
    ├── astro.config.mjs
    ├── netlify.toml
    ├── package.json
    └── package-lock.json

**node_modules/**, **.astro/**, **dist/**, and local **.env** files are generated, private, or machine-specific. They are ignored by Git and should not be committed.

## Pages and components

Astro creates routes from files in **src/pages/**:

| File | URL | Current purpose |
| --- | --- | --- |
| **src/pages/index.astro** | **/** | Home page, assembled from the hero, community, events, contact, and footer components. |
| **src/pages/about.astro** | **/about** | About page, assembled from its About* section components. |
| **src/pages/event.astro** | **/event** | Event route. It currently reuses AboutEvents.astro; build a dedicated event-calendar section here when implementing the separate event-calendar design. |
| **src/pages/products.astro** | **/products** | Product listing scaffold using Pcard.astro. Its local product list is empty for now. |
| **src/pages/details/[id].astro** | **/details/:id** | Dynamic product detail route using getStaticPaths() and Astro props. It currently generates no detail pages because there is no product data source. |

Pages should stay small: import the shared Layout.astro, then import and arrange the section components for that page. Put reusable sections and controls in **src/components/** rather than copying the same markup into multiple pages.

### Shared and page components

- **Layout.astro** provides the document shell, global header, shared hover behavior, and the content slot.
- **Header.astro** is the site-wide navigation and brand link.
- **Hover.astro** contains shared hover and focus effects.
- **Buttons.astro** defines reusable link-button variants. Use its variant prop instead of creating another styled button for an existing pattern.
- **Hero.astro**, **CommunitySection.astro**, **EventsSection.astro**, **ContactSection.astro**, and **SiteFooter.astro** make up the home page.
- **AboutHero.astro**, **AboutWelcome.astro**, **AboutStory.astro**, **AboutJoinCommunity.astro**, **AboutEvents.astro**, **AboutContact.astro**, and **AboutFooter.astro** make up the About page.
- **Pcard.astro** is the reusable product card.

When a component is used by more than one page, check all its uses before changing its markup or styles.

## Images and other assets

- Put public images in the existing **public/images/** subfolders, choosing the folder that matches their page or section.
- Files in **public/** are served as static assets. Keep image source URLs compatible with both the local root path and the GitHub Pages base path. Follow the existing **import.meta.env.BASE_URL.replace(/\/$/, '') + '/images/…'** pattern used by the page components.
- Keep original image proportions and match the intended crop in CSS with **object-fit**, **object-position**, and the existing container dimensions. Don’t replace a source image or use a full-page screenshot where separate assets are expected.
- Add useful **alt** text to meaningful images. Use **alt=""** for decorative images. Keep below-the-fold images lazy-loaded where appropriate.
- The hero animation files are in **public/**. Keep any references to them base-path-aware like the other public assets.

## Astro coding guidelines

- Use **.astro** components for the pages and sections in this project. Keep page files in **src/pages/**; keep reusable visual sections in **src/components/**.
- Follow the existing page convention: import components at the top of the frontmatter, then compose them inside the shared layout.
- Pass component data through props. Follow the **Buttons.astro** and **Pcard.astro** patterns for props. For a static dynamic route, **getStaticPaths()** returns route params and props; the page reads those values from **Astro.props**.
- Keep styles beside the component they belong to. Use **<style is:global>** only for styles that are intentionally shared site-wide.
- Existing CSS class names use single underscores between words (for example, **community_photo_meetup**). Continue that convention: do not use spaces or double underscores in class names, and avoid hyphens in class names.
- Preserve responsive styles, keyboard focus styles, semantic headings, and **prefers-reduced-motion** behavior when editing shared UI.
- Don’t add a new dependency for a small feature without checking whether Astro or the existing components already cover it.
- Keep the code change focused. Don’t reformat or replace unrelated markup while working on one section.

## Current data and Supabase status

The website does not currently call the Supabase API. The product pages use an empty local array so the static site can build without database credentials. The files under **supabase/migrations/** are SQL drafts only; they do not mean a database has been created or that migrations have been applied. Don’t add Supabase environment variables or restore API calls until the team has configured the project and agreed on the API/data flow.

**.env.example** contains placeholders, not working credentials. Never commit **.env**, API keys, access tokens, or other secrets.

## Git workflow

The shared deployment branch is **main** on the **origin** remote (**T09-Team-8/T09_org_repo**). **main** deploys automatically through GitHub Actions. The repository is also configured for Netlify builds with **netlify.toml**.

Configure each local clone once to rebase local commits when pulling and avoid the old fast-forward-only setting:

    git config --local pull.rebase true
    git config --local --unset-all pull.ff
    git branch --set-upstream-to=origin/main main

If **git config --local --unset-all pull.ff** says the setting does not exist, continue; that just means the clone did not have the old setting.

Before starting work, check your branch and working tree:

    git status --short --branch
    git pull --rebase origin main

If you already have uncommitted changes, commit them or save them before pulling. Don’t pull over work you have not saved.

After making changes, review and commit only the files you intended to change:

    git status --short
    git diff
    git add path/to/file-you-changed
    git diff --cached
    git commit -m "Describe the change"
    git pull --rebase origin main
    git push origin main

Use the real file paths in **git add**, not the example path above. Do not force-push to **main**, and do not commit **.env**, **node_modules/**, **.astro/**, or **dist/**. If Git reports a conflict during a rebase, resolve the marked conflict in the affected file, stage that file, and run **git rebase --continue**. If you need to cancel the rebase, run **git rebase --abort**. Rebase avoids unnecessary merge commits, but it cannot prevent conflicts when two people edit overlapping lines; coordinate edits to shared files such as **Header.astro**, **Layout.astro**, and shared sections.

## Build and deployment paths

- Local development serves the site from **/**, so use **http://localhost:4321/**.
- The GitHub Pages workflow sets **ASTRO_BASE=/T09_org_repo**; **astro.config.mjs** uses that base for the organization Pages deployment.
- Netlify builds with **npm run build** and publishes **dist/**, as configured in **netlify.toml**.
- When adding links or image URLs, preserve the configured base path. Don’t hardcode **/T09_org_repo/** into page components.

## References

- [Astro project structure](https://docs.astro.build/en/basics/project-structure/)
- [Astro pages and routing](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Astro deployment](https://docs.astro.build/en/guides/deploy/)
---

# Dansk — KindDesign-webstedet

Dette repository indeholder KindDesign-webstedet, som er bygget med Astro. Webstedet er statisk og består af genanvendelige Astro-komponenter. Projektet har også nogle React-afhængigheder via Astros React-integration.

## Kom godt i gang

Brug Node.js version 22.23.4 eller nyere. Kør kommandoerne fra projektets rodmappe:

    npm install
    npm run dev

Astro viser den lokale adresse i terminalen, normalt **http://localhost:4321/**. Lad terminalen være åben, mens du arbejder. Tryk **Ctrl+C** i terminalen for at stoppe serveren.

Byg websitet, før du committer:

    npm run build

Build-filerne bliver skrevet til **dist/**. Hvis du vil se buildet lokalt:

    npm run preview

Et andet tilgængeligt script:

    npm run astro -- --help

## Repository-struktur

    .
    ├── .github/
    │   └── workflows/
    │       └── deploy.yml       # Bygger og udgiver GitHub Pages ved push til main
    ├── public/
    │   ├── images/
    │   │   ├── about/           # Billeder, collage-dele og SVG-filer til About-siden
    │   │   ├── community/       # Billeder til community-sektionen
    │   │   └── events/          # Eventbilleder og grafik
    │   ├── home-hero-animated-background.gif
    │   ├── home-hero-animated-background.webp
    │   └── kind-design-logo.png
    ├── src/
    │   ├── assets/              # Importerede assets, som Astro/Vite behandler
    │   ├── components/          # Genanvendelige sidesektioner og fælles UI
    │   ├── layouts/             # Fælles sideskabelon
    │   ├── lib/                 # Hjælpekode og kode til specialeffekter
    │   └── pages/               # URL-ruter; filnavnene bestemmer URL'erne
    ├── supabase/
    │   └── migrations/          # SQL-migrationskladder; de er ikke anvendt
    ├── .env.example             # Pladsholdere for miljøvariabler
    ├── astro.config.mjs
    ├── netlify.toml
    ├── package.json
    └── package-lock.json

**node_modules/**, **.astro/**, **dist/** og lokale **.env**-filer er genererede, private eller maskinafhængige. Git ignorerer dem, og de må ikke committes.

## Sider og komponenter

Astro opretter ruter ud fra filerne i **src/pages/**:

| Fil | URL | Nuværende formål |
| --- | --- | --- |
| **src/pages/index.astro** | **/** | Forsiden, sammensat af hero-, community-, events-, kontakt- og footer-komponenterne. |
| **src/pages/about.astro** | **/about** | About-siden, sammensat af dens About*-sektionskomponenter. |
| **src/pages/event.astro** | **/event** | Event-ruten. Den genbruger aktuelt AboutEvents.astro; lav en særskilt eventkalender-sektion, når den separate eventkalender skal implementeres. |
| **src/pages/products.astro** | **/products** | Skelet til produktoversigten, som bruger Pcard.astro. Den lokale produktliste er tom indtil videre. |
| **src/pages/details/[id].astro** | **/details/:id** | Dynamisk produktside, der bruger getStaticPaths() og Astro-props. Den genererer aktuelt ingen produktsider, fordi der ikke findes en datakilde til produkter. |

Hold sidefilerne enkle: importér den fælles Layout.astro, og importér og placer derefter sidens sektionskomponenter. Læg genanvendelige sektioner og kontroller i **src/components/** i stedet for at kopiere den samme markup til flere sider.

### Fælles komponenter og sektionskomponenter

- **Layout.astro** indeholder dokumentets grundstruktur, den globale header, fælles hover-adfærd og indholdets slot.
- **Header.astro** indeholder navigationen og brandlinket, som bruges på hele websitet.
- **Hover.astro** indeholder fælles hover- og fokuseffekter.
- **Buttons.astro** definerer genanvendelige linkknap-varianter. Brug dens variant-prop i stedet for at oprette en ny styling til et mønster, der allerede findes.
- **Hero.astro**, **CommunitySection.astro**, **EventsSection.astro**, **ContactSection.astro** og **SiteFooter.astro** udgør forsiden.
- **AboutHero.astro**, **AboutWelcome.astro**, **AboutStory.astro**, **AboutJoinCommunity.astro**, **AboutEvents.astro**, **AboutContact.astro** og **AboutFooter.astro** udgør About-siden.
- **Pcard.astro** er den genanvendelige produktkomponent.

Hvis en komponent bruges på flere sider, skal du undersøge alle dens anvendelser, før du ændrer markup eller styling.

## Billeder og andre assets

- Læg offentlige billeder i de eksisterende undermapper i **public/images/**. Vælg mappen, der passer til siden eller sektionen.
- Filer i **public/** serveres som statiske assets. Sørg for, at billedstier virker både lokalt fra roden og med GitHub Pages' base-sti. Følg det eksisterende mønster **import.meta.env.BASE_URL.replace(/\/$/, '') + '/images/…'**, som bruges i sidekomponenterne.
- Bevar billedets proportioner, og tilpas udsnittet i CSS med **object-fit**, **object-position** og beholderens eksisterende dimensioner. Erstat ikke et kildebillede, og brug ikke et screenshot af en hel side, hvor der forventes separate assets.
- Skriv en beskrivende **alt**-tekst til billeder med betydning. Brug **alt=""** til dekorative billeder. Indlæs billeder længere nede på siden med lazy loading, hvor det passer.
- Hero-animationens filer ligger i **public/**. Sørg for, at referencer til dem håndterer base-stien på samme måde som de andre offentlige assets.

## Retningslinjer for Astro-kode

- Brug **.astro**-komponenter til projektets sider og sektioner. Sidefiler skal ligge i **src/pages/**, og genanvendelige visuelle sektioner skal ligge i **src/components/**.
- Følg den eksisterende sidekonvention: importér komponenter øverst i frontmatter, og sammensæt dem derefter i det fælles layout.
- Send data til komponenter via props. Følg mønstrene i **Buttons.astro** og **Pcard.astro**. For en statisk dynamisk rute returnerer **getStaticPaths()** rutens params og props; siden læser værdierne fra **Astro.props**.
- Placér styles ved siden af den komponent, de hører til. Brug kun **<style is:global>** til styles, der bevidst skal deles på hele websitet.
- Eksisterende CSS-klassenavne bruger enkelte underscores mellem ord, f.eks. **community_photo_meetup**. Fortsæt den konvention: brug ikke mellemrum eller dobbelt underscore i klassenavne, og undgå bindestreger i klassenavne.
- Bevar responsive styles, tastaturfokus-styles, semantiske overskrifter og **prefers-reduced-motion**, når du redigerer fælles UI.
- Tilføj ikke en ny afhængighed til en lille funktion, før du har undersøgt, om Astro eller de eksisterende komponenter allerede kan løse opgaven.
- Hold kodeændringen afgrænset. Undlad at formatere eller erstatte uvedkommende markup, når du arbejder på én sektion.

## Aktuel status for data og Supabase

Websitet kalder ikke Supabase API'et i øjeblikket. Produktsiderne bruger et tomt lokalt array, så det statiske site kan buildes uden databaseoplysninger. Filerne i **supabase/migrations/** er kun SQL-kladder. De betyder ikke, at en database er oprettet, eller at migrations er blevet anvendt. Tilføj ikke Supabase-miljøvariabler eller API-kald igen, før teamet har konfigureret projektet og aftalt API- og dataflowet.

**.env.example** indeholder pladsholdere, ikke fungerende adgangsoplysninger. Commit aldrig **.env**, API-nøgler, adgangstokens eller andre hemmeligheder.

## Git-arbejdsgang

Den fælles deploy-branch er **main** på remoten **origin** (**T09-Team-8/T09_org_repo**). **main** udgiver automatisk websitet via GitHub Actions. Repository'et er også sat op til Netlify-builds via **netlify.toml**.

Konfigurér hver lokal kopi én gang, så lokale commits rebase'es ved pull, og den gamle fast-forward-only-indstilling fjernes:

    git config --local pull.rebase true
    git config --local --unset-all pull.ff
    git branch --set-upstream-to=origin/main main

Hvis **git config --local --unset-all pull.ff** siger, at indstillingen ikke findes, kan du fortsætte. Det betyder blot, at kopien ikke havde den gamle indstilling.

Før du begynder at arbejde, skal du kontrollere branch og arbejdsmappe:

    git status --short --branch
    git pull --rebase origin main

Hvis du har ændringer, der ikke er committed, skal du committe eller gemme dem, før du puller. Pull ikke oven i arbejde, du ikke har gemt.

Når du er færdig, skal du gennemgå ændringerne og kun committe de filer, du har arbejdet på:

    git status --short
    git diff
    git add path/to/file-you-changed
    git diff --cached
    git commit -m "Describe the change"
    git pull --rebase origin main
    git push origin main

Erstat eksempelstien i **git add** med den rigtige filsti. Force-push ikke til **main**, og commit ikke **.env**, **node_modules/**, **.astro/** eller **dist/**. Hvis Git melder om en konflikt under rebase, skal du løse konfliktmarkeringerne i den berørte fil, stage filen og køre **git rebase --continue**. Hvis du vil annullere rebase, skal du køre **git rebase --abort**. Rebase undgår unødvendige merge-commits, men kan ikke forhindre konflikter, hvis flere personer ændrer de samme linjer. Koordinér ændringer i fælles filer som **Header.astro**, **Layout.astro** og delte sektioner.

## Build og deployment-stier

- Lokal udvikling serverer websitet fra **/**. Brug derfor **http://localhost:4321/**.
- GitHub Pages-workflowet sætter **ASTRO_BASE=/T09_org_repo**; **astro.config.mjs** bruger denne base til organisationens Pages-deployment.
- Netlify kører **npm run build** og udgiver **dist/**, som angivet i **netlify.toml**.
- Bevar den konfigurerede base-sti, når du tilføjer links eller billedstier. Skriv ikke **/T09_org_repo/** direkte ind i sidekomponenter.

## Referencer

- [Astros projektstruktur](https://docs.astro.build/en/basics/project-structure/)
- [Astro-sider og routing](https://docs.astro.build/en/guides/routing/)
- [Astro-komponenter](https://docs.astro.build/en/basics/astro-components/)
- [Astro-deployment](https://docs.astro.build/en/guides/deploy/)