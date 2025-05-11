import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [
		enhancedImages(), // ✅ MUST come before sveltekit()
		sveltekit()
	],
	server: {
		host: true,
		allowedHosts: [
			'ecde-202-91-43-34.ngrok-free.app'
		]
	}
});


