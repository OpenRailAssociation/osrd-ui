import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import eslint from '@rollup/plugin-eslint';

const formats = ['esm'];

/** @type {import('rollup').RollupOptions} */
export default {
  input: 'src/index.ts',
  output: formats.map((format) => ({
    file: `dist/index.${format}.js`,
    format,
    name: 'osrdspeedspacechart',
    sourcemap: true,
  })),
  plugins: [eslint(), typescript(), terser()],
  external: ['react', 'd3'],
};
