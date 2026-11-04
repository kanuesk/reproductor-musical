import adapterAuto from '@sveltejs/adapter-auto';
import adapterVercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// En Vercel usamos el adaptador específico (más rápido y robusto).
// En local seguimos usando adapter-auto para no requerir permisos de symlink en Windows.
const adapter = process.env.VERCEL ? adapterVercel() : adapterAuto();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter
	}
};

export default config;
