/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from '@docusaurus/Link';

function DocPaginator(props) {
  const {metadata} = props;

  return (
    <nav className="pagination">
      {metadata.previous && (
      <Link
        to={metadata.previous.permalink}>
        <span>Previous</span>
        <p>
          &laquo; {metadata.previous.title}
        </p>
      </Link>
      )}
      {metadata.next && (
      <Link 
        to={metadata.next.permalink}>
        <span>Next</span>
        <p>
          {metadata.next.title} &raquo;
        </p>
      </Link>
      )}
    </nav>
  );
}

export default DocPaginator;
