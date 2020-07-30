import React, {useState} from 'react';
import {connect} from 'react-redux'
import {signIn} from '../../store/actions/authActions'

const SignIn = ({signIn, authError}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateEmail = (e) => {
    setEmail(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    signIn({email, password})
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="white">
        <h5 className="grey-text text-darken-3">Sign In</h5>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={updateEmail} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={updatePassword} />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Login</button>
          <div className="red-text center">
            {authError ? <p>{authError}</p> : null}
          </div>
        </div>
      </form>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
