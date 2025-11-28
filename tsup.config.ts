import { defineConfig } from 'tsup'

export default defineConfig({
	format: 'esm',
	dts: true,
	outDir: './dist',
	clean: true,
});
