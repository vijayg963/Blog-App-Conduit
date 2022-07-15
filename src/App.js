import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import NoMatch from './components/NoMatch';
import { Route, Switch } from 'react-router-dom';
import SinglePost from './components/SinglePost';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/article/:slug' component={SinglePost} />
        <Route path='*'>
          <NoMatch />
        </Route>
      </Switch>
    </>
  );
}

export default App;
