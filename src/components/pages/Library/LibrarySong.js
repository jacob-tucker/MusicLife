import React from 'react';

const LibrarySong = ({song}) => {
  return (
    <div>
      <h5>{song.name}</h5>
      <p>{song.artist}</p>
      <br />
    </div>
  )


}

export default LibrarySong;
