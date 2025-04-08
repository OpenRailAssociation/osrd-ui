module.exports = function generateBasePostcssConfig() {
  return {
    plugins: {
      '@tailwindcss/postcss': {},
      'postcss-assets': {},
      'postcss-nested': {},
      'postcss-preset-env': {
        features: { 'nesting-rules': false },
      },
    },
  };
};
