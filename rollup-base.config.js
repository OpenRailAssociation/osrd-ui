import eslint from '@rollup/plugin-eslint';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import process from 'process';

const formats = ['esm'];
const isDev = process.env.NODE_ENV === 'development';

/** @type {import("rollup").RollupOptions} */
const generateRollupBaseConfig = (projectName, external) => ({
  input: 'src/index.ts',
  output: formats.map((format) => ({
    file: `dist/index.${format}.js`,
    format,
    name: projectName,
    sourcemap: true,
  })),
  plugins: [
    eslint(),
    typescript(),
    postcss({
      extract: 'theme.css',
      sourceMap: true,
      plugins: [],
    }),
    terser(),
    isDev &&
      livereload({
        watch: 'dist',
      }),
  ],
  external,
});

export default generateRollupBaseConfig;
