import React from 'react';
import { withRouter } from 'react-router-dom';
import { ROOT_URL } from '../utils/constant';

class ProfileBanner extends React.Component {
  state = {
    profile: '',
  };

  componentDidMount() {
    let author = this.props.match.params.author;
    fetch(ROOT_URL + `profiles/${author}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          profile: data.profile,
          error: '',
        });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to fetch article' });
      });
  }

  render() {
    const { profile } = this.state;
    return (
      <section>
        <div className='hero-user'>
          <div className='smile'>
            {profile.image ? (
              <img src={profile.image} alt={profile.username} />
            ) : (
              '🙂'
            )}
          </div>
          <h2>{profile.username}</h2>

          <div className='edit-profile'>
            <p className='bio'>
              {profile.bio && <strong>Bio:-</strong>}{' '}
              {profile.bio ? profile.bio : ''}
            </p>
            {profile.username !== this.props.user.username && (
              <input type='submit' value={`+ Follow ${profile.username}`} />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(ProfileBanner);
