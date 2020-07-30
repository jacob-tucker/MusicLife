import React from 'react';
import {addSong} from '../../../store/actions/songsActions'
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Link} from 'react-router-dom'

import './SongDetail.css'

const SongDetail = ({location, addSong, song}) => {
  console.log(location.state.id)
  const addTheSong = () => {
    addSong({song, id: location.state.id, hit: song.hit})
  }

  return (
    <div>
      <h5 id="songname">Song: {song.name}</h5>
      <h6 id="artistname">Artist: {song.artist}</h6>
      <div class="centered">
        <Link id="specialbutton" to="/Library"><button onClick={addTheSong}>Add
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        </button></Link>
      </div>
    </div>
  )
}

//ownProps means we're using the props from the above function
//Also, notice we're moving to a system entirely handled by firebase and redux. Before, we had to pass down the songs
//inside location, we did this in Song.js and inside state we did song: song, but we don't need that anymore, since we're
//getting all of our info from firebase now
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.location.state.id
  console.log(id)
  const allSongs = state.firestore.data.allSongs
  const song = allSongs ? allSongs[id] : null
  return {
    song: {name: song.songName, artist: song.artistName, hit: song.hit, id: id}
  }
}
//We are passing everything inside the return to the props, so in this case the addSong method, which does the stuff
//we set it equal to.
const mapDispatchToProps = (dispatch) => {
  return {
    addSong: ({song, id, hit}) => dispatch(addSong({song, id, hit}))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: "allSongs"}
  ])
)(SongDetail);
