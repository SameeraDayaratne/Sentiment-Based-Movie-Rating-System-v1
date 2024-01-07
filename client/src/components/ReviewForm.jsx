import React from "react";
import {Form} from 'react-router-dom'
import movies from "../api/movies";

function ReviewForm({movieId}) {

  return (
    <div className="w-full p-5 bg-zinc-900  rounded-md">
      <div className="">
        <h2 className="font-bold  text-xl text-center text-white">
          Add a Review
        </h2>
    <Form method="post" action={`/movies/${movieId}`}>
    <div className="p-2 w-full">
          <div>
            <textarea
              name="review"
              className="w-full bg-zinc-900 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-white py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
        </div>
        <div className="p-2 w-full flex flex-col items-center">
          <button className="text-white  bg-themeOrange w-full lg:w-auto border-0 py-2 px-8 focus:outline-none hover:bg-themeOrange/80 rounded text-lg">
            Add Review
          </button>
          
        </div>
    </Form>
        
      </div>
    </div>
  );
}

export default ReviewForm;

