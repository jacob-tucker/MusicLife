import React from 'react';
import './App.css';
import {Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Browse from './components/pages/Browse/Browse'
import Library from './components/pages/Library/Library'
import Playlists from './components/pages/Library/Playlists'
import Contribute from './components/pages/Contribute'
import Communities from './components/pages/Communities/Communities'
import Community from './components/pages/Communities/Community/Community'
import PostMessage from './components/pages/PostMessage'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Homepage from './components/pages/Homepage/Homepage';
import SongDetail from './components/pages/SongDetail/SongDetail';
import PrivateRouteLoggedOut from './PrivateRouteLoggedOut'
import PrivateRouteLoggedIn from './PrivateRouteLoggedIn'

import { createBrowserHistory } from 'history';
export const appHistory = createBrowserHistory();

const App = () => {
  return (
    <Router history={appHistory}>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <PrivateRouteLoggedIn exact path="/signin" component={SignIn} />
          <PrivateRouteLoggedIn exact path="/signup" component={SignUp} />
          <PrivateRouteLoggedOut exact path="/browse" component={Browse} />
          <PrivateRouteLoggedOut exact path="/library" component={Library} />
          <PrivateRouteLoggedOut exact path="/library/playlist" component={Playlists} />
          <PrivateRouteLoggedOut exact path="/contribute" component={Contribute} />
          <PrivateRouteLoggedOut exact path="/communities" component={Communities} />
          <PrivateRouteLoggedOut exact path="/communities/community" component={Community} />
          <PrivateRouteLoggedOut path="/communities/community/postmessage" component={PostMessage} />
          <PrivateRouteLoggedOut path="/browse/songdetail/song" component={SongDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
