import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addCommunity} from '../../../store/actions/communityActions'
import {joinCommunity} from '../../../store/actions/communityActions'
import {removeCommunity} from '../../../store/actions/communityActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import './Communities.css'

const Communities = ({addCommunity, communities, joinCommunity, yourCommunities, removeCommunity}) => {
  const [community, setCommunity] = useState('')
  const [interests, setInterests] = useState('')
  const [communityName, setCommunityName] = useState('')
  const [communityNameR, setCommunityNameR] = useState('')
  const [error, setError] = useState('')

  const updateCommunity = (e) => {
    setError('')
    setCommunity(e.target.value)
  }

  const updateInterests = (e) => {
    setError('')
    setInterests(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    var boolchecker = false
    communities.map((thing) => {
      if(thing.id === community){
        boolchecker = true
      }
    })
    if(!boolchecker && community !== ''){
      addCommunity({community, interests})
      setCommunity('')
      setInterests('')
    }else{
      setError('This community already exists! Consider joining it.')
    }
  }

  const updateCommunityName = (e) => {
    setError('')
    setCommunityName(e.target.value)
  }

  const updateCommunityNameR = (e) => {
    setError('')
    setCommunityNameR(e.target.value)
  }

  const onSubmit2 = (e) => {
    e.preventDefault()
    var boool = false
    communities.map((thing, i) => {
      if(thing.id === communityName){
        boool = true
      }
    })
    if(boool){
      if(yourCommunities.includes(communityName)){
        setError('You already belong to this community, silly!')
      }else{
        joinCommunity({communityName})
        setCommunityName('')
      }
    }else{
      setError('The community does not exist! Consider creating one!')
    }
  }

  const onSubmit3 = (e) => {
    e.preventDefault()
    var boool = false
    yourCommunities.map((thing, i) => {
      if(thing === communityNameR){
        boool = true
      }
    })
    if (boool){
      removeCommunity({communityNameR})
      setCommunityNameR('')
    }else{
      setError('You are not currently in that community, so dont worry!')
    }
  }

  return (
    <div>
      <div>
        <div className="communitystuff">
            <h5>Create a Community</h5>
            <div>
              <label>Community Name</label>
              <input value={community} type="text" onChange={updateCommunity} />
            </div>
            <div>
              <label>Community Interests</label>
              <input value={interests} type="text"onChange={updateInterests} />
            </div>
            <div>
              <button onClick={onSubmit} className="btn pink lighten-1 z-depth-0">Create</button>
            </div>
        </div>
        <div className="communitystuff">
            <h5>Join a Community</h5>
            <div>
              <label>Community Name</label>
              <input value={communityName} type="text" onChange={updateCommunityName} />
            </div>
            <div>
              <button onClick={onSubmit2} className="btn pink lighten-1 z-depth-0">Join</button>
            </div>
        </div>
        <div className="communitystuff">
            <h5>Remove a Community</h5>
            <div>
              <label>Community Name</label>
              <input value={communityNameR} type="text" onChange={updateCommunityNameR} />
            </div>
            <div>
              <button onClick={onSubmit3} className="btn pink lighten-1 z-depth-0">Remove</button>
            </div>
        </div>
        <h2 className="error">{error}</h2>
      </div>
      <div className="suggested">
        <h2 style={{color: 'pink'}}>Suggested Communities</h2>
        {communities.map((thing, i) => {
            if(i < 5 && !yourCommunities.includes(thing.id)){
              return(
                <div>
                  <p>{thing.id}</p>
                  <p id="interesttext">{thing.interests}</p>
                </div>
              )
            }
        })}
      </div>
      <div className="list">
        <h2 style={{color: 'pink'}}>Your Communities</h2>
        {yourCommunities.map((thing, i) => {
          return(
            <div className="community"><Link to={{
                pathname: "/communities/community",
                search: `community=${thing}`,
                state: {communityName: thing}
              }} key={i}>{thing}</Link></div>
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    communities: state.firestore.ordered.communities || [{id: "fake!", posts: [], songs: []}],
    yourCommunities: state.firebase.profile.communities || ['Loading...']
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCommunity: (community) => dispatch(addCommunity(community)),
    joinCommunity: (community) => dispatch(joinCommunity(community)),
    removeCommunity: (community) => dispatch(removeCommunity(community))
  }
}

export default compose(
  firestoreConnect([
    {collection: 'communities'}
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Communities);
