import React from 'react';
import { GiExpand } from "react-icons/gi";
import { useState , useEffect } from 'react';
import ReviewComment from './ReviewComment';
import ReviewModal from './ReviewModal';

function Review(props) {

    const [showExpandIcon , setShowExpandIcon] = useState(false);
    const [showReviewModal , setShowReviewModal] = useState(false);

    let comment = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque odio laudantium repellat! Mollitia deserunt omnis porro voluptas sdas sda s asd as asd as asd '

    let text;
    if(comment.length < 145)
    {
        text = comment;
    }
    else{
        text = comment.slice(0,145);
    }

    useEffect(() => {
        
        if(comment.length > 145)
        {
            setShowExpandIcon(true)
        }
        else{
            setShowExpandIcon(false)
        }
    } , [comment.length]);
   

    function closeReviewModal(){
        setShowReviewModal(false);
    }

    function openReviewModal(){
        setShowReviewModal(true);
    }

    return (
        <>
        <div className='w-full h-40 bg-zinc-900 rounded-md flex gap-5 p-5 '>
            <div className=' flex flex-col justify-center items-center'>
                <div className='flex rounded-full h-16 w-16 bg-orange-700 text-center '> <h2 className='place-self-center mx-auto text-3xl font-medium'>M</h2></div>
            </div>
            <div className='flex flex-col w-full  gap-3'>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row justify-start gap-3'>
                        <h1>Sameera Daya</h1>
                        <h2>ratinfg</h2>
                    </div>
                    {showExpandIcon &&  <div>
                        <GiExpand onClick={openReviewModal}  className='opacity-50 hover:opacity-100 hover:scale-110 ease-in-out duration-300 overflow-visible cursor-pointer' />
                    </div> }
                           
                </div>
                <ReviewComment >{text}{comment.length > 145 && '...'}</ReviewComment>
               
            </div>
        </div>
        {showReviewModal && <ReviewModal closeReviewModal={closeReviewModal}></ReviewModal>}
        </>
        
    );
}

export default Review;