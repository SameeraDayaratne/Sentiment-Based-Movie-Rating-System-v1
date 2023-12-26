/* eslint-disable no-unused-vars */
import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import tmdb from "../api/tmdb";

function Home(props) {
  return (
    <div>
      <div className="font-poppins">
        
        <Hero />
        <Main />
      </div>
    </div>
  );
}

export default Home;

export async function loader() {

  try {
    const response = await tmdb.get('/genre/movie/list?language=en');
    return response.data.genres;
  } catch (error) {
    console.log(error);
  }
  

}
