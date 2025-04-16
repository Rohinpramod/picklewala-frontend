import React from 'react'
import hero from '../../../public/hero.jpg'

const Home = () => {
  return (
    <div className=''>
      <div className='w-screen'>
        <img className='w-full' src={hero}></img>
      </div>
      <div className='m-5'>
      <div>
        <h1 className='text-2xl font-light uppercase tracking-widest text-gray-900'>Best Sellers</h1>
      </div>
      <div className='flex gap-2 mt-2 '>
        <div onClick={''} className='bg-green-800 p-2 rounded-lg cursor-pointer text-white'><p>Veg</p></div>
        <div onClick={''} className='bg-red-700 p-2 rounded-lg cursor-pointer text-white'><p>Non-Veg</p></div>
      </div>
    </div>
    </div>
      
  )
}

export default Home