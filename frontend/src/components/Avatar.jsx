import React from 'react'

function Avatar({av, height, width}) {

  return (
    <>
    {av !== "null" || !av ? <img className={`mr-2 h-${height} min-w-${width} rounded-full`} src={av} /> : <div className={`mr-2 h-${height} min-w-${width} rounded-full bg-neutral-400`}></div>}
    </>
  )
}

export default Avatar