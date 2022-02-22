const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
  },
  ...(typeof window === undefined ? { localePath: path.resolve('./public/locales') } : {}),
};
