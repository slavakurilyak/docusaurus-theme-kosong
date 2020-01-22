const path = require('path');

// Need to be inlined to prevent dark mode FOUC
// Make sure that the 'storageKey' is the same as the one in `/theme/hooks/useTheme.js`
const storageKey = 'theme';
const noFlash = `(function() {
  function setDataThemeAttribute(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function getPreferredTheme() {
    var theme = null;
    try {
      theme = localStorage.getItem('${storageKey}');
    } catch (err) {}

    return theme;
  }

  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkQuery.addListener(function(e) {
    if (getPreferredTheme() !== null) {
      return;
    }

    setDataThemeAttribute(e.matches ? 'dark' : '');
  });

  var preferredTheme = getPreferredTheme();
  if (preferredTheme !== null) {
    setDataThemeAttribute(preferredTheme);
  } else if (darkQuery.matches) {
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
