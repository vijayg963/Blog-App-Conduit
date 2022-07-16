import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import NoMatch from './components/NoMatch';
import { Route, Switch } from 'react-router-dom';
import SinglePost from './components/SinglePost';
import React from 'react';
import { localStorageKey, userVerifyURL } from './utils/constant';
import FullPageSpiner from './components/FullPageSpiner';
import NewPost from './components/NewPost';
import Setting from './components/Setting';
import Profile from './components/Profile';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerifying: true,
  };

  componentDidMount() {
    let storageKey = localStorage[localStorageKey];
    if (storageKey) {
      fetch(userVerifyURL, {
        method: 'GET',
        headers: {
          authorization: `Token ${storageKey}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => this.updateUser(user))
        .catch((errors) => console.log(errors));
    } else {
      this.setState({ isVerifying: false });
    }
  }

  updateUser = (user) => {
    this.setState({ isLoggedIn: true, user, isVerifying: false });
    localStorage.setItem(localStorageKey, user.token);
  };

  render() {
    let { isLoggedIn, user } = this.state;
    if (this.state.isVerifying) {
      return <FullPageSpiner />;
    }
    return (
      <>
        <Header isLoggedIn={isLoggedIn} user={user} />
        {this.state.isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </>
    );
  }
}

function AuthenticatedApp() {
  return (
    <div>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/article/:slug' component={SinglePost} />
        <Route path='/new-post' exact>
          <NewPost />
        </Route>
        <Route path='/settings' exact>
          <Setting />
        </Route>
        <Route path='/profile' exact>
          <Profile />
        </Route>
        <Route path='*'>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

function UnauthenticatedApp() {
  return (
    <div>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/login'>
          <Login updateUser={this.updateUser} />
        </Route>
        <Route path='/signup'>
          <Signup updateUser={this.updateUser} />
        </Route>
        <Route path='/article/:slug' component={SinglePost} />
        <Route path='*'>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
