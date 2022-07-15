import React from 'react';
import validate from '../utils/validate';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
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

export default Login;
