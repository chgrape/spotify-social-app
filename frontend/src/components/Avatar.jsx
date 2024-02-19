import React from 'react'

function Avatar({av, height, width, sx}) {
  const missing = av == "null" || !av

  return (
    <>
    { !missing ? <img className={`mr-2 h-${height} min-w-${width} rounded-full ${sx}`} src={av} /> : <div className={`mr-2 h-${height} w-${width} rounded-full bg-neutral-400 ${sx}`}></div>}
    </>
  )
}

export default Avatar