import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";

const isProduction = process.env.BUILD === 'production';

module.exports = {
  input: 'src/swibe.js',
	output: {
		name: 'Swibe',
		file: 'dist/swibe.min.js',
		format: 'umd'
	},
	plugins: [
    babel({
      exclude: 'node_modules/**' // only transpile our source code
		}),
		terser()
  ]
};
