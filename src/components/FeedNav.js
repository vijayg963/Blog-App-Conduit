import React from 'react';
import { Link } from 'react-router-dom';
import '../style/feednav.scss';

function FeedNav(props) {
  return (
    <nav>
      <span
        onClick={props.removeTab}
        className={props.activeTag === '' ? 'feed-title active' : 'feed-title'}
      >
        <Link>Global Feed</Link>
      </span>
      {props.activeTag && (
        <span className='feed-title active'>
          <Link># {props.activeTag}</Link>
        </span>
      )}
    </nav>
  );
}

export default FeedNav;
