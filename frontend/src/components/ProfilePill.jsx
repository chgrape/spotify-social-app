import arrow from "../assets/chevron-down.svg"


function ProfilePill() {
  return (
    <div className='bg-neutral-700 hover:bg-neutral-600 rounded-full flex justify-between items-center flex-row p-2 pr-4 duration-150 ease-in-out ml-5'>
        <img className='mr-2 h-8 min-w-8 rounded-full ' src={sessionStorage.getItem('avatar')} />
        <p className="max-sm:hidden font-medium text-sm ml-2 mr-4">{sessionStorage.getItem('username')}</p>
        <img className=" h-4 w-4" src={arrow}></img>
    </div>
  )
}

export default ProfilePill