# Docusaurus Theme Kosong

No external CSS dependencies theme for Docusaurus 2.

## Installation

Add `huijing/docusaurus-theme-kosong` to your package:

```bash
npm i @huijing/docusaurus-theme-kosong
# or
yarn add @huijing/docusaurus-theme-kosong
```

Modify your `docusaurus.config.js`:

```diff
module.exports = {
  ...
+ themes: ['@huijing/docusaurus-theme-kosong'],
  ...
}
```

## Swizzling components

```shell
$ npm swizzle @huijing/docusaurus-theme-kosong [component name]
```

All components used by this theme can be found [here](https://github.com/facebook/docusaurus/tree/master/packages/docusaurus-theme-classic/src/theme)
