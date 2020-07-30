const initState = {

}

const songsReducer = (state = initState, action) => {
  switch(action.type){
    case 'ADD_SONG':
      console.log('added song', action.song)
      return state
    case 'ADD_SONG_ERROR':
      console.log('add song error', action.err)
      return state;
    case 'CONTRIBUTE_SONG':
      console.log('contributed song', action.song)
      return state;
    case 'CONTRIBUTE_SONG_ERROR':
      console.log('contributed song error', action.err)
      return state;
    case 'CREATED_PLAYLIST':
      console.log('successfully created the playlist', action.playlist)
      return state;
    case 'CREATED_PLAYLIST_ERROR':
      console.log('create playlist error', action.err)
      return state;
    case 'ADD_SONG_TO_PLAYLIST':
      console.log('added song to playlist', action.song)
      return state;
    case 'ADD_SONG_TO_PLAYLIST_ERROR':
      console.log('add song to play list error', action.err)
      return state;
    case 'DELETE_SONG':
      console.log('deleted song', action.song)
      return state;
    case 'DELETE_SONG_ERROR':
      console.log('delete song error', action.err)
      return state;
    default:
      return state;
  }
}

export default songsReducer;
