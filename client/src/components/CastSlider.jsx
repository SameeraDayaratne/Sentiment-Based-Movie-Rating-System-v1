import React from "react";
import cast from "../assets/cast.jpg";
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
      <div className=" mt-5 flex items-center">
        <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideLeft} size={40} />
        <div id="slider" className="overflow-x-scroll whitespace-nowrap w-full h-full scroll-smooth scrollbar-hide">
        {cast
          .map((castItem) => {
            if(castItem.profile_path)
            {
                return (
                    <img
                      className="w-[130px] inline-block p-2 cursor-pointer"
                      key={castItem.cast_id}
                      src={`https://image.tmdb.org/t/p/w500/${castItem.profile_path}`}
                      alt=""
                    />
                  );
            }
            
          })}
      </div>
      <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100"  onClick={slideRight} size={40} />
    </div>
  );
}

export default CastSlider;
