/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Review from "./Review";
import { useState , useEffect } from "react";
import {MdChevronLeft , MdChevronRight} from 'react-icons/md'
import movies from "../api/movies";
import { useActionData } from 'react-router-dom'

function ReviewSection({movieId}) {

  const [currentPage , setCurrentPage] = useState(1);
  const [reviewsPerPage , setReviewsPerPage] = useState(4);
  const [totalPages , setTotalPages] = useState();
  const [totalReviews , setTotalReviews] = useState(0);
  const [reviewsArray , setReviewsArray] = useState([]);
  const [queryPage , setQueryPage] = useState(1);

  const data = useActionData();

  console.log('rendered');

  useEffect(()=> {
    if(data && (data.success && data.message === 'Review Created'))
    {

      console.log('darta are', data);
      const newReview = {
        id: data.review._id,
        author : "sample USer",
        author_details : {rating : data.review.rating},
        content : data.review.review
      }

      setReviewsArray(prevArr => {
        return [newReview , ...prevArr];
      });

      setTotalReviews(prev => prev + 1);
      // setCurrentPage(1);
      // setQueryPage(1);
      // setReviewsArray([]);
      // setTotalReviews(0);
      // setTotalPages(0)
      // fetchReviews(movieId,1);
    }
  },[data,movieId]);

 
 
  async function fetchReviews(movieId,queryPage){
    try {
      const response =await movies.get(`/getReviews/${movieId}?page=${queryPage}`);
      console.log('ressss' , response.data);
      setReviewsArray(prevReviewsArr => [...prevReviewsArr , ...response.data.reviews.results]);
      setTotalReviews(response.data.reviews.total_results)
      setTotalPages(response.data.reviews.total_pages)
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log('fetch called');
    fetchReviews(movieId,queryPage);
  } ,[movieId,queryPage]);

  if(reviewsArray.length > 0)
  {
    console.log('rev legrth' ,reviewsArray);
  }


  let pages = [];

  for(let i = 1 ; i <=  Math.ceil(totalReviews/reviewsPerPage) ; i++)
  {
    pages.push(i);
  }

  let lastItemIndex = currentPage*reviewsPerPage;
  let firstItem = lastItemIndex - reviewsPerPage;

  function handlePageNumberClick(number){
    let currentMaxPage = Math.ceil(reviewsArray.length/reviewsPerPage);
    if(number >= currentMaxPage)
    {
      console.log('page change');
      setQueryPage(prev => prev + 1)
    }
    setCurrentPage(number);
  }

  function increasePageNumber(){
    let currentMaxPage = Math.ceil(reviewsArray.length/reviewsPerPage);

    if(currentPage < pages.length)
    {
      
      if(currentPage + 1 >= currentMaxPage)
      {
        setQueryPage(prev => prev + 1)
      }

      setCurrentPage(prev => prev += 1);
    }
    
  }

  function decreasePageNumber(){
    if(currentPage > 1)
    {
      setCurrentPage(prev => prev -= 1);
    }
    
  }


  return (
    <>
      <h2 className="px-2 font-bold mb-5 text-xl text-center text-white">Reviews</h2>
      <div className=" mb-10 grid lg:grid-cols-2  gap-2">

        {reviewsArray.length > 0 && reviewsArray.slice(firstItem,lastItemIndex).map(review => {
          return <Review key={review.id} name={review.author} comment={review.content} rating={review.author_details.rating} />
        })}
        
      </div>
      <div className="flex justify-center mb-10">
          <ul className="flex items-center  -space-x-px h-8">
            <li onClick={decreasePageNumber} className="flex items-center border-themeOrange border cursor-pointer px-1 h-8 rounded-l-md "><MdChevronLeft size={20} /></li>
            {pages.map(page => {
              return <li onClick={() => {handlePageNumberClick(page)}} className={`px-3 h-8 flex items-center  border-themeOrange border cursor-pointer ${currentPage == page ? 'bg-themeOrange' : null}`}  key={page}>{page}</li>
            })}
            <li onClick={increasePageNumber} className="flex items-center border-themeOrange border cursor-pointer px-1 h-8 rounded-r-md "><MdChevronRight size={20} /></li>
          </ul>
      </div>
    </>
  );
}

export default ReviewSection;

export async function action({request, params}){

  console.log('hehehehhee');

  const formData = await request.formData();
  const review = formData.get("review");
  const body = {
    movieId: params.movieId,
    review
  }

  try {
    const response = await movies.post('/createReview',body);
    // console.log(response.data);
    return response.data;

  } catch (error) {
    console.log(error);
    return null;
  }

 
}