/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useEffect } from 'react';
import { getAccessToken } from '../utils/auth';
import movies from '../api/movies.js';
import jwtInterceptor from '../api/jwtInterceptor.js';


function Movies(props) {

    const [data , setData] = useState('')

    useEffect(()=>{
        async function getMovies(){

            const accessToken = getAccessToken();
            

            try {
            const response = await jwtInterceptor.get("http://localhost:8000/movies" , {
                headers : {
                    Authorization : `Bearer ${accessToken}` 
                }
            });
            
            
            setData(response.data.message)
            console.log('in movies route');
            console.log(response);
            } catch (error) {
                //logout the user due to refresh token expiration
                console.log(error);
            }
            
        }

        getMovies();
    }, []);

    return (
        <div>
            <h2 className='text-white'>{data}</h2>
        </div>
    );
}

export default Movies;