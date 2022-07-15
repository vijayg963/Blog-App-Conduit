import React from 'react';
import { Link } from 'react-router-dom';
import { articleURL } from '../utils/constant';
import Loader from './Loader';
import '../style/article.scss';

class SinglePost extends React.Component {
  state = {
    article: null,
    error: '',
  };

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

  render() {
    const { article, error } = this.state;
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
          <div className='Jc-center'>
            <span className='smile'>🙂</span>
            <span>
              <Link to='/'>
                <h4>{article.author.username}</h4>
              </Link>
              <p className='date'>{article.createdAt}</p>
            </span>
          </div>
        </section>
        <div>
          <p>Heading:- {article.description}</p>
          <p> {article.body}</p>
        </div>
      </article>
    );
  }
}

export default SinglePost;
