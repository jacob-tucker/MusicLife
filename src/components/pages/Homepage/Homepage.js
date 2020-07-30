import React from 'react';
import {connect} from 'react-redux'

import './Homepage.css'

const Homepage = ({names}) => {
  return (
    <div>
      <h1 id="titlething">MusicLife</h1>
      {names.firstName ? <div><h1 className="homepage">Welcome, {names.firstName} {names.lastName}, to your Music App!</h1>
      <br />
      <h5 id="intro">Here you can browse a list of songs that were contributed by users like you, store them in your personalized library,
        join your own communities, and socialize with people who share similar interests!</h5></div> : <h3 id="nonlogged">Sign in to enjoy your own personalized music experience!</h3>}

    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    names: {firstName: state.firebase.profile.firstName, lastName: state.firebase.profile.lastName}
  }
}

export default connect(mapStateToProps)(Homepage);
