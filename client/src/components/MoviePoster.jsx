/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";


function MoviePoster({backdrop_path}) {
  return (
    <>
      <div className="w-full h-screen bg-white z-50">
        <img className="w-full h-screen object-cover  " src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} alt="" />
        <div className="absolute h-screen w-full top-0 left-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="bg-black/90 w-full h-screen absolute top-0 left-0" />
      </div>
    </>
  );
}

export default MoviePoster;
