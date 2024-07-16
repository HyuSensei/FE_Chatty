import React, { useContext, useEffect, useRef } from "react";
import {
  formatDate,
  formatDateTime,
  isSameDay,
} from "../../helpers/formatDate";
import { useSelector } from "react-redux";
import { Image } from "antd";
import notificationSound from "../assets/notification.mp3";
import { ChatContext } from "../context/ChatContext";

const ListMessage = () => {
  const {
    selected = {},
    socket,
    messages: data,
    setDataMessage: setData,
    setRefeshMessage,
  } = useContext(ChatContext);
  const user = useSelector((state) => state.user);
  const currentMessage = useRef(null);

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [data?.messages]);

  useEffect(() => {
    socket?.on("send-message", (newMessage) => {
      const sound = new Audio(notificationSound);
      sound.play();
      setData((prev) => {
        const previousData = prev || {};
        const previousMessages = previousData.messages || [];
        return {
          ...previousData,
          messages: [...previousMessages, newMessage],
        };
      });
      if (selected?._id !== newMessage.receiver) {
        setRefeshMessage((prev) => !prev);
      }
      if (selected?._id === newMessage.sender) {
        socket?.emit("seen", newMessage._id);
      }
    });
    return () => socket?.off("send-message");
  }, [socket, data?.messages]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div className="bg-teal-100 px-4 py-1 rounded-xl text-sky-900 font-bold">
          Send a message to start the conversation
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 overflow-y-scroll flex-1 ">
      {data?.messages.map((message, index) => {
        const previousMessage = data?.messages[index - 1];
        const showDateDivider =
          !previousMessage ||
          !isSameDay(message.createdAt, previousMessage.createdAt);
        return (
          <React.Fragment key={"item-message" + index}>
            {showDateDivider && (
              <div
                className={`text-center text-s font-medium py-4 ${
                  user?.isNightMode ? "text-slate-50" : "text-sky-950"
                }`}
              >
                {formatDate(message.createdAt)}
              </div>
            )}
            {selected._id === message.sender ? (
              <div ref={currentMessage} className="chat chat-start py-4">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="avatar-chat-message"
                      src={selected.profileImage}
                    />
                  </div>
                </div>
                <time
                  className={`text-xs  my-1 ${
                    user?.isNightMode
                      ? "text-slate-50 font-medium"
                      : "text-sky-950 font-bold"
                  }`}
                >
                  {formatDateTime(message.createdAt)} PM
                </time>
                <div className="chat-bubble bg-white text-slate-700 font-medium break-words">
                  {message.imageUrl && (
                    <Image
                      className="rounded-md"
                      width={160}
                      src={message.imageUrl}
                    />
                  )}
                  <div
                    className={`${
                      message.message ? "py-2 break-words max-w-96" : ""
                    }`}
                  >
                    {message.message}
                  </div>
                </div>
              </div>
            ) : (
              <div ref={currentMessage} className="chat chat-end mt-4">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img alt="avatar-chat" src={user.profileImage} />
                  </div>
                </div>
                <div className={`${user?.isNightMode ? "bg-lime-200" : "bg-lime-100"} chat-bubble text-slate-700 font-medium`}>
                  <div
                    className={`${
                      message.message ? "py-2 break-words max-w-96" : ""
                    }`}
                  >
                    {message.message}
                  </div>
                  {message.imageUrl && (
                    <Image
                      className="rounded-md"
                      width={160}
                      src={message.imageUrl}
                    />
                  )}
                </div>
                <time
                  className={`text-xs  my-1 ${
                    user?.isNightMode
                      ? "text-slate-50 font-medium"
                      : "text-sky-950 font-bold"
                  }`}
                >
                  {formatDateTime(message.createdAt)} PM
                </time>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ListMessage;
