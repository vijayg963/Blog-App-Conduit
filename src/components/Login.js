import React from 'react';
import { loginURL } from '../utils/constant';
import validate from '../utils/validate';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  state = {
    email: 'userFirst@gmail.com',
    password: 'Vijayg963',
    errors: {
      email: '',
      password: '',
    },
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    validate(errors, name, value);
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    fetch(loginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
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
      .catch((error) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              email: 'Email or Password is incorrect!',
            },
          };
        });
      });
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <>
        <div className='formcontrol'>
          <h1>Sign In</h1>
          <h4>Need an account ?</h4>
          <form onSubmit={this.handleSubmit}>
            <input
              type='email'
              name='email'
              onChange={this.handleChange}
              value={email}
              placeholder='enter your email'
            />
            <span className='error'>{errors.email}</span>
            <input
              type='password'
              name='password'
              autoComplete='on'
              onChange={this.handleChange}
              value={password}
              placeholder='enter your passWord'
            />
            <span className='error'>{errors.password}</span>
            <div className='button'>
              <input
                type='submit'
                disabled={errors.email || errors.password}
                value='Sign In'
              />
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(Login);
