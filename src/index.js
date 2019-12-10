const path = require('path');

// Need to be inlined to prevent dark mode FOUC
// Make sure that the 'storageKey' is the same as the one in `/theme/hooks/useTheme.js`
const storageKey = 'theme';
const noFlash = `(function() {
  function setDataThemeAttribute(theme) {
    document.querySelector('html').setAttribute('data-theme', theme);
  }
  
  var preferDarkQuery = '(prefers-color-scheme: dark)';
  var mql = window.matchMedia(preferDarkQuery);
  var supportsColorSchemeQuery = mql.media === preferDarkQuery;
  var localStorageTheme = null;
  try {
    localStorageTheme = localStorage.getItem('${storageKey}');
  } catch (err) {}
  var localStorageExists = localStorageTheme !== null;

  if (localStorageExists) {
    setDataThemeAttribute(localStorageTheme);
  } else if (supportsColorSchemeQuery && mql.matches) {
    setDataThemeAttribute('dark');
  }
})();`;

module.exports = function(context, options) {
  const {
    siteConfig: {themeConfig},
  } = context;
  const {disableDarkMode = false} = themeConfig || {};
  const {customCss} = options || {};
  return {
    name: 'docusaurus-theme-kosong',

    getThemePath() {
      return path.resolve(__dirname, './theme');
    },

    getClientModules() {
      return [path.resolve(__dirname, './style.css'), customCss];
    },

    injectHtmlTags() {
      if (disableDarkMode) {
        return {};
      }
      return {
        preBodyTags: [
          {
            tagName: 'script',
            attributes: {
              type: 'text/javascript',
            },
            innerHTML: noFlash,
          },
        ],
      };
    },
  };
};
