import React from "react";
import SendMessage from "./SendMessage";
import ListMessage from "./ListMessage";

const ChatMessage = () => {
  return (
    <div className="ChatMessage-Container flex flex-col h-full w-full">
      <div className="flex items-center justify-between px-4 py-2 bg-white w-full border-t-2">
        <div className="flex gap-3 items-center">
          <div className="avatar online">
            <div className="w-12 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="text-base font-bold">Phan Tiến Huy</div>
        </div>
        <div className="flex-none cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </div>
      </div>
      <ListMessage />
      <SendMessage />
    </div>
  );
};

export default ChatMessage;
