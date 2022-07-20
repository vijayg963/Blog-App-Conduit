import React from 'react';
import { signupURL } from '../utils/constant';
import validate from '../utils/validate';
import { withRouter } from 'react-router-dom';

class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    errors: {
      username: '',
      email: '',
      password: '',
    },
  };

  handleChange = ({ target }) => {
    let { name, value } = target;
    let errors = { ...this.state.errors };
    validate(errors, name, value);
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    fetch(signupURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { username, email, password } }),
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
        this.setState({ username: '', password: '', email: '' });
        this.props.history.push('/');
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    const { username, email, password, errors } = this.state;
    return (
      <>
        <div className='formcontrol'>
          <h1>Sign Up</h1>
          <h4>Have an account ?</h4>
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              name='username'
              onChange={this.handleChange}
              value={username}
              placeholder='Username'
            />
            <span className='error'>{errors.username}</span>
            <input
              type='email'
              name='email'
              onChange={this.handleChange}
              value={email}
              placeholder='Email'
            />
            <span className='error'>{errors.email}</span>
            <input
              type='password'
              name='password'
              onChange={this.handleChange}
              value={password}
              placeholder='PassWord'
            />
            <span className='error'>{errors.password}</span>
            <div className='button'>
              <input
                type='submit'
                disabled={errors.email || errors.password || errors.username}
                value='Sign Up'
              />
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(Signup);
