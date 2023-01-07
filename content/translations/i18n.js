// Only one item MUST have the "default: true" key
module.exports = {
  pt_br: {
    default: true,
    path: `pt`,
    locale: `pt-BR`,
    dateFormat: `DD/MM/YYYY`,
    siteLanguage: `pt_BR`,
    ogLanguage: `pt_BR`,
    defaultTitle: `Using i18n with Gatsby`,
    defaultDescription: `Gatsby example site using MDX and dependency-free i18n`,
  },
  en: {
    path: `en`,
    locale: `en-US`,
    dateFormat: `MM/DD/YYYY`,
    siteLanguage: `en`,
    ogLanguage: `en_US`,
    defaultTitle: `Using i18n with Gatsby`,
    defaultDescription: `Gatsby example site using MDX and dependency-free i18n`,
  },
};
