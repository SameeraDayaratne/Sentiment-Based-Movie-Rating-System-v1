/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {MdChevronLeft , MdChevronRight} from 'react-icons/md'

function CastSlider({cast}) {

    function slideLeft(){
        var slider = document.getElementById('slider')

        slider.scrollLeft = slider.scrollLeft - 500;
    }

    
    function slideRight(){
        var slider = document.getElementById('slider')

        slider.scrollLeft = slider.scrollLeft + 500;
    }

  return (
    <>
    <h2 className="px-2 mt-10 font-bold text-xl text-center text-white">Cast</h2>
    <div className="mt-2 mb-10 flex items-center">
         
         <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideLeft} size={40} />
         <div id="slider" className="overflow-x-scroll whitespace-nowrap w-full h-full scroll-smooth scrollbar-hide">
            
         {cast
           .map((castItem) => {
             if(castItem.profile_path)
             {
                 return (
                     <div className="inline-block w-[130px]  overflow-hidden p-2" key={castItem.cast_id}> 
                      <img
                       className="w-[130px] inline-block rounded-md hover:scale-105 ease-in-out duration-300"
                       
                       src={`https://image.tmdb.org/t/p/w500/${castItem.profile_path}`}
                       alt=""
                     />
                     <div>
                         {/* <h2>{castItem.name}</h2> */}
                         <h2 className="whitespace-nowrap text-ellipsis overflow-hidden">{castItem.name}</h2>
                     </div>
                     </div>
                     
                   );
             }
             
           })}
       </div>
       <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100"  onClick={slideRight} size={40} />
     </div>
    </>
      
  );
}

export default CastSlider;
