/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useCallback } from "react";
import MovieCard from "./MovieCard";
import 'react-loading-skeleton/dist/skeleton.css'
import MovieCardSkeleton from "./MovieCardSkeleton";
import tmdb from "../api/tmdb";
import { useLoaderData } from "react-router-dom";
import { useDispatch} from "react-redux";
import {setGenres} from '../redux/genre/genreSlice.js'



function Main(props) {

    const [movies , setMovies] = useState([])
    const [isLoading , setIsLoading] = useState(true)
    const [error , setError] = useState(null)
    const [hasMore , setHasMore] = useState(false)
    const [pageNumber ,setPageNumber] = useState(1);

    const dispatch = useDispatch();

    const genres = useLoaderData();
    console.log(genres);
    if(genres)
    {
        dispatch(setGenres(genres));
    }
    

    const observer = useRef();
    const lastMovieRef = useCallback(node => {
        if(isLoading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore)
            {
                setPageNumber(prev => prev + 1);
            }
        });

        if(node) observer.current.observe(node);
    },[isLoading , hasMore]);

    useEffect(() => {
        async function fetchMostPopularMovies(){
            try {
                setIsLoading(true);
                setError(false);
                const response = await tmdb.get(`/movie/popular?language=en-US&page=${pageNumber}`);
                const movies = response.data.results
                // console.log(movies);
                
                setMovies(prevMovies => [...prevMovies , ...movies]);

                setHasMore(movies.length > 0);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setError(true);
            }
        }

        fetchMostPopularMovies();


    } , [pageNumber])

  return (
    <div className="mt-14 max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto">
        <div>
            <h2  className="text-white font-bold text-xl">Most Popular</h2>
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-[#ff5100]"></hr>
        </div>
      
        {/* {isLoading && <div className="grid sm:grid-cols-4  md:grid-cols-5 gap-8 items-center place-items-center justify-center my-8">
            <MovieCardSkeleton cards={20}/>
        </div> }
        {(!isLoading && movies) && <div className="grid  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-y-8 sm:gap-2 gap-8    my-8">
           
            {movies.map((movie,index) => {
                if(movies.length === index + 1)
                {
                    return <MovieCard ref={lastMovieRef}  key={movie.id} title={movie.title} posterPath={movie.poster_path} />
                }
                else{
                    return <MovieCard key={movie.id} title={movie.title} posterPath={movie.poster_path} />
                }
                
            })}
            
        </div>} */}

        <div className="grid  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-y-8 sm:gap-2 gap-8    my-8">
            
          {movies.map((movie,index) => {
                if(movies.length === index + 1)
                {
                    return <MovieCard ref={lastMovieRef}  key={movie.id} movieId={movie.id} title={movie.title} genreIds={movie.genre_ids} posterPath={movie.poster_path} />
                }
                else{
                    return <MovieCard key={movie.id} title={movie.title} movieId={movie.id} genreIds={movie.genre_ids}  posterPath={movie.poster_path} />
                }
                
            })}  

            {isLoading && <MovieCardSkeleton cards={5} />}
         
            
           

        </div>
      
    </div>
  );
}

export default Main;
