/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {useNavigate} from 'react-router-dom'

function MovieCard({ imgSrc, ...props }) {
  const navigate = useNavigate();

  function handleNavigate(){
    navigate('/movies/id');
  }

  return (
    <div>
      <div
        {...props}
        className="relative sm:max-w-[180px] sm:max-h-[260px] overflow-hidden  shadow-lg group cursor-pointer"
        onClick={handleNavigate}
      >
        <img
          src={imgSrc}
          alt=""
          className="transition-transform group-hover:scale-110 duration-200"
        />
        <div className="absolute inset-0 flex items-end text-xs gap-2 bg-gradient-to-t pb-2 pl-2 from-black/60 to-transparent">
          <div className="py-2/3 px-2 rounded-lg text-white text-[10px] bg-[#ff5100]">
            Action
          </div>
          <div className="py-2/3 px-2 rounded-lg text-white text-[10px] bg-[#ff5100]">
            Sci Fi
          </div>
        </div>
      </div>
      <div className=" mt-2">
        <h2 className="text-white">Venom</h2>
      </div>
    </div>
  );
}

export default MovieCard;
