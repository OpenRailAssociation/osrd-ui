import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const formats = ['esm']

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: 'src/index.ts',
  plugins: [
    typescript(),
    terser()
  ],
  output: formats.map(format => ({
    file: `dist/index.${format}.js`,
    format,
    name: 'osrdicons',
  })),
  external: ['react']
}
