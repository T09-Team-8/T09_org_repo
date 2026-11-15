// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  site: isGitHubPages ? 'https://t09-team-8.github.io' : undefined,
  base: isGitHubPages ? '/T09_org_repo' : '/',
  integrations: [react()],
});
