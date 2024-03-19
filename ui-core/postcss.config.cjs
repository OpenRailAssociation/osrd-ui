module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-assets": {},
    "tailwindcss/nesting": {},
    tailwindcss: { config: "./tailwind.config.js" },
    autoprefixer: {},
    "postcss-preset-env": {
      features: { "nesting-rules": false },
    },
  },
};
