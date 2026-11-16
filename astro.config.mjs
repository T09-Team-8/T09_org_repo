// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: 'https://t09-team-8.github.io',
	base: process.env.ASTRO_BASE ?? '/',
	integrations: [react()],
});

