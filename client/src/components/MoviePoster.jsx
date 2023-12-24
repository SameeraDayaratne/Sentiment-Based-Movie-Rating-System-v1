/* eslint-disable no-unused-vars */
import React from "react";
import back from "../assets/back.jpg";

function MoviePoster(props) {
  return (
    <>
      <div className="w-full h-screen bg-white z-50">
        <img className="w-full h-screen object-cover  " src={back} alt="" />
        <div className="absolute h-screen w-full top-0 left-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="bg-black/90 w-full h-screen absolute top-0 left-0" />
      </div>
    </>
  );
}

export default MoviePoster;
