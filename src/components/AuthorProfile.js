import React from 'react';
import { articleURL } from '../utils/constant';
import { withRouter } from 'react-router-dom';
import Posts from './Posts';
import ProfileBanner from './ProfileBanner';

class AuthorProfile extends React.Component {
  state = {
    activeTab: 'author',
    articles: [],
  };

  fetchData = () => {
    let author = this.props.match.params.author;
    fetch(articleURL + `?${this.state.activeTab}=${author}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          articles: data.articles,
          error: '',
        });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to fetch article' });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  handleActive = (value) => {
    this.setState({ activeTab: value }, () => {
      this.fetchData();
    });
  };

  render() {
    const { activeTab, articles } = this.state;
    return (
      <>
        <div>
          <ProfileBanner user={this.props.user} />
          <div className='main'>
            <div className='feed-title profile-feed'>
              <span
                onClick={() => this.handleActive('author')}
                className={activeTab === 'author' ? 'active' : ''}
              >
                My Article
              </span>
              <span
                onClick={() => this.handleActive('favorited')}
                className={activeTab === 'favorited' ? 'active' : ''}
              >
                Favorited Article
              </span>
            </div>
            <div className='profile-article'>
              <Posts articles={articles} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(AuthorProfile);
