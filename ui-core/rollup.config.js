import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import eslint from "@rollup/plugin-eslint";
import postcss from 'rollup-plugin-postcss'

const formats = ['esm']

/** @type {import('rollup').RollupOptions} */
export default {
  input: 'src/index.ts',
  output: formats.map(format => ({
    file: `dist/index.${format}.js`,
    format,
    name: 'osrdcore',
  })),
  plugins: [
    eslint(),
    typescript(),
    postcss({
      extract: "style.css",
      plugins: []
    }),
    terser()
  ],
  external: ['react']
}
