import React from "react";
import DrawerSetting from "./DrawerSetting";
import { useSelector } from "react-redux";

const HeaderChat = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="navbar">
      <div className="navbar-start">
        <DrawerSetting />
      </div>
      <div className="navbar-center">
        <svg
          fill={"#5bc0de"}
          height="30px"
          width="30px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 477.5 477.5"
          xmlSpace="preserve"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <g>
                <path d="M407.533,70c-45.1-45.1-105-70-168.8-70s-123.7,24.8-168.8,69.9c-87,87-93.3,226-15.8,320.2 c-10.7,21.9-23.4,36.5-37.6,43.5c-8.7,4.3-13.6,13.7-12.2,23.3c1.5,9.7,8.9,17.2,18.6,18.7c5.3,0.8,11,1.3,16.9,1.3l0,0 c29.3,0,60.1-10.1,85.8-27.8c34.6,18.6,73.5,28.4,113.1,28.4c63.8,0,123.7-24.8,168.8-69.9s69.9-105.1,69.9-168.8 S452.633,115.1,407.533,70z M388.433,388.5c-40,40-93.2,62-149.7,62c-37.8,0-74.9-10.1-107.2-29.1c-2.1-1.2-4.5-1.9-6.8-1.9 c-2.9,0-5.9,1-8.3,2.8c-30.6,23.7-61.4,27.2-74.9,27.5c16.1-12,29.6-30.6,40.9-56.5c2.1-4.8,1.2-10.4-2.3-14.4 c-74-83.6-70.1-211,8.9-290c40-40,93.2-62,149.7-62c56.6,0,109.7,22,149.7,62C471.033,171.6,471.033,306,388.433,388.5z"></path>{" "}
                <path d="M299.333,129.4c-21.6,0-41.9,8.4-57.2,23.7l-3.4,3.4l-3.4-3.4c-15.3-15.3-35.6-23.7-57.2-23.7c-21.5,0-41.8,8.4-57,23.6 c-15.3,15.3-23.7,35.6-23.6,57.1c0,21.6,8.5,41.8,23.7,57.1l107.9,107.9c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-3.9l108.2-107.8 c15.3-15.3,23.7-35.6,23.7-57.1c0-21.6-8.4-41.9-23.6-57.2C341.133,137.8,320.833,129.4,299.333,129.4z M337.233,248.3l-98.6,98.2 l-98.4-98.4c-10.2-10.2-15.8-23.7-15.8-38.1c0-14.4,5.6-27.9,15.7-38c10.1-10.1,23.6-15.7,38-15.7s27.9,5.6,38.1,15.8l13,13 c5.3,5.3,13.8,5.3,19.1,0l12.9-12.9c10.2-10.2,23.7-15.8,38.1-15.8c14.3,0,27.8,5.6,38,15.8s15.8,23.7,15.7,38 C353.033,224.6,347.433,238.1,337.233,248.3z"></path>{" "}
              </g>
            </g>
          </g>
        </svg>
        <span
          className={`${
            user?.isNightMode
              ? "text-2xl px-2 font-medium text-slate-50 font-fantasy"
              : "HomePage-Chatty"
          }`}
        >
          Chatty
        </span>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill={user?.isNightMode ? "#f5f5f5" : "none"}
              viewBox="0 0 24 24"
              stroke={user?.isNightMode ? "#f5f5f5" : "currentColor"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default HeaderChat;
