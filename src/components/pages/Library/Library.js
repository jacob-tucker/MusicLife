import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import{ connect } from 'react-redux'
import LibrarySong from './LibrarySong'
import {createPlaylist, addSongToPlaylist, deleteSong} from '../../../store/actions/songsActions'

import './Library.css'

const Library = ({profile, createPlaylist, addSongToPlaylist, deleteSong}) => {
  const [playlist, setPlaylist] = useState('')
  const [truth, setTruth] = useState('')
  const [theSong, setTheSong] = useState('')
  const [error, setError] = useState('')

  const updatePlaylist = (e) => {
    setPlaylist(e.target.value)
    setError('')
  }

  const createThePlaylist = (e) => {
    e.preventDefault()
    setError('')
    createPlaylist({playlist: playlist})
  }

  const changeTruth = (thing) => {
    setError('')
    setTruth(!truth)
    setTheSong(thing)
  }

  const onSubmit1 = (e) => {
    e.preventDefault()
    setError('')
    if(profile.playlists.includes(playlist)){
      addSongToPlaylist({song: theSong, playlist: playlist})
      setTruth(false)
    }else{
      setError('You do not have this playlist! Consider creating it.')
    }
  }

  return (
    <div>
      <div>
        <h1 id="songs-title">Your Library</h1>
        {profile.songs.map((thing, i) => {
          return(
            <div key={i}>
              <div key={i} className="library">
                <LibrarySong song={thing} />
                <button className="animate" onClick={() => changeTruth(thing)}>+</button>
                <button className="animate" onClick={() => deleteSong({song: thing})}>-</button>
              </div>
            </div>
          )
        })}
        {truth && profile.songs.length > 0 ? <div className="buttonbar" id="songs-title"><input type="text" onChange={updatePlaylist} placeholder="Enter playlist name" />
      <button onClick={onSubmit1} className="btn pink lighten-1 z-depth-0">Add To Playlist</button></div> : null}
        {error !== ''? <p id="red">{error}</p> : null }
      </div>
      <br />
      <div id="playlists">
        <h1 id="playlists-title">Your Playlists</h1>
        {profile.playlists.map((thing, i) => {
          return(
            <div key={i}>
              <Link id="links" to={{
                pathname: '/library/playlist',
                state: {playlist: thing}}}><p>{thing}</p></Link>
            </div>
          )
        })}
        <div className="buttonbar">
          <input type="text" onChange={updatePlaylist} />
          <button onClick={createThePlaylist} className="btn pink lighten-1 z-depth-0">Create New Playlist</button>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return{
    profile: state.firebase.profile || {songs: [''], playlists: ['']}
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    createPlaylist: ({playlist}) => dispatch(createPlaylist({playlist})),
    addSongToPlaylist: (stuff) => dispatch(addSongToPlaylist(stuff)),
    deleteSong: (song) => dispatch(deleteSong(song))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Library);
