import React from "react";
import Review from "./Review";
import { MdClose } from "react-icons/md";

function ReviewModal({closeReviewModal}) {
  return (
    <div className="fixed inset-0 p-5 lg:p-0 bg-black bg-opacity-30 backdrop-blur-sm mx-auto z-20 flex justify-center items-center">
      <div className="lg:w-1/2 max-h-80 bg-zinc-900 rounded-md flex gap-5 p-5 ">
        <div className=" flex flex-col justify-center items-center">
          <div className="flex rounded-full h-16 w-16 bg-orange-700 text-center ">
            {" "}
            <h2 className="place-self-center mx-auto text-3xl font-medium">
              M
            </h2>
          </div>
        </div>
        <div className="flex flex-col w-full  gap-3">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row justify-start gap-3">
              <h1>Sameera Daya</h1>
              <h2>ratinfg</h2>
            </div>
            <MdClose onClick={closeReviewModal} size={18} className="opacity-50 hover:opacity-100 cursor-pointer" />
          </div>
          <div className="h-full  overflow-auto scrollbar-track-slate-700 scrollbar-thin">
            <p className="pr-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi assumenda unde dignissimos nemo! Sunt provident assumenda praesentium facilis unde mollitia itaque dolorum odio repellat modi ullam veniam nemo, placeat voluptatibus voluptatum dicta, molestiae debitis! Ratione, ut. Maiores porro, reiciendis sunt unde sequi dicta quia ullam hic maxime iusto laboriosam fuga. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore necessitatibus possimus alias nihil, dolores doloremque earum nemo eligendi cum harum molestiae? Ipsum nemo voluptas exercitationem fuga, a veniam iure fugit similique, voluptates facilis necessitatibus deleniti consectetur temporibus ipsa quia quas eligendi, nulla sed nostrum corrupti alias optio tempore praesentium? Maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, illo? Neque eos amet provident inventore consectetur quos itaque officia sunt! Dolorum temporibus fuga ab voluptatem qui odit vel. Doloribus excepturi dolorem esse atque commodi voluptate aliquam praesentium omnis debitis harum rem quae officia soluta tempora, facere libero sed earum ut.</p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
