import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { defineConfig } from 'rollup';
const plugins = [nodeResolve()];
if (process.env.production) {
	plugins.push(terser());
}
export default defineConfig({
	input: 'src/main.mjs',
	output: {
		file: process.env.production ? 'dist/bonfire.min.js' : 'dist/bonfire.js',
		format: 'es',
		name: "bonfire",
	},
	plugins: plugins
});