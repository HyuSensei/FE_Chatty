import React from "react";
import SendMessage from "./SendMessage";
import ListMessage from "./ListMessage";
import { isEmpty } from "../../helpers/isEmpty";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import useScreen from "../hook/useScreen";

const ChatMessage = () => {
  const {
    selected = {},
    loadingMessage,
    setSelected,
    setIsFetch,
  } = useContext(ChatContext);
  const { onlineUsers, isNightMode } = useSelector(
    (state) => state.user
  );
  const { isMobile } = useScreen();

  console.log(selected);

  if (isEmpty(selected)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-teal-100 px-4 py-1 rounded-xl text-slate-500 font-bold">
          Select a chat to start messaging
        </div>
      </div>
    );
  }

  if (loadingMessage) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-accent loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="ChatMessage-Container flex flex-col h-full w-full">
      <div
        className={`flex items-center justify-between px-4 py-3 w-full border-t-2 ${
          isNightMode
            ? "bg-gradient-to-r from-slate-600 to-slate-900 text-slate-50"
            : "bg-white"
        }`}
      >
        <div className="flex gap-3 items-center">
          {isMobile && (
            <div
              onClick={() => {
                setIsFetch(false);
                setSelected({});
              }}
              className="btn btn-ghost btn-circle"
            >
              <svg
                height="25px"
                width="25px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                fill="#00246a"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill={"#FFFFFF"}
                    d="M256,504C119.248,504,8,392.752,8,256S119.248,8,256,8s248,111.248,248,248S392.752,504,256,504z"
                  ></path>
                  <path
                    fill={"#313438"}
                    d="M256,16c132.336,0,240,107.664,240,240S388.336,496,256,496S16,388.336,16,256S123.664,16,256,16 M256,0C114.608,0,0,114.608,0,256c0,141.376,114.608,256,256,256s256-114.624,256-256C512,114.608,397.392,0,256,0L256,0z"
                  ></path>
                  <polygon
                    fill={"#313438"}
                    points="306.8,360.048 233.776,288.8 410.016,288.8 410.016,222.352 233.776,222.352 306.8,151.12 260.288,103.696 104.576,255.584 260.288,407.472 "
                  ></polygon>
                </g>
              </svg>
            </div>
          )}
          <div
            className={`avatar ${
              onlineUsers.includes(selected?._id) ? "online" : ""
            }`}
          >
            <div className="w-12 rounded-full">
              <img src={selected?.profileImage} alt="avatar-user" />
            </div>
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <div className="text-base font-bold">{selected?.name}</div>
              {selected?.gender === "male" ? (
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15 3C15 2.44772 15.4477 2 16 2H20C21.1046 2 22 2.89543 22 4V8C22 8.55229 21.5523 9 21 9C20.4477 9 20 8.55228 20 8V5.41288L15.4671 9.94579C15.4171 9.99582 15.363 10.0394 15.3061 10.0767C16.3674 11.4342 17 13.1432 17 15C17 19.4183 13.4183 23 9 23C4.58172 23 1 19.4183 1 15C1 10.5817 4.58172 7 9 7C10.8559 7 12.5642 7.63197 13.9214 8.69246C13.9587 8.63539 14.0024 8.58128 14.0525 8.53118L18.5836 4H16C15.4477 4 15 3.55228 15 3ZM9 20.9963C5.68831 20.9963 3.00365 18.3117 3.00365 15C3.00365 11.6883 5.68831 9.00365 9 9.00365C12.3117 9.00365 14.9963 11.6883 14.9963 15C14.9963 18.3117 12.3117 20.9963 9 20.9963Z"
                      fill="#01bacf"
                    ></path>
                  </g>
                </svg>
              ) : (
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20 9C20 13.0803 16.9453 16.4471 12.9981 16.9383C12.9994 16.9587 13 16.9793 13 17V19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H10C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19H11V17C11 16.9793 11.0006 16.9587 11.0019 16.9383C7.05466 16.4471 4 13.0803 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9ZM6.00365 9C6.00365 12.3117 8.68831 14.9963 12 14.9963C15.3117 14.9963 17.9963 12.3117 17.9963 9C17.9963 5.68831 15.3117 3.00365 12 3.00365C8.68831 3.00365 6.00365 5.68831 6.00365 9Z"
                      fill="#fc9cc7"
                    ></path>
                  </g>
                </svg>
              )}
            </div>
            {onlineUsers.includes(selected?._id) ? (
              <div className="text-green-600">Online</div>
            ) : (
              <div className="text-gray-400">Offline</div>
            )}
          </div>
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
