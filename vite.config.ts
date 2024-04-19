import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	// https://github.com/vitejs/vite/issues/15620
	ssr: {
		noExternal: ['@googlemaps/js-api-loader']
	}
});
