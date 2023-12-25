/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {useNavigate} from 'react-router-dom'

function MovieCard({ title , posterPath }) {
  const navigate = useNavigate();

  function handleNavigate(){
    navigate('/movies/id');
  }

  return (
    <div className="flex">
      <div className="card sm:max-w-[180px] p-1">
        <div className="relative sm:max-w-[180px] sm:max-h-[260px] overflow-hidden  shadow-lg group cursor-pointer" onClick={handleNavigate}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
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
        <div className="mt-2">
          <h2 className="text-white whitespace-nowrap text-ellipsis overflow-hidden">{title}</h2>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
