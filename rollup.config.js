import ts from 'rollup-plugin-ts';
//import dts from 'rollup-plugin-dts';


import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/client/index.ts',
	output: {
		file: 'dist/bundle.js',
		format: 'umd', // Universal Module Definition for wide compatibility
		name: 'MyLibraryClient' // Global variable name for your library in browsers
	},
	plugins: [
		typescript(),
		resolve(), // Resolve third-party modules in 'node_modules'
		commonjs(), // Convert CommonJS modules to ES6
		terser() // Minify the bundle
	]
};
