const nextTranslate = require('next-translate');

module.exports = nextTranslate({
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
});
