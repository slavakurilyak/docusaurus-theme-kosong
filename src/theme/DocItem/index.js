import React from 'react';

import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocPaginator from '@theme/DocPaginator';
import useTOCHighlight from '@theme/hooks/useTOCHighlight';

import styles from './styles.module.css';

const LINK_CLASS_NAME = 'toc__link';
const ACTIVE_LINK_CLASS_NAME = 'toc__link--active';
const TOP_OFFSET = 100;

function DocTOC({headings}) {
  useTOCHighlight(LINK_CLASS_NAME, ACTIVE_LINK_CLASS_NAME, TOP_OFFSET);
  return (
    <Headings headings={headings} />
  );
}

/* eslint-disable jsx-a11y/control-has-associated-label */
function Headings({headings, isChild}) {
  if (!headings.length) return null;
  return (
    <ul className={isChild ? '' : styles.toc}>
      {headings.map(heading => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={LINK_CLASS_NAME}
            dangerouslySetInnerHTML={{__html: heading.value}}
          />
          <Headings isChild headings={heading.children} />
        </li>
      ))}
    </ul>
  );
}

function DocItem(props) {
  const {siteConfig = {}} = useDocusaurusContext();
  const {url: siteUrl} = siteConfig;
  const {content: DocContent} = props;
  const {metadata} = DocContent;
  const {
    description,
    title,
    permalink,
    image: metaImage,
    editUrl,
    lastUpdatedAt,
    lastUpdatedBy,
    keywords,
    version,
  } = metadata;
  const {
    frontMatter: {
      hide_title: hideTitle,
      hide_table_of_contents: hideTableOfContents,
    },
  } = DocContent;

  const metaImageUrl = siteUrl + useBaseUrl(metaImage);

  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        {keywords && keywords.length && (
          <meta name="keywords" content={keywords.join(',')} />
        )}
        {metaImage && <meta property="og:image" content={metaImageUrl} />}
        {metaImage && <meta property="twitter:image" content={metaImageUrl} />}
        {metaImage && (
          <meta name="twitter:image:alt" content={`Image for ${title}`} />
        )}
        {permalink && <meta property="og:url" content={siteUrl + permalink} />}
      </Head>

      <article>
        {version && (
        <span>
          Version: {version}
        </span>
        )}
        {!hideTitle && (
        <header>
          <h1>{title}</h1>
        </header>
        )}

        <div className="markdown">
          <DocContent />
        </div>
      </article>
      {(editUrl || lastUpdatedAt || lastUpdatedBy) && (
      <div>
        {editUrl && (
        <a
          href={editUrl}
          target="_blank"
          rel="noreferrer noopener">
          <svg
            fill="currentColor"
            height="1.2em"
            width="1.2em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 40 40"
            style={{
              marginRight: '0.3em',
              verticalAlign: 'sub',
            }}>
            <g>
              <path d="m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z" />
            </g>
          </svg>
          Edit this page
        </a>
        )}

        {(lastUpdatedAt || lastUpdatedBy) && (
        <em>
          <small>
            Last updated{' '}
            {lastUpdatedAt && (
              <>
                on{' '}
                <time
                  dateTime={new Date(
                    lastUpdatedAt * 1000,
                  ).toISOString()}
                  className={styles.docLastUpdatedAt}>
                  {new Date(
                    lastUpdatedAt * 1000,
                  ).toLocaleDateString()}
                </time>
                {lastUpdatedBy && ' '}
              </>
            )}
            {lastUpdatedBy && (
              <>
                by <strong>{lastUpdatedBy}</strong>
              </>
            )}
            {process.env.NODE_ENV === 'development' && (
              <small>
                {' '}
                (Simulated during dev for better perf)
              </small>
            )}
          </small>
        </em>
        )}
      </div>
      )}
      <DocPaginator metadata={metadata} />


    {!hideTableOfContents && DocContent.rightToc && (
      <DocTOC headings={DocContent.rightToc} />
    )}
    </>
  );
}

export default DocItem;
