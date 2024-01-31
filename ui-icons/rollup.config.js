import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const formats = ['esm']

export default {
  input: 'src/index.ts',
  plugins: [
    commonjs(),
    babel({
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false
          }
        ],
        '@babel/preset-react'
      ],
      babelHelpers: 'bundled'
    }),
    typescript(),
    terser()
  ],
  output: formats.map(format => ({
    file: `dist/index.${format}.js`,
    format,
    name: 'osrdicons',
    globals: {
      'react/jsx-runtime': 'jsxRuntime'
    }
  })),
  external: ['react/jsx-runtime']
}
