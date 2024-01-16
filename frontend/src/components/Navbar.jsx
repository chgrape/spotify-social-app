import "../index.css"

function Navbar() {

  return (
    <nav className='flex flex-row justify-between px-32 py-10'>
        <h1 className='md:text-3xl lg:text-3xl xl:text-3xl'>Socialify</h1>
        <div className='flex flex-row items-center'>
            <div className='mx-5'>img1</div>
            <div className='mx-5'>img2</div>
        </div>
    </nav>
  )
}
export default Navbar