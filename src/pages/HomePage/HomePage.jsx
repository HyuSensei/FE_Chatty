import React, { useEffect } from "react";
import useScreen from "../../hook/useScreen";
import OtherUsers from "../../components/OtherUsers";
import ChatMessage from "../../components/ChatMessage";
import "./HomePage.scss";
import HeaderChat from "../../components/Header";

const HomePage = () => {
  const { isMobile } = useScreen();
  return (
    <div className="HomePage-Container h-screen overflow-hidden flex flex-col">
      <div className="HomPage-Header">
        <HeaderChat />
      </div>
      <div className="HomePage-Content flex flex-1 overflow-hidden">
        <div
          className={`HomePage-List__OtherUsers ${
            isMobile ? "w-full" : "w-1/3"
          }`}
        >
          <OtherUsers />
        </div>
        {!isMobile && (
          <div
            className={`HomePage-Message__Container ${
              isMobile ? "w-full" : "w-2/3"
            }`}
          >
            <ChatMessage />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
