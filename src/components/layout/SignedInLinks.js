import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'

const SignedInLinks = ({signOut, profile}) => {
  return (
    <ul className="right">
      <li><Link to="/" onClick={signOut}>Log Out</Link></li>
      <li><NavLink to="/" className="btn btn-floating pink lighten-1">{profile.initials}</NavLink></li>
    </ul>

  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }

}

export default connect(null, mapDispatchToProps)(SignedInLinks);
