/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Review from "./Review";
import { useState , useEffect } from "react";
import {MdChevronLeft , MdChevronRight} from 'react-icons/md'
import movies from "../api/movies";

function ReviewSection({movieId}) {

  const [currentPage , setCurrentPage] = useState(1);
  const [reviewsPerPage , setReviewsPerPage] = useState(4);
  const [totalPages , setTotalPages] = useState();
  const [totalReviews , setTotalReviews] = useState(0);
  const [reviewsArray , setReviewsArray] = useState([]);
  const [queryPage , setQueryPage] = useState(1);

  useEffect(() => {
    async function fetchReviews(){
      try {
        const response =await movies.get(`/getReviews/${movieId}?page=${queryPage}`);
        setReviewsArray(prevReviewsArr => [...prevReviewsArr , ...response.data.reviews.results]);
        setTotalReviews(response.data.reviews.total_results)
        setTotalPages(response.data.reviews.total_pages)
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchReviews();
  } ,[movieId,queryPage]);

  if(reviewsArray.length > 0)
  {
    console.log(reviewsArray);
  }
  // const reviewsArray = [
  //   { id: 1, name: "John", review: "I purchased this product and it has exceeded my expectations! The build quality is superb, and the features are exactly what I was looking for. I highly recommend it to anyone in need of a reliable solution.", rating: 9.5 },
  //   { id: 2, name: "Alice", review: "My experience with this service has been nothing short of amazing! The customer support is top-notch, and the response time is incredibly quick. I'm extremely satisfied and will continue to use this service in the future.", rating: 6.8 },
  //   { id: 3, name: "Bob", review: "I've tried many products in the past, but this one stands out. The attention to detail is impressive, and it's clear that the developers put a lot of thought into the user experience. It's a game-changer for me.", rating: 4.3 },
  //   { id: 4, name: "Emma", review: "From the moment I made the purchase until the product arrived, I felt like a valued customer. The entire process was smooth, and the quality of the product exceeded my expectations. I'll definitely be a repeat customer.", rating: 8.6 },
  //   { id: 5, name: "David", review: "This product not only met but surpassed my requirements. The craftsmanship is evident, and the attention to detail is commendable. I've recommended it to all my friends and colleagues.", rating: 7.7 },
  //   { id: 6, name: "Sophie", review: "I've been using this service for a while now, and it has consistently delivered outstanding performance. The user interface is intuitive, and the additional features make it a must-have for anyone in the industry.", rating: 5.5 },
  //   { id: 7, name: "Michael", review: "The quality of the product speaks for itself. I am very satisfied with my purchase. The durability and reliability are impressive, and it has certainly made a positive impact on my daily life.", rating: 6.2 },
  //   { id: 8, name: "Olivia", review: "Not only did the product arrive quickly, but it also provided great value for money. The attention to customer satisfaction is evident, and I appreciate the effort put into ensuring a smooth and enjoyable experience.", rating: 9.7 },
  //   { id: 9, name: "Daniel", review: "I was initially hesitant, but after using the product, I am thoroughly impressed. The features are robust, and the performance is unmatched. The support team is also responsive and helpful.", rating: 9.8 },
  //   { id: 10, name: "Emily", review: "Dealing with customer support can often be a hassle, but not with this service. The customer support team was fantastic and resolved my issue promptly. It's clear that they prioritize customer satisfaction.", rating: 7.5 },
  //   { id: 11, name: "Matthew", review: "Reliability is crucial for me, and this product delivers. It has proven to be efficient and dependable in every situation. I'm confident in recommending it to others who prioritize performance.", rating: 4.6 },
  //   { id: 12, name: "Grace", review: "The user interface of this product is not only visually appealing but also incredibly user-friendly. It made my experience enjoyable, and I appreciate the effort put into creating a seamless and intuitive interface.", rating: 9.3 },
  //   { id: 13, name: "William", review: "I've made many purchases in the past, but this one stands out. The attention to detail, combined with the excellent customer service, has made me a loyal customer. I am thoroughly satisfied with my purchase.", rating: 5.8 },
  //   { id: 14, name: "Ella", review: "Transaction processes can often be tedious, but not with this service. The entire transaction was smooth, and I appreciated the transparency throughout. It's a testament to the professionalism of the team.", rating: 2.7 },
  //   { id: 15, name: "James", review: "I've spent a considerable amount of time researching and comparing products, and this one offers great value for money. The features provided at this price point are unmatched. I'm extremely happy with my decision to choose this product.", rating: 8.7 }
  // ];

  let pages = [];

  for(let i = 1 ; i <=  Math.ceil(totalReviews/reviewsPerPage) ; i++)
  {
    pages.push(i);
  }

  let lastItemIndex = currentPage*reviewsPerPage;
  let firstItem = lastItemIndex - reviewsPerPage;

  function handlePageNumberClick(number){
    let currentMaxPage = Math.ceil(reviewsArray.length/reviewsPerPage);
    if(number > currentMaxPage)
    {
      setQueryPage(prev => prev + 1)
    }
    setCurrentPage(number);
  }

  function increasePageNumber(){
    let currentMaxPage = Math.ceil(reviewsArray.length/reviewsPerPage);

    if(currentPage < pages.length)
    {
      
      if(currentPage + 1 > currentMaxPage)
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
