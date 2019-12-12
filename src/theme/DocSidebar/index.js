import React, {useState, useCallback} from 'react';
import classnames from 'classnames';

import Link from '@docusaurus/Link';

import styles from './styles.module.css';

const MOBILE_TOGGLE_SIZE = 24;

function DocSidebarItem({item, onItemClick, collapsible}) {
  const {items, href, label, type} = item;
  const [collapsed, setCollapsed] = useState(item.collapsed);
  const [prevCollapsedProp, setPreviousCollapsedProp] = useState(null);

  // If the collapsing state from props changed, probably a navigation event
  // occurred. Overwrite the component's collapsed state with the props'
  // collapsed value.
  if (item.collapsed !== prevCollapsedProp) {
    setPreviousCollapsedProp(item.collapsed);
    setCollapsed(item.collapsed);
  }

  const handleItemClick = useCallback(e => {
    e.preventDefault();
    setCollapsed(state => !state);
  });

  switch (type) {
    case 'category':
      return (
        items.length > 0 && (
          <li
            className={classnames({
              'collapsed': collapsed,
            })}
            key={label}>
            <a
              className={classnames({
                'active': collapsible && !item.collapsed,
              })}
              href="#!"
              onClick={collapsible ? handleItemClick : undefined}>
              {label}
            </a>
            <ul>
              {items.map(childItem => (
                <DocSidebarItem
                  key={childItem.label}
                  item={childItem}
                  onItemClick={onItemClick}
                  collapsible={collapsible}
                />
              ))}
            </ul>
          </li>
        )
      );

    case 'link':
    default:
      return (
        <li key={label}>
          <Link
            activeClassName="active"
            exact
            to={href}
            onClick={onItemClick}>
            {label}
          </Link>
        </li>
      );
  }
}

// Calculate the category collapsing state when a page navigation occurs.
// We want to automatically expand the categories which contains the current page.
function mutateSidebarCollapsingState(item, location) {
  const {items, href, type} = item;
  switch (type) {
    case 'category': {
      const anyChildItemsActive =
        items
          .map(childItem => mutateSidebarCollapsingState(childItem, location))
          .filter(val => val).length > 0;
      // eslint-disable-next-line no-param-reassign
      item.collapsed = !anyChildItemsActive;
      return anyChildItemsActive;
    }

    case 'link':
    default:
      return href === location.pathname.replace(/\/$/, '');
  }
}

function DocSidebar(props) {
  const [showResponsiveSidebar, setShowResponsiveSidebar] = useState(false);

  const {
    docsSidebars,
    location,
    sidebar: currentSidebar,
    sidebarCollapsible,
  } = props;

  if (!currentSidebar) {
    return null;
  }

  const sidebarData = docsSidebars[currentSidebar];

  if (!sidebarData) {
    throw new Error(
      `Cannot find the sidebar "${currentSidebar}" in the sidebar config!`,
    );
  }

  if (sidebarCollapsible) {
    sidebarData.forEach(sidebarItem =>
      mutateSidebarCollapsingState(sidebarItem, location),
    );
  }

  return (
      <nav
        className={classnames('menu', {
          'show': showResponsiveSidebar,
        })}>
        <button
          aria-label={showResponsiveSidebar ? 'Close Menu' : 'Open Menu'}
          type="button"
          onClick={() => {
            setShowResponsiveSidebar(!showResponsiveSidebar);
          }}>
          {showResponsiveSidebar ? (
            <span>
              &times;
            </span>
          ) : (
            <svg
              className={styles.sidebarMenuIcon}
              xmlns="http://www.w3.org/2000/svg"
              height={MOBILE_TOGGLE_SIZE}
              width={MOBILE_TOGGLE_SIZE}
              viewBox="0 0 32 32"
              role="img"
              focusable="false">
              <title>Menu</title>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M4 7h22M4 15h22M4 23h22"
              />
            </svg>
          )}
        </button>
        <ul>
          {sidebarData.map(item => (
            <DocSidebarItem
              key={item.label}
              item={item}
              onItemClick={() => {
                setShowResponsiveSidebar(false);
              }}
              collapsible={sidebarCollapsible}
            />
          ))}
        </ul>
      </nav>
  );
}

export default DocSidebar;
