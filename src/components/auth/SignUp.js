import React, {useState} from 'react';
import {signUp} from '../../store/actions/authActions'
import {connect} from 'react-redux'

const SignUp = ({signUp, authError}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const updateEmail = (e) => {
    setEmail(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  }

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const updateLastName = (e) => {
    setLastName(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    signUp({email, password, firstName, lastName})
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="white">
        <h5 className="grey-text text-darken-3">Sign Up</h5>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={updateEmail} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={updatePassword} />
        </div>
        <div>
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" onChange={updateFirstName} />
        </div>
        <div>
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" onChange={updateLastName} />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
          <div className="red-text center">
            { authError ? <p> {authError }</p> : null}
          </div>
        </div>
      </form>

    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
