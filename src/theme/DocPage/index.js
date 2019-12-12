import React from 'react';
import {MDXProvider} from '@mdx-js/react';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import renderRoutes from '@docusaurus/renderRoutes';
import Layout from '@theme/Layout';
import DocSidebar from '@theme/DocSidebar';
import MDXComponents from '@theme/MDXComponents';
import NotFound from '@theme/NotFound';
import {matchPath} from '@docusaurus/router';

import styles from './styles.module.css';

function matchingRouteExist(routes, pathname) {
  return routes.some(route => matchPath(pathname, route));
}

function DocPage(props) {
  const {route, docsMetadata, location} = props;
  const {permalinkToSidebar, docsSidebars, version} = docsMetadata;
  const sidebar = permalinkToSidebar[location.pathname.replace(/\/$/, '')];
  const {siteConfig: {themeConfig = {}} = {}} = useDocusaurusContext();
  const {sidebarCollapsible = true} = themeConfig;

  if (!matchingRouteExist(route.routes, location.pathname)) {
    return <NotFound {...props} />;
  }

  return (
    <Layout version={version}>
      {sidebar && (
      <DocSidebar
        docsSidebars={docsSidebars}
        location={location}
        sidebar={sidebar}
        sidebarCollapsible={sidebarCollapsible}
      />
      )}
      <MDXProvider components={MDXComponents}>
        {renderRoutes(route.routes)}
      </MDXProvider>
    </Layout>
  );
}

export default DocPage;
