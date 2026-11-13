## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Change review rule

For every code change, inspect the related component and its shared use across all pages. Check for consistency in navigation targets, hover and focus states, layout, alignment, image crops, asset paths, responsive behavior, and semantics. Compare with the supplied Figma reference when available. Preserve existing user edits and formatting outside the requested scope; do not invent missing destinations, content, or design details. After editing, run the project build and report any inconsistencies that remain unresolved.

## Figma visual cross-check rule

For every code change that affects a visual page, compare the exact Figma frame and its relevant detail frames before editing. Check the composition from the full-page view and close-up views, including measured bounds, alignment, spacing, typography, image source and crop, color, interactions, and responsive behavior. After editing, compare the corresponding coded implementation back against those Figma views and inspect the neighboring sections and shared components for regressions. Keep a short record of mismatches found and corrected. Do not claim visual verification when the rendered site was not inspected; use only the authorized Open Computer Use workflow for browser UI, and report that verification gap if it is unavailable.