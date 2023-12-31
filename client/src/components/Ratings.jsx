/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { IoIosStar ,IoIosStarHalf ,IoIosStarOutline  } from "react-icons/io";


function Ratings({rating}) {

    const starsArr = [];

    const fullStars = Math.floor(rating);
    

    for(let i = 0 ; i < fullStars ; i++)
    {
        starsArr.push(1);
    }

    if(rating < 5)
    {
        const halfStars = rating - fullStars;

        for(let j = 0 ; j< halfStars ; j++)
        {
            starsArr.push(halfStars);
        }

        const emptyStars = 5 - rating - halfStars;

        for(let k = 0 ; k< emptyStars ; k++)
        {
            starsArr.push(0);
        }
    }

    return (
        <div className='flex items-center'>

        {starsArr.map((star, index) => {
           if(star == 1)
           {
                return  <IoIosStar key={index} color='gold'/>
           }
           else if(star == 0.5) 
           {
                return  <IoIosStarHalf key={index} color='gold'/>
           }
           else if(star == 0)
           {
            return  <IoIosStarOutline key={index} color='gold'/>
           }
        })}
                            
        </div>
    );
}

export default Ratings;