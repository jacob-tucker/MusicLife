import React from 'react';
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import {isLoaded} from 'react-redux-firebase'


const Navbar = ({auth, profile}) => {
  const options = auth.uid ? <div><li><Link to="/browse">Browse</Link></li><li><Link to="/library">Library</Link></li><li><Link to="/contribute">Contribute</Link></li><li><Link to="/communities">Communities</Link></li></div> : null
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="center brand-logo">MusicLife</Link>
        <ul className="left">
          {isLoaded(auth) && options}
        </ul>
        {isLoaded(auth) && links}
      </div>
    </nav>

  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar);
