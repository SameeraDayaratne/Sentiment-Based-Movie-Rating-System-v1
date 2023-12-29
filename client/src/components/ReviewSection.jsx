import React from "react";
import Review from "./Review";

function ReviewSection(props) {
  return (
    <>
      <h2 className="px-2 font-bold mb-5 text-xl text-center text-white">Reviews</h2>
      <div className=" mb-10 grid md:grid-cols-2 gap-2">
        <Review />
        <Review />
        <Review />
        <Review />
        
      </div>
    </>
  );
}

export default ReviewSection;
