import React, { useEffect, useRef } from 'react'

function PlaylistStat({color, param, setIsOpen}) {

  return (
    <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} className={`rounded-full w-4 h-4 ${color} overflow-hidden hover:w-16 transition-all duration-500 ease-in-out flex items-center justify-center`}>
        <p className='font-regular text-neutral-900 delay-300 opacity-0 text-sm group-hover:opacity-100 duration-500 ease-in cursor-default'>{param}</p>
    </div>
  )
}

export default PlaylistStat