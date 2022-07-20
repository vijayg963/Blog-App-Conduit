import React from 'react';
import validate from '../utils/validate';
import { withRouter } from 'react-router-dom';
import { ROOT_URL } from '../utils/constant';

class Setting extends React.Component {
  state = {
    bio: this.props.user.bio || '',
    email: this.props.user.email || '',
    image: this.props.user.image || '',
    username: this.props.user.username || '',
    password: '',
    errors: {
      email: '',
      username: '',
      password: '',
    },
  };

  handleLogout = () => {
    return localStorage.clear();
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    validate(errors, name, value);
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { bio, email, image, username, password } = this.state;
    fetch(ROOT_URL + `user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        user: { bio, email, image, username, password: password || undefined },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.updateUser(user);
        this.props.history.push('/');
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    const { user } = this.props;
    const { bio, email, image, password, username, errors } = this.state;
    return (
      <div className='formcontrol'>
        <h1>Your Settings</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type='url'
            name='image'
            placeholder={user.image ? user.image : 'Url of profile picture'}
            onChange={this.handleChange}
            value={image}
          />
          <input
            type='text'
            name='username'
            placeholder={user.username ? user.username : 'UserName'}
            onChange={this.handleChange}
            value={username}
          />
          <textarea
            rows='10'
            name='bio'
            onChange={this.handleChange}
            value={bio}
            placeholder={user.bio ? user.bio : 'Short bio about you'}
          ></textarea>
          <input
            type='email'
            name='email'
            onChange={this.handleChange}
            placeholder={user.email ? user.email : 'Email'}
            value={email}
          />
          <span className='error'>{errors.email}</span>
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={this.handleChange}
            value={password}
          />
          <input type='submit' value='Update Settings' />
        </form>
        <a href='/'>
          <input onClick={this.handleLogout} type='submit' value={'Log Out'} />
        </a>
      </div>
    );
  }
}

export default withRouter(Setting);
