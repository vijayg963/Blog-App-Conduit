import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { articleURL } from '../utils/constant';
import Loader from './Loader';
import '../style/article.scss';
import UserContext from '../context/UserContext';

class SinglePost extends React.Component {
  state = {
    article: null,
    error: '',
    comments: [],
  };

  static contextType = UserContext;

  componentDidMount() {
    let slug = this.props.match.params.slug;
    fetch(articleURL + `/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          article: data.article,
          error: '',
        });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to fetch article' });
      });
  }

  handleDeleteArticle = () => {
    let slug = this.props.match.params.slug;
    fetch(articleURL + `/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json ',
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Can not Delete article!');
        }
      })
      .then(() => {
        this.props.history.push('/');
      })
      .catch((err) => {
        this.setState({ error: 'Not able to fetch article' });
      });
  };

  render() {
    const { article, error } = this.state;
    let { user } = this.context.data;
    if (error) {
      return <p>{error}</p>;
    }
    if (!article) {
      return <Loader />;
    }
    return (
      <article>
        <section className='header'>
          <h1>{article.title}</h1>
          <div className='flex'>
            <div className='Jc-center'>
              <span className='smile-small'>
                {article.author.image ? (
                  <img
                    src={article.author.image}
                    alt={article.author.username}
                  />
                ) : (
                  '🙂'
                )}
              </span>
              <span>
                <Link to='/'>
                  <h4>{article.author.username}</h4>
                </Link>
                <p className='date'>
                  {article.createdAt.split('').slice(0, 10).join('')}
                </p>
              </span>
            </div>
            <div className='Jc-center'>
              <div
                onClick={() => {
                  this.props.handleUpdateArticle(article);
                  this.props.history.push(`/editArticle/${article.slug}`);
                }}
              >
                {user.username === article.author.username && (
                  <span className='edit-article'>Edit Article</span>
                )}
              </div>
              <div onClick={this.handleDeleteArticle}>
                {user.username === article.author.username && (
                  <span className='Delete-article'>Delete Article</span>
                )}
              </div>
            </div>
          </div>
        </section>
        <div>
          <p>Heading:- {article.description}</p>
          <p> {article.body}</p>
        </div>
        <div className='footer'>
          {user === null ? (
            <footer>
              <p>
                <Link to='/login'>Sign in</Link> or
                <Link to='/signup'>Sign up</Link>
                to add comments on this article.{' '}
              </p>
            </footer>
          ) : (
            <div className='comments'>
              <div>
                <h3>comments</h3>
                <textarea rows='2'></textarea>
                <div className='add-comment-parent'>
                  <button className='add-comment' type='submit'>
                    Comment
                  </button>
                </div>
              </div>
              <div className='singleComment'>
                <span>🙂</span>
                <h4>Author</h4>
                <p>Comment is here</p>
              </div>
            </div>
          )}
        </div>
      </article>
    );
  }
}

export default withRouter(SinglePost);
