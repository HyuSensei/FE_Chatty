import React from "react";

const ListMessage = () => {
  return (
    <div className="px-4 overflow-y-scroll flex-1">
      <div className="chat chat-start mt-4">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <time className="text-xs text-slate-600 font-bold my-1">12:45 PM</time>
        <div className="chat-bubble bg-white text-slate-700 font-medium break-words">
          It was said that you would, destroy the Sith, not join them.
        </div>
      </div>
      {[...Array(20)].map((_, index) => (
        <div key={index} className="chat chat-end mt-4">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-bubble bg-lime-100 text-slate-700 font-medium break-words">
            Oki!
          </div>
          <time className="text-xs text-slate-600 font-bold my-1">
            12:47 PM
          </time>
        </div>
      ))}
    </div>
  );
};

export default ListMessage;
