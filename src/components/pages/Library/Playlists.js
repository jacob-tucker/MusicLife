import React from 'react';
import {connect} from 'react-redux'

import './Playlists.css'

const Playlists = ({location, songs}) => {
  console.log(songs)
  return (
    <div>
      <h1 id="title">{location.state.playlist}</h1>
      {songs.map((thing, i) => {
        return(
          <div key={i} id="songs">
            <h5>{thing.name}</h5>
            <p>{thing.artist}</p>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  var holder = ownProps.location.state.playlist
  return {
    songs: state.firebase.profile[holder] || ['']
  }
}

export default connect(mapStateToProps)(Playlists);
