import React from 'react';

function MovieCardNew({ title , posterPath }) {
    return (
        
            <div className='flex'>
            <div className="card  p-1 sm:w-48 ">
                <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt="" className='w-full h-auto' />
                
                <h2 className='text-white whitespace-nowrap text-ellipsis overflow-hidden'>{title}</h2>
                
            </div>
            </div>
            
       
    );
}

export default MovieCardNew;