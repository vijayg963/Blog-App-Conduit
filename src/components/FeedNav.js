import React from 'react';
import '../style/feednav.scss';

function FeedNav(props) {
  return (
    <nav>
      <span
        onClick={props.removeTab}
        className={props.activeTag === '' ? 'feed-title active' : 'feed-title'}
      >
        Global Feed
      </span>
      {props.activeTag && (
        <span className='feed-title active'># {props.activeTag}</span>
      )}
    </nav>
  );
}

export default FeedNav;
