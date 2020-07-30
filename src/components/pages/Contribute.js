import React, {useState} from 'react'
import {connect} from 'react-redux'
import {contributeSong} from '../../store/actions/songsActions'
import {contributeSongCommunity} from '../../store/actions/songsActions'
import {contributeSongCommunityOnly} from '../../store/actions/songsActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

import {appHistory} from '../../App'

const Contribute = ({contributeSong, contributeSongCommunity, contributeSongCommunityOnly, communities, allSongs}) => {
  const [song, setSong] = useState('')
  const [artist, setArtist] = useState('')
  const [community, setCommunity] = useState('')
  const [error, setError] = useState('')

  const updateSong = (e) => {
    setError('')
    setSong(e.target.value)
  }

  const updateArtist = (e) => {
    setError('')
    setArtist(e.target.value)
  }

  const updateCommunity = (e) => {
    setError('')
    setCommunity(e.target.value)
  }

  const onSubmit = (e) => {
    if(community === ''){
      appHistory.push('/browse')
      contributeSong({song, artist})
    } else if(communities.includes(community)){
      var boolCheck = false
      allSongs.map((thing, i) => {
        if(thing.songName === song && thing.artistName === artist){
          boolCheck = true
        }
      })
      if(!boolCheck){
        contributeSongCommunity({song, artist, community})
      }else{
        contributeSongCommunityOnly({song, artist, community})
      }
      appHistory.push('/browse')
    } else{
      setError('You do not belong to this community!')
    }
  }

  return (
    <div className="container">
        <h5 className="grey-text text-darken-3">Contribute a Song!</h5>
        <div>
          <label>Song Name</label>
          <input type="text" onChange={updateSong} />
        </div>
        <div>
          <label>Artist's Name</label>
          <input type="text" onChange={updateArtist} />
        </div>
        <div>
          <label>Community (optional)</label>
          <input type="text" onChange={updateCommunity} />
        </div>
        <div className="input-field">
          <button onClick={onSubmit} className="btn pink lighten-1 z-depth-0">Submit</button>
        </div>
        <p>{error}</p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    communities: state.firebase.profile.communities,
    allSongs: state.firestore.ordered.allSongs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    contributeSong: (song) => dispatch(contributeSong(song)),
    contributeSongCommunity: (song) => dispatch(contributeSongCommunity(song)),
    contributeSongCommunityOnly: (song) => dispatch(contributeSongCommunityOnly(song))
  }
}

export default compose(
  firestoreConnect([
    {collection: 'users'}, {collection: 'allSongs'}
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Contribute)
