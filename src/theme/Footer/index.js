import React from 'react';
import classnames from 'classnames';

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function FooterLink({to, href, label, ...props}) {
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
            to: toUrl,
          })}
      {...props}>
      {label}
    </Link>
  );
}

const FooterLogo = ({url, alt}) => (
  <img className="footer__logo" alt={alt} src={url} />
);

function Footer() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  const {themeConfig = {}} = siteConfig;
  const {footer} = themeConfig;

  const {copyright, links = [], logo = {}} = footer || {};
  const logoUrl = useBaseUrl(logo.src);

  if (!footer) {
    return null;
  }

  return (
    <footer
      className={classnames({
        'footer--dark': footer.style === 'dark',
      })}>
      {links && links.length > 0 && (
      <div>
        {links.map((linkItem, i) => (
          <div key={i}>
            {linkItem.title != null ? <h4>{linkItem.title}</h4> : null}
            {linkItem.items != null &&
            Array.isArray(linkItem.items) &&
            linkItem.items.length > 0 ? (
              <ul>
                {linkItem.items.map(item => (
                  <li key={item.href || item.to}>
                    <Link
                      {...item}
                      {...(item.href
                        ? {
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            href: item.href,
                          }
                        : {
                            to: withBaseUrl(item.to),
                          })}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
      )}
      {(logo || copyright) && (
      <div>
        {logo && logo.src && <img alt={logo.alt} src={logo.src} />}
        {copyright}
      </div>
      )}
    </footer>
  );
}

export default Footer;
