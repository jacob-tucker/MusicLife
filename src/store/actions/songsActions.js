import db from '../../config/firebase'
import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

export const addSong = ({song, id, hit}) => {
  return (dispatch, getState) => {
    // make async call to database, so helpful
    //because before we would just be dispatching,
    //without being able to make any async calls
    //before hand
    //This will allow us to go to a database
    console.log(song)
    console.log(hit)
    db.collection('users').doc(getState().firebase.auth.uid).set({
      songs: [...getState().firebase.profile.songs, song]
    }, {merge: true}
    ).then(
      db.collection('allSongs').doc(id).set({
        hit: hit + 1
      }, {merge: true})
    ).then(
      dispatch({type: 'ADD_SONG', song: song})
    ).catch((err) => {
      dispatch({ type: 'ADD_SONG_ERROR', err})
    })
  }
}

export const contributeSong = (song) => {
  return (dispatch, getState) => {
    db.collection('allSongs').add({
      songName: song.song,
      artistName: song.artist,
      hit: 0
    }).then(
      dispatch({type: 'CONTRIBUTE_SONG', song: song})
    ).catch((err) => {
      dispatch({type: 'CONTRIBUTE_SONG_ERROR', err})
    })
  }
}

export const contributeSongCommunity = (song) => {
  return (dispatch, getState) => {
    db.collection('allSongs').add({
      songName: song.song,
      artistName: song.artist,
      hit: 0
    }).then(
      db.collection('communities').doc(song.community).update({
        songs: firebase.firestore.FieldValue.arrayUnion({songName: song.song, artistName: song.artist})
      })
    ).then(
      dispatch({type: 'CONTRIBUTE_SONG', song: song})
    ).catch((err) => {
      dispatch({type: 'CONTRIBUTE_SONG_ERROR', err})
    })
  }
}

export const contributeSongCommunityOnly = (song) => {
  return (dispatch, getState) => {
    db.collection('communities').doc(song.community).update({
      songs: firebase.firestore.FieldValue.arrayUnion({songName: song.song, artistName: song.artist})
    }).then(
      dispatch({type: 'CONTRIBUTE_SONG', song: song})
    ).catch((err) => {
      dispatch({type: 'CONTRIBUTE_SONG_ERROR', err})
    })
  }
}

export const createPlaylist = ({playlist}) => {
  return (dispatch, getState) => {
    db.collection('users').doc(getState().firebase.auth.uid).update({
      playlists: firebase.firestore.FieldValue.arrayUnion(playlist),
      [playlist]: []
    }).then(
      dispatch({type: 'CREATED_PLAYLIST', playlist: playlist})
    ).catch((err) => {
      dispatch({type: 'CREATED_PLAYLIST_ERROR', err})
    })
  }
}

export const addSongToPlaylist = ({song, playlist}) => {
  return (dispatch, getState) => {
    db.collection('users').doc(getState().firebase.auth.uid).update({
      [playlist]: firebase.firestore.FieldValue.arrayUnion(song)
    }).then(
      dispatch({type: 'ADD_SONG_TO_PLAYLIST', song: song})
    ).catch((err) => {
      dispatch({type: 'ADD_SONG_TO_PLAYLIST_ERROR', err})
    })
  }
}

export const deleteSong = ({song}) => {
  console.log(song.hit)
  return (dispatch, getState) => {
    db.collection('users').doc(getState().firebase.auth.uid).update({
      songs: firebase.firestore.FieldValue.arrayRemove(song)
    }).then(
      dispatch({type: 'DELETE_SONG', song: song})
    ).catch((err) => {
      dispatch({type: 'DELETE_SONG_ERROR', err})
    })
  }
}
