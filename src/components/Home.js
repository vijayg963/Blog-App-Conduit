import Tags from './Tags';
import Posts from './Posts';
import Pagination from './Pagination';
import React from 'react';
import { articleURL } from '../utils/constant';
import FeedNav from './FeedNav';

class Home extends React.Component {
  state = {
    articles: null,
    error: '',
    articlesCount: 0,
    articlePerPage: 10,
    activePageIndex: 1,
    activeTag: '',
  };

  removeTab = () => {
    this.setState({ activeTag: '' });
  };

  addTab = (value) => {
    this.setState({ activeTag: value });
  };

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(_prevProps, prevsState) {
    if (
      prevsState.activePageIndex !== this.state.activePageIndex ||
      prevsState.activeTag !== this.state.activeTag
    ) {
      this.fetchData();
    }
  }
  fetchData = () => {
    const limit = this.state.articlePerPage;
    const offset = (this.state.activePageIndex - 1) * limit;
    const tag = this.state.activeTag;
    fetch(
      articleURL + `/?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`)
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
          error: '',
          articlesCount: data.articlesCount,
        });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to fetch articles' });
      });
  };
  updateCurrentPageIndex = (index) => {
    this.setState({ activePageIndex: index }, this.fetchData);
  };
  render() {
    const { articles, error, articlesCount, articlePerPage, activePageIndex } =
      this.state;
    return (
      <>
        <div className='hero'>
          <h2>
            <strong>conduit</strong>
          </h2>
          <p className='title-line'>A Place to Shear your Knowledge </p>
        </div>
        <div className='main flex'>
          <div className='posts'>
            <div className='feed-header'>
              <FeedNav
                removeTab={this.removeTab}
                activeTag={this.state.activeTag}
              />
            </div>
            <Posts
              handleUserProfile={this.props.handleUserProfile}
              articles={articles}
              error={error}
            />
            <Pagination
              articlePerPage={articlePerPage}
              articlesCount={articlesCount}
              activePageIndex={activePageIndex}
              updateCurrentPageIndex={this.updateCurrentPageIndex}
            />
          </div>
          <div className='tags'>
            <span className='tags-title'>Popular Tags</span>
            <Tags addTab={this.addTab} />
          </div>
        </div>
      </>
    );
  }
}

export default Home;
