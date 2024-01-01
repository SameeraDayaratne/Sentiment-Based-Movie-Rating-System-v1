/* eslint-disable no-unused-vars */
import React from "react";
import MoviePoster from "./MoviePoster";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import CastSlider from "./CastSlider";
import ReviewSection from "./ReviewSection";

function MovieInfo(props) {

  const params = useParams();

  const {isLoading , error , data : movie} = useFetch(`/getMovie/${params.movieId}`);

  console.log(movie);

  return (
    
    <div className="text-white relative ">
      {!isLoading && <><MoviePoster backdrop_path={movie.backdrop_path}/>

<div className="absolute top-0  pt-24 w-[80%] left-0 right-0 mx-auto">
  <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full gap-3 pt-5">
    <div className="md:col-span-1 lg:col-span-1 sm:max-w-[300px] place-self-center sm:place-self-start md:place-self-start sm:h-[450px] overflow-hidden  shadow-lg group ">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt=""
        className="block  object-cover"
      />
    </div>
    <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-2 ">
      <h3 className="font-bold text-3xl">{movie.title}</h3>
      <h3 className="text-lg italic">{movie.tagline}</h3>
      <div className="flex gap-3">
        {movie.genres.map(genre => {
          return (
            <div key={genre.id} className=" py-0.5 px-2 rounded-lg text-white text-[12px] bg-[#ff5100]">
              <h3 >{genre.name} </h3>
          </div>
          );
        })}
        
        
      </div>
      <div className="flex gap-3">
        <h3>hello</h3>
        <h3>hello</h3>
      </div>
      <h3 className="font-semibold text-2xl">Overview</h3>
      <h3>
        {movie.overview}
      </h3>
      <div className="flex gap-3 mt-6 mb-2">
        <h3>Status: {movie.status} </h3>
        <h3>Release Date: {movie.release_date}</h3>
        <h3>Runtime: {movie.runtime}m</h3>
      </div>
      <hr className="h-px  bg-gray-200 border-0 dark:bg-[#ff5100]/30"></hr>
      <h3 className="my-2">Director: Walt Dohrn </h3>
      <hr className="h-px  bg-gray-200 border-0 dark:bg-[#ff5100]/30"></hr>
      <h3 className="my-2">Writer: Elizabeth Tippet</h3>
      <hr className="h-px  bg-gray-200 border-0 dark:bg-[#ff5100]/30"></hr>
    </div>

    
  </div>

      
  <CastSlider cast={movie.credits.cast} />
  <ReviewSection />
  
 
</div>
 </> }
      
    </div>
  );
}

export default MovieInfo;
