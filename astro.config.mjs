// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: 'https://t09-team-8.github.io',
	base: '/T09_org_repo',
	integrations: [react()],
});
