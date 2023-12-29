/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import { MdClose } from "react-icons/md";

function ReviewModal({closeReviewModal , comment , name , nameFirstLetter}) {
  
  return (
    <div className="fixed inset-0 p-5 lg:p-0 bg-black bg-opacity-30 backdrop-blur-sm mx-auto z-20 flex justify-center items-center">
      <div className="lg:w-1/2 max-h-80 bg-zinc-900 rounded-md flex gap-5 p-5 ">
        <div className=" flex flex-col justify-center items-center">
          <div className="flex rounded-full h-16 w-16 bg-orange-700 text-center ">
            {" "}
            <h2 className="place-self-center mx-auto text-3xl font-medium">
              {nameFirstLetter}
            </h2>
          </div>
        </div>
        <div className="flex flex-col w-full  gap-3">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row justify-start gap-3">
              <h1>{name}</h1>
              <h2>ratinfg</h2>
            </div>
            <MdClose onClick={closeReviewModal} size={18} className="opacity-50 hover:opacity-100 cursor-pointer" />
          </div>
          <div className="h-full  overflow-auto scrollbar-track-slate-700 scrollbar-thin">
            <p className="pr-3">{comment}</p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
