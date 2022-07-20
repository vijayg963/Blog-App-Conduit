import React from 'react';
import { Link } from 'react-router-dom';
import { articleURL } from '../utils/constant';
import Posts from './Posts';

class Profile extends React.Component {
  state = {
    activeTab: 'author',
    articles: [],
  };

  fetchData = () => {
    fetch(articleURL + `/?${this.state.activeTab}=${this.props.user.username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Can not fetch data for specific user!');
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
        });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to fetch articles' });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  handleActive = (lable) => {
    this.setState({ activeTab: lable }, () => {
      this.fetchData();
    });
  };

  render() {
    const { activeTab } = this.state;
    const { user } = this.props;
    return (
      <div>
        <div className='hero-user'>
          <div className='smile'>
            {user.image ? <img src={user.image} alt={user.username} /> : '🙂'}
          </div>
          <h2>{user.username}</h2>
          <div className='edit-profile'>
            <Link to={'/settings'}>
              <input type='submit' value={`Edit Profile`} />
            </Link>
          </div>
        </div>
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
            <Posts articles={this.state.articles} />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
