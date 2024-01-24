import React from 'react'

function Stat({statName, amount}) {
  return (
    <div className='flex flex-col justify-center mx-2'>
        <h2 className='font-light uppercase text-sm tracking-wider'>{statName}</h2>
        <h1 className='font-bold text-center text-3xl'>{amount}</h1>
    </div>
  )
}

export default Stat