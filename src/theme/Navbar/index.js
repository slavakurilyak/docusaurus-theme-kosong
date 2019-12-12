import React, {useCallback, useState} from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import SearchBar from '@theme/SearchBar';
import Toggle from '@theme/Toggle';

import classnames from 'classnames';

import useTheme from '@theme/hooks/useTheme';

import styles from './styles.module.css';

function NavLink({to, href, label, position, ...props}) {
  const toUrl = useBaseUrl(to);
  return (
    <Link
      {...(href
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
            href,
          }
        : {
            activeClassName: 'active',
            to: toUrl,
          })}
      {...props}>
      {label}
    </Link>
  );
}

function Navbar() {
  const context = useDocusaurusContext();
  const [sidebarShown, setSidebarShown] = useState(false);
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);
  const [theme, setTheme] = useTheme();
  const {siteConfig = {}} = context;
  const {baseUrl, themeConfig = {}} = siteConfig;
  const {navbar = {}, disableDarkMode = false} = themeConfig;
  const {title, logo = {}, links = []} = navbar;

  const showSidebar = useCallback(() => {
    setSidebarShown(true);
  }, [setSidebarShown]);
  const hideSidebar = useCallback(() => {
    setSidebarShown(false);
  }, [setSidebarShown]);

  const onToggleChange = useCallback(
    e => setTheme(e.target.checked ? 'dark' : ''),
    [setTheme],
  );

  const logoUrl = useBaseUrl(logo.src);
  return (
    <>
      <Head>
        {/* TODO: Do not assume that it is in english language */}
        <html lang="en" data-theme={theme} />
      </Head>
      <header role="navigation">
        <Link to={baseUrl}>
          {logo != null && (<img src={logoUrl} alt={logo.alt} /> )}
          {title != null && (<strong className={isSearchBarExpanded ? styles.hideLogoText : ''}>{title}</strong>)}
        </Link>
        {links
          .filter(linkItem => linkItem.position !== 'right')
          .map((linkItem, i) => (
            <NavLink {...linkItem} key={i} />
          ))}
        {!disableDarkMode && (
          <Toggle
            aria-label="Dark mode toggle"
            checked={theme === 'dark'}
            onChange={onToggleChange}
          />
          )}
      </header>
    </>
  );
}

export default Navbar;
