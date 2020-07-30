import React, {useState} from 'react';
import Song from '../Song'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import './Browse.css';

const Browse = ({songs, auth, communities}) => {
  const [search, setSearch] = useState('')

  const updateSearch = (e) => {
    setSearch(e.target.value)
  }

  var bighit = 0
  var hotsong = {songName: '', artistName: ''}
  var peoples = 0
  var theCommunity = ''
  return (
    <div className="browsetab">
      <h1 style={{color: 'pink'}}>Browse</h1>
      <div className="latesttrack">
        <p>Latest Tracks</p>
        <h4>{songs[songs.length-1].songName}</h4>
      </div>
      <div className="hottesttrack">
        <p>Hottest Track</p>
        <h4>{songs.map((thing, i) => {
            if(songs[i].hit > bighit){
              hotsong = {songName: songs[i].songName, artistName: songs[i].artistName}
              bighit = songs[i].hit
            }
          })}{hotsong.songName}</h4>
      </div>
      <div className="popcommunity">
        <p>Popping Communities</p>
        <h4>{communities.map((thing, i) => {
            if(communities[i].people > peoples){
              theCommunity = thing.id
              peoples = communities[i].people
            }
          })}{theCommunity}</h4>
      </div>
      <div className = "browse">
        <input type="text" placeholder="Search..." onChange={updateSearch} />
        {songs.map((thing, i) => {
          if(search === ''){
            return(
                <div key={i}><Song song={thing} key={i} /></div>
            )
          }else{
            if (thing.songName.includes(search) || thing.artistName.includes(search)){
              return(
                  <div key={i}><Song song={thing} key={i} /></div>
              )
            }
          }
        })}
      </div>
    </div>

  )
}

//This takes the songs from the store (look at rootReducer) and puts it into the props of Browse
//The || with the empty object is put there becuase initially, firebase won't have time to retrieve the data
//but we need to have it map over something, so we can pass in an empty thing so it can at least read it
const mapStateToProps = (state) => {
  console.log(state)
  return{
    songs: state.firestore.ordered.allSongs || [{artistName: '', songName: ''}],
    auth: state.firebase.auth,
    communities: state.firestore.ordered.communities || ['']
  }
}

//firestoreConnect makes the firestone listen to the specific allSongs collection
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'allSongs'}, {collection: 'communities'}
  ])
)(Browse);
