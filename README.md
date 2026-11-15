# KindDesign CPH website

Astro website prototype for the KindDesign CPH project.

## Local development

Run these commands from the project root:

```sh
npm install
npm run dev
```

## Build and preview

```sh
npm run build
npm run preview
```

The production files are generated in `dist/`.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys the site when changes are pushed to `main`, or when the workflow is started manually. The Astro configuration uses `/T09_org_repo` as the project-site base path.
