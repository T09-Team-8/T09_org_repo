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