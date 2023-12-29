import React from 'react';
import { GiExpand } from "react-icons/gi";
import { useState } from 'react';

function Review(props) {

    const [showExpandIcon , setShowExpandIcon] = useState(false)

    return (
        <div className='w-full h-40 bg-zinc-900 rounded-md flex gap-5 p-5 '>
            <div className=' flex flex-col justify-center items-center'>
                <div className='flex rounded-full h-16 w-16 bg-orange-700 text-center '> <h2 className='place-self-center mx-auto text-3xl font-medium'>M</h2></div>
            </div>
            <div className='flex flex-col w-full  gap-3'>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row justify-start gap-3'>
                        <h1>Sameera Daya</h1>
                        <h2>ratings</h2>
                    </div>
                    {showExpandIcon &&  <div>
                        <GiExpand  className='opacity-50 hover:opacity-100 hover:scale-110 ease-in-out duration-300 overflow-visible' />
                    </div> }
                           
                </div>
                <div>
                    <p className='line-clamp-3'>Lorem, ipsum sdfsdf sdfs df sdf sdf sdf ssssssssssssssssssssssssdfs dfs dfsd fsdf sdf sdf sdf sdf dolor sit amet consectetur adipisicing elit. Iste, dolor culpa corporis aliquam repudiandae illum voluptates laboriosam et officia quae!</p>
                </div>
            </div>
        </div>
    );
}

export default Review;