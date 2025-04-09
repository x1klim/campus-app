module.exports = {
  locales: ['en', 'ru'],
  defaultNamespace: 'translation',
  keySeparator: '.',
  namespaceSeparator: ':',
  output: 'src/i18n/$LOCALE.json',
  input: ['src/**/*.{js,jsx}'],
  keepRemoved: true,
  createOldCatalogs: false,
  sort: true,
};
