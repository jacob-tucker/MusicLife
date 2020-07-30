const initState = {
  communities: []
}

const communityReducer = (state = initState, action) => {
  switch(action.type){
    case 'ADD_COMMUNITY':
      console.log('added community', action.community)
      return state
    case 'ADD_COMMUNITY_ERROR':
      console.log('add community error', action.err)
      return state;
    case 'ADD_POST':
      console.log('add post', action.post)
      return state;
    case 'ADD_POST_ERROR':
      console.log('add post error', action.err)
      return state;
    case 'REMOVE_COMMUNITY':
      console.log('removed communuty', action.community)
      return state;
    case 'REMOVE_COMMUNUTY_ERROR':
      console.log('remove community error', action.err)
      return state;
    case 'DELETE_POST':
      console.log('deleted post', action.post)
      return state;
    case 'DELETE_POST_ERROR':
      console.log('delete post error', action.err)
      return state;
    default:
      return state;
  }
}

export default communityReducer;
