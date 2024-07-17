import React, { useContext, useEffect, useState } from "react";
import { formatDateTime } from "../../helpers/formatDate";
import { useSelector } from "react-redux";
import { ChatContext } from "../context/ChatContext";
import axios from "axios";
import { getData } from "../../helpers/localStorage";

const API_URL = import.meta.env.VITE_APP_API_URL;

const OtherUsers = () => {
  const token = getData("token");
  const {
    selected = {},
    setSelected,
    users,
    loadingUser: loading,
    socket,
    setDataUser: setData,
    messages: dataMessage,
  } = useContext(ChatContext);
  const { onlineUsers, _id, isNightMode } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSelected = async (data) => {
    setSelected(data);
    if (
      data?.lastMessage &&
      data?.lastMessage?.sender === data._id &&
      !data?.lastMessage.seen
    ) {
      try {
        const res = await axios.put(
          API_URL + `/message/seen/${data._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          const newOtherUser = users.map((item) => {
            if (item?.lastMessage?._id === data?.lastMessage?._id) {
              return {
                ...item,
                lastMessage: {
                  ...item.lastMessage,
                  seen: true,
                },
              };
            }
            return item;
          });
          setData(newOtherUser);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (socket) {
      socket?.emit("other-users", _id);
      socket?.on("conversation", (dataUsers) => {
        setData(dataUsers);
      });
    }
    return () => socket?.off("conversation");
  }, [socket, dataMessage?.messages]);

  useEffect(() => {
    setFilteredUsers(
      users?.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  if (loading) {
    return (
      <>
        {[...Array(7)].map((_, index) => (
          <div key={index} className="flex items-center gap-4 py-4 px-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4 w-full">
              <div className="skeleton h-4 w-1/2"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="py-2">
      <div className="mx-2 my-1">
        <label className="input flex items-center gap-2 w-full bg-slate-50">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="h-[calc(100vh-50px)] flex flex-col overflow-y-scroll flex-1 mt-3">
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers?.map((item, index) => (
            <div
              onClick={() => handleSelected(item)}
              key={`user` + index}
              className={`${
                selected?._id === item._id
                  ? isNightMode
                    ? "bg-slate-800"
                    : "bg-sky-100"
                  : ""
              } flex px-4 py-4 items-center gap-4 w-full cursor-pointer ${
                isNightMode ? "hover:bg-slate-700" : "hover:bg-slate-300"
              }`}
            >
              <div
                className={`avatar ${
                  onlineUsers.includes(item._id) ? "online" : ""
                }`}
              >
                <div className="w-14 rounded-full">
                  <img src={item.profileImage} />
                </div>
              </div>
              <div
                className={`flex justify-between w-full flex-wrap ${
                  isNightMode ? "text-slate-50" : ""
                }`}
              >
                <div className="w-2/3">
                  <div className="text-base font-bold">{item.name}</div>
                  {item?.lastMessage && (
                    <div
                      className={`${
                        item?.lastMessage?.seen ||
                        item?.lastMessage?.sender === _id
                          ? "text-base text-slate-400"
                          : "font-medium"
                      } truncate`}
                    >
                      {item?.lastMessage?.sender === item._id
                        ? item?.lastMessage?.message || "You: Photos received"
                        : `You: ${
                            item?.lastMessage?.message || "Photos sent"
                          }`}{" "}
                    </div>
                  )}
                </div>
                <div className="text-base text-slate-400">
                  {item?.lastMessage
                    ? formatDateTime(item?.lastMessage?.createdAt)
                    : ""}
                  {item?.lastMessage &&
                    !item?.lastMessage?.seen &&
                    item?.lastMessage?.sender !== _id && (
                      <div className="py-2">
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
                              opacity="0.4"
                              d="M11.9707 22C17.4936 22 21.9707 17.5228 21.9707 12C21.9707 6.47715 17.4936 2 11.9707 2C6.44786 2 1.9707 6.47715 1.9707 12C1.9707 17.5228 6.44786 22 11.9707 22Z"
                              fill="#01bacf"
                            ></path>
                            <path
                              d="M11.9995 16.23C14.3357 16.23 16.2295 14.3362 16.2295 12C16.2295 9.66386 14.3357 7.77002 11.9995 7.77002C9.66337 7.77002 7.76953 9.66386 7.76953 12C7.76953 14.3362 9.66337 16.23 11.9995 16.23Z"
                              fill="#01bacf"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-screen">
            <div className="bg-teal-100 px-4 py-1 rounded-xl text-slate-500 font-bold">
              Not found user !
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherUsers;
