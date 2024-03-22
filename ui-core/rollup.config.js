import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import eslint from "@rollup/plugin-eslint";
import postcss from "rollup-plugin-postcss";

const formats = ["esm"];

/** @type {import("rollup").RollupOptions} */
export default {
  input: "src/index.ts",
  output: formats.map((format) => ({
    file: `dist/index.${format}.js`,
    format,
    name: "osrdcore",
    sourcemap: true,
  })),
  plugins: [
    eslint(),
    typescript(),
    postcss({
      extract: "theme.css",
      sourceMap: true,
      plugins: [],
    }),
    terser(),
  ],
  external: ["react"],
};
