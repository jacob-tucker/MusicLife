import db from '../../config/firebase'
import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

export const addCommunity = (community) => {
  return (dispatch, getState) => {
    db.collection('users').doc(getState().firebase.auth.uid).set({
      communities: [...getState().firebase.profile.communities, community.community]
    }, {merge: true}
    ).then(
      db.collection('communities').doc(community.community).set({
        posts: [],
        songs: [],
        interests: community.interests,
        people: 1
      }, {merge: true})
    ).then(
      dispatch({type: 'ADD_COMMUNITY', community: community})
    ).catch((err) => {
      dispatch({type: 'ADD_COMMUNITY_ERROR', err})
    })
  }
}

export const postMessage = ({post, community, posts, name, id}) => {
  return (dispatch, getState) => {
    db.collection('communities').doc(community).set({
      posts: [...posts, {post: post + ' - ' + name.firstName + ' ' + name.lastName, id: id}]
    }, {merge: true}
  ).then(
    dispatch({type: 'ADD_POST', post: post})
  ).catch((err) => {
    dispatch({type: 'ADD_POST_ERROR', err})
  })
  }
}

export const joinCommunity = ({communityName}) => {
  return (dispatch, getState) => {
    db.collection('users').doc(getState().firebase.auth.uid).set({
      communities: [...getState().firebase.profile.communities, communityName]
    }, {merge: true}
    ).then(
      db.collection('communities').doc(communityName).set({
        people: firebase.firestore.FieldValue.increment(1)
      }, {merge: true})
    ).then(
      dispatch({type: 'ADD_COMMUNITY', community: communityName})
    ).catch((err) => {
      dispatch({type: 'ADD_COMMUNITY_ERROR', err})
    })
  }
}

export const removeCommunity = ({communityNameR}) => {
  return (dispatch, getState) => {
    db.collection('users').doc(getState().firebase.auth.uid).set({
      communities: firebase.firestore.FieldValue.arrayRemove(communityNameR)
    }, {merge: true}).then(
      db.collection('communities').doc(communityNameR).update({
        people: firebase.firestore.FieldValue.increment(-1)
      })
    ).then(
      dispatch({type: 'REMOVE_COMMUNITY', community: communityNameR})
    ).catch((err) => {
      dispatch({type: 'REMOVE_COMMUNITY_ERROR', err})
    })
  }
}

export const deletePost = ({post, communityName, id}) => {
  return (dispatch, getState) => {
    db.collection('communities').doc(communityName).update({
      posts: firebase.firestore.FieldValue.arrayRemove({id, post})
    }).then(
      dispatch({type: 'DELETE_POST', post: post})
    ).catch((err) => {
      dispatch({type: 'DELETE_POST_ERROR', err})
    })
  }
}
