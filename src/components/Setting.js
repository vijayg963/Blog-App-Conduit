import React from 'react';

class Setting extends React.Component {
  state = {
    imageUrl: '',
    username: '',
    bio: '',
    password: '',
  };
  render() {
    return (
      <div className='formcontrol'>
        <h1>Your Settings</h1>
        <form>
          <input type='text' placeholder='Url of profile picture' />{' '}
          <input type='text' placeholder='UserName' />
          <textarea rows='10' placeholder='Short bio about you'></textarea>
          <input type='text' placeholder='Email' />{' '}
          <input type='text' placeholder='Password' />
          <input type='submit' value={'Update Settings'} />
        </form>
        <input type='submit' value={'Log Out'} />
      </div>
    );
  }
}

export default Setting;
