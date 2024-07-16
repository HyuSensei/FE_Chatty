import React, { useEffect, useState } from "react";
import useScreen from "../../hook/useScreen";
import OtherUsers from "../../components/OtherUsers";
import ChatMessage from "../../components/ChatMessage";
import "./HomePage.scss";
import HeaderChat from "../../components/Header";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "../../redux/userSlice";
import { ChatContext } from "../../context/ChatContext";
import useFetchApi from "../../hook/useFetchApi";
import { isEmpty } from "../../../helpers/isEmpty";

const BE_URL = import.meta.env.VITE_APP_BE_URL;

const HomePage = () => {
  const dispatch = useDispatch();
  const { isMobile } = useScreen();
  const [selected, setSelected] = useState({});
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.user);
  const [isFetch, setIsFetch] = useState(false);

  const {
    data: users,
    loading: loadingUser,
    setData: setDataUser,
  } = useFetchApi({ url: "/users" });

  const {
    data: messages,
    loading: loadingMessage,
    setData: setDataMessage,
    setRefesh: setRefeshMessage,
  } = useFetchApi({
    url: `/message/${selected?._id}`,
    isFetch,
  });

  useEffect(() => {
    if (!isEmpty(selected)) {
      setIsFetch(true);
    }
  }, [selected]);

  useEffect(() => {
    if (user?.isAuthenticated) {
      const socketConnect = io(BE_URL, {
        query: {
          userId: user?._id,
        },
      });
      setSocket(socketConnect);
      socketConnect.on("online-users", (users) => {
        dispatch(setOnlineUsers(users));
      });
      return () => socketConnect.disconnect();
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [user?.isAuthenticated]);

  useEffect(() => {
    if (isEmpty(selected)) {
      socket?.on("send-message", (newMessage) => {
        setDataMessage((prev) => {
          const previousData = prev || {};
          const previousMessages = previousData.messages || [];
          return {
            ...previousData,
            messages: [...previousMessages, newMessage],
          };
        });
      });
      return () => socket?.off("send-message");
    }
  }, [socket, messages?.messages]);

  return (
    <ChatContext.Provider
      value={{
        selected,
        setSelected,
        socket,
        users,
        loadingUser,
        setDataUser,
        messages,
        setDataMessage,
        loadingMessage,
        setRefeshMessage,
        setIsFetch,
      }}
    >
      <div
        className={`HomePage-Container h-screen overflow-hidden flex flex-col ${
          user?.isNightMode
            ? "bg-gradient-to-r from-slate-600 to-slate-900"
            : ""
        }`}
      >
        <div className="HomPage-Header">
          <HeaderChat />
        </div>
        <div className="HomePage-Content flex flex-1 overflow-hidden">
          <div
            className={`HomePage-List__OtherUsers ${
              isMobile ? (isEmpty(selected) ? "w-full" : "hidden") : "w-1/3"
            }`}
          >
            <OtherUsers />
          </div>
          <div
            className={`${
              user?.isNightMode
                ? "HomePage-Message__NightMode"
                : "HomePage-Message__Container"
            } ${
              isMobile ? (!isEmpty(selected) ? "w-full" : "hidden") : "w-2/3"
            }`}
          >
            <ChatMessage />
          </div>
        </div>
      </div>
    </ChatContext.Provider>
  );
};

export default HomePage;
