/* eslint-disable no-unused-vars */
import React from 'react';
import { useEffect , useState } from 'react';
import movies from '../api/movies.js';

function useFetch(url) {

    const [data , setData] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState(null);

    useEffect(() => {
        async function fetchData(){

            try {
                setIsLoading(true);
                const response = await movies.get(url);
                // console.log('mov');
                // console.log(response.data);
                setData(response.data.movie);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setError(error)
            }
            setIsLoading(false);
        }

        fetchData();
    } , [url]);


    return {
        data,
        isLoading,
        error
    };
    
}

export default useFetch;