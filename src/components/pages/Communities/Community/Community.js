import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {deletePost} from '../../../../store/actions/communityActions'

import './Community.css'
import Background from './song-notes.jpg';

const Community = ({location, postMessage, community, id, deletePost}) => {

  const deleteIt = (post) => {
    deletePost({post, communityName: location.state.communityName, id})
  }

  return (
      <div>
        <h3 className="cover" style={{backgroundImage: `url(${Background})`, opacity: 1}}>{community.id}</h3>
        <div>
          <div className="posts">
            <h3>Posts</h3><Link id="poster" to={{
                pathname: '/communities/community/postmessage',
                state: {communityName: location.state.communityName}
              }}>Post a Message</Link>

              <div className="scroll">
              {community.posts.map((thing, i) => {
                if(thing.id === id){
                  return (
                    <div className="post">
                      <p key={i}>{thing.post}</p><button onClick={() => deleteIt(thing.post)} id="button-shit">x</button>
                      <br />
                    </div>
                  )
                }else{
                  return (
                    <div>
                      <p className="post" key={i}>{thing.post}</p>
                      <br />
                    </div>
                  )
                }
              })}
            </div>
          </div>
          <div className="songs">
            <h3>Songs</h3>
            {community.songs.map((thing, i) => {
              return (
                <div key={i}>
                  <div className="package">
                    <h5>{thing.songName}</h5>
                    <p>{thing.artistName}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
}

const mapStateToProps = (state, ownProps) => {
  var holder = ''
  state.firestore.ordered.communities.map((thing, i) => {
    if(thing.id === ownProps.location.state.communityName){
      holder = thing
    }
  })
  return{
    community: holder || {id: "fake!", songs: [], posts: []},
    id: state.firebase.auth.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: ({post, communityName, id}) => dispatch(deletePost({post, communityName, id}))
  }
}

export default compose(
  firestoreConnect([
    {collection: 'communities'}
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Community)
