import React from 'react'
import MovieCard from '../component/MovieCard'
import { useAppContext } from '../context/AppContext'

function Movies() {
  const {shows} = useAppContext();

  return (
    <div>
      <div className='flex justify-center items-center p-4'>
        <input type="search" name="search" id="search" placeholder="Search for movies..." className='border border-gray-300 w-150 rounded-md p-2' />
      </div>

      <div className='flex flex-wrap justify-center items-center gap-4 p-4'>
        {shows.map((show, index) => (
          <MovieCard key={index} show={show} />
        ))}
      </div>
    </div>
  )
}

export default Movies
