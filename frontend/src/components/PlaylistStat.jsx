import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

function PlaylistStat({color, param, name }) {
    const [overflow, setOverflow] = useState(false);
    const containerRef = useRef(null)

    React.useLayoutEffect(() => {
        const { current } = containerRef;

        const trigger = () => {
          const hasOverflow = current.scrollWidth > current.clientWidth;
    
          setOverflow(hasOverflow);
        };
    
        if (current) {
          trigger();
        }
      }, [containerRef]);
      
  return (
    <div className='flex flex-row justify-between'>
    <div ref={containerRef} style={{width: `${param}%`}} className={`${overflow ? "" : "flex  justify-center items-center"} rounded-full h-6 ${color} min-w-6 px-2`}>
        {!overflow && <p className={`text-neutral-900 text-sm`}>{name}</p>}
    </div>
    {overflow && <p className="text-sm">{name}</p>}
    </div>
  )
}

export default PlaylistStat