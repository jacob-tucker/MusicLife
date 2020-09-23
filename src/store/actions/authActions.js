import firebase from 'firebase'
import db from '../../config/firebase'

export const signIn = (credentials) => {
  return (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err })
    })
  }
}

export const signOut = () => {
  return (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'SIGNOUT_ERROR', err })
    })
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState) => {
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((resp) => {
      return db.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0],
        songs: [],
        playlists: [],
        communities: []
      })
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' })
    }).catch(err => {
      dispatch({ type: 'SIGNUP_ERROR', err })
    })
  }
}
