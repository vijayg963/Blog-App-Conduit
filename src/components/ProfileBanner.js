import React from 'react';
import { withRouter } from 'react-router-dom';
import { userProfileURL } from '../utils/constant';

class ProfileBanner extends React.Component {
  state = {
    profile: '',
    method: 'POST',
  };

  componentDidMount() {
    let author = this.props.match.params.author;
    fetch(userProfileURL + `/${author}`)
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

  followUserFunction = (method) => {
    let username = this.props.user.username;
    fetch(userProfileURL + `/${username}/follow`, {
      method: method,
      headers: {
        'Content-Type': 'application/json ',
        authorization: `Token ${this.props.user.token}`,
      },
    });
  };

  // unFollowUser = () => {
  //   let username = this.props.user.username;
  //   fetch(userProfileURL + `/${username}/follow`, {
  //     method: `DELETE`,
  //     headers: {
  //       'Content-Type': 'application/json ',
  //       authorization: `Token ${this.props.user.token}`,
  //     },
  //   });
  // };

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
              //  <div>
              //   { controlMethod(this.state.method)}
              //  </div>
              <input
                onClick={this.followUserFunction('')}
                type='submit'
                value={`+ Follow ${profile.username}`}
              />
            )}
          </div>
        </div>
      </section>
    );
  }
}

// function controlMethod(props) {
//   if (props.method === 'Post') {
//     <input
//       onClick={this.followUserFunction('')}
//       type='submit'
//       value={`+ Follow ${props.profile.username}`}
//     />;
//   }
//   if (props.method === 'DELETE') {
//     <input
//       onClick={this.followUserFunction('')}
//       type='submit'
//       value={`+ Unfollow ${props.profile.username}`}
//     />;
//   }
// }

export default withRouter(ProfileBanner);
