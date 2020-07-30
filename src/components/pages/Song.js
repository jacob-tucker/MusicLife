import React from 'react';
import {NavLink} from 'react-router-dom';

const Song = ({song}) => {
  return (
    <div>
      <NavLink id="thesongs" to={{
          pathname: "/browse/songdetail/song",
          search: `name=${song.songName}`,
          state: {id: song.id}
        }}>

        <h5 style={{fontSize: '40px'}}>{song.songName}</h5>
        <p style={{fontSize: '30px', color: 'darkgrey'}}>{song.artistName}</p>
        <br />

      </NavLink>
    </div>
  )
}

export default Song;
