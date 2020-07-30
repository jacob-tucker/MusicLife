import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {postMessage} from '../../store/actions/communityActions'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

const PostMessage = ({location, postMessage, community, name, id}) => {
  const [message, setMessage] = useState('')

  const updateMessage = (e) => {
    setMessage(e.target.value)
  }

  const onSubmit = (e) => {
    postMessage({post: message, community: community.id, posts: community.posts, name: name, id: id})
  }

  return(
    <div className="container">
      <form className="white">
        <h5 className="grey-text text-darken-3">Add Post</h5>
        <div>
          <label>Inform your community...</label>
          <input type="text" id="firstname" onChange={updateMessage} />
        </div>
        <div className="input-field">
          <Link to={{
            pathname: '/communities/community',
            search: `community=${community.id}`,
            state: {communityName: community.id}
          }}><button onClick={onSubmit} className="btn pink lighten-1 z-depth-0">Make Post</button></Link>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  var holder = ''
  state.firestore.ordered.communities.map((thing, i) => {
    if(thing.id === ownProps.location.state.communityName){
      holder = thing
    }
  })
  return{
    community: holder || {id: "fake!", songs: [], posts: []},
    name: {firstName: state.firebase.profile.firstName, lastName: state.firebase.profile.lastName},
    id: state.firebase.auth.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: ({post, community, posts, name, id}) => dispatch(postMessage({post, community, posts, name, id}))
  }
}

export default compose(
  firestoreConnect([
    {collection: 'communities'}
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(PostMessage)
