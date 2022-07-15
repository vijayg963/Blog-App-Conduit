import React from 'react';
import { Link } from 'react-router-dom';

function Post(props) {
  const {
    author,
    createdAt,
    title,
    description,
    favoritesCount,
    tagList,
    slug,
  } = props;
  return (
    <>
      <div className='post'>
        <div className='flex '>
          <div className='Jc-center'>
            <span className='smile'>🙂</span>
            <span>
              <Link to='/'>
                <h4>{author.username}</h4>
              </Link>
              <p className='date'>{createdAt}</p>
            </span>
          </div>
          <div className='likes-counter'>
            ❤ <span>{favoritesCount}</span>
          </div>
        </div>
        <div>
          <Link to={`/article/${slug}`}>
            <h2 className='title'>{title}</h2>
            <p className='description'>{description}</p>
          </Link>

          <div className='flex button-section'>
            <Link to={`/article/${slug}`}>
              <span className='read-more'>Read more...</span>
            </Link>

            <div>
              {tagList.map((tag) => (
                <span key={tag} className={tag ? 'tag-name' : 'hidden'}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
