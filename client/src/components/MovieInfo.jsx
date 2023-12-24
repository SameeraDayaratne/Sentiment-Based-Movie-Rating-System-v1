/* eslint-disable no-unused-vars */
import React from "react";
import MoviePoster from "./MoviePoster";

import s from "../assets/2.jpg";

function MovieInfo(props) {
  return (
    <div className="text-white relative ">
      <MoviePoster />

      <div className="absolute top-0  pt-24 w-[80%] left-0 right-0 mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full gap-3 pt-5">
          <div className="md:col-span-1 lg:col-span-1 sm:max-w-[300px] place-self-center sm:place-self-start md:place-self-start sm:h-[450px] overflow-hidden  shadow-lg group ">
            <img
              src={s}
              alt=""
              className="block  object-cover"
            />
          </div>
          <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-2 ">
            <h3 className="font-bold text-3xl">Trolls Band Together (2023)</h3>
            <h3 className="text-lg italic">There are some new trolls on the block.</h3>
            <div className="flex gap-3">
                <div className=" py-0.5 px-2 rounded-lg text-white text-[12px] bg-[#ff5100]">
                    <h3 >hello</h3>
                </div>
                <div className=" py-0.5 px-2 rounded-lg text-white text-[12px] bg-[#ff5100]">
                    <h3 >hello</h3>
                </div>
                <div className=" py-0.5 px-2 rounded-lg text-white text-[12px] bg-[#ff5100]">
                    <h3 >hello</h3>
                </div>
                <div className=" py-0.5 px-2 rounded-lg text-white text-[12px] bg-[#ff5100]">
                    <h3 >hello</h3>
                </div>
              
            </div>
            <div className="flex gap-3">
              <h3>hello</h3>
              <h3>hello</h3>
            </div>
            <h3 className="font-semibold text-2xl">Overview</h3>
            <h3>
              When Branchs brother, Floyd, is kidnapped for his musical talents
              by a pair of nefarious pop-star villains, Branch and Poppy embark
              on a harrowing and emotional journey to reunite the other brothers
              and rescue Floyd from a fate even worse than pop-culture
              obscurity.
            </h3>
            <div className="flex gap-3 mt-6 mb-2">
              <h3>Status: Released</h3>
              <h3>Release Date: Oct 12, 2023</h3>
              <h3>Runtime: 1h 32m</h3>
            </div>
            <hr className="h-px  bg-gray-200 border-0 dark:bg-[#ff5100]/30"></hr>
            <h3 className="my-2">Director: Walt Dohrn </h3>
            <hr className="h-px  bg-gray-200 border-0 dark:bg-[#ff5100]/30"></hr>
            <h3 className="my-2">Writer: Elizabeth Tippet</h3>
            <hr className="h-px  bg-gray-200 border-0 dark:bg-[#ff5100]/30"></hr>
          </div>

          
        </div>

       
      </div>
      <h2> Helllo</h2>
    </div>
  );
}

export default MovieInfo;
