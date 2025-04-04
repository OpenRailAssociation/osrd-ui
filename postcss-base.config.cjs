module.exports = function generateBasePostcssConfig() {
  return {
    plugins: {
      '@tailwindcss/postcss': {},
      'postcss-assets': {},
      'postcss-nesting': {},
      'postcss-preset-env': {
        features: { 'nesting-rules': false },
      },
    },
  };
};
