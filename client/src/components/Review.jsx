/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { GiExpand } from "react-icons/gi";
import { useState , useEffect , useRef } from 'react';
import ReviewModal from './ReviewModal';

function Review({name,comment}) {

    const [showExpandIcon , setShowExpandIcon] = useState(false);
    const [showReviewModal , setShowReviewModal] = useState(false);
    const paragraph = useRef();
    let nameFirstLetter = name.slice(0,1);

    useEffect(() => {
        
        if(paragraph.current.scrollHeight > paragraph.current.clientHeight) setShowExpandIcon(true)
        else setShowExpandIcon(false)
                   
    } , []);
   

    function closeReviewModal(){
        setShowReviewModal(false);
    }

    function openReviewModal(){
        setShowReviewModal(true);
    }

    return (
        <>
        <div className='w-full h-40 bg-zinc-900 rounded-md flex gap-5 p-5 hover:-translate-y-1 ease-in-out duration-300'>
            <div className=' flex flex-col justify-center items-center'>
                <div className='flex rounded-full h-16 w-16 bg-orange-700 text-center '> <h2 className='place-self-center mx-auto text-3xl font-medium'>{nameFirstLetter}</h2></div>
            </div>
            <div className='flex flex-col w-full  gap-3'>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row justify-start gap-3'>
                        <h1>{name}</h1>
                        <h2>ratinfg</h2>
                    </div>
                    {showExpandIcon &&  <div>
                        <GiExpand onClick={openReviewModal}  className='opacity-50 hover:opacity-100 hover:scale-110 ease-in-out duration-300 overflow-visible cursor-pointer' />
                    </div> }
                           
                </div>
                
                <div>
                <p ref={paragraph} className='line-clamp-3'>{comment}</p>
        </div>
            </div>
        </div>
        {showReviewModal && <ReviewModal nameFirstLetter={nameFirstLetter} name={name} comment={comment} closeReviewModal={closeReviewModal}></ReviewModal>}
        </>
        
    );
}

export default Review;