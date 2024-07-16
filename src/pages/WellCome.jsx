import React, { useEffect } from "react";
import useScreen from "../hook/useScreen";
import { MdOutlineMenu, MdOutlineHome } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { SiGnuprivacyguard } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { setData } from "../../helpers/localStorage";
import { useDispatch } from "react-redux";
import { getDataUser } from "../redux/userSlice";

const WellCome = () => {
  const { isMobile } = useScreen();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      setData("token", token);
      dispatch(getDataUser());
      navigate("/");
    }
  }, []);

  return (
    <div className="px-16 h-screen bg-gradient-to-r from-indigo-100 to-indigo-300 overflow-hidden">
      <div className="navbar py-8">
        <div className="flex-1 cursor-pointer">
          <svg
            fill="#5bc0de"
            height="50px"
            width="50px"
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
          <span className="font-bold text-3xl ml-4 text-logo">Chatty</span>
        </div>
        <div className="flex-none gap-6">
          {isMobile ? (
            <>
              <div className="drawer drawer-end">
                <input
                  id="my-drawer-4"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content">
                  <label htmlFor="my-drawer-4">
                    <MdOutlineMenu className="text-3xl text-sky-700 cursor-pointer" />
                  </label>
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu bg-gradient-to-r from-indigo-100 to-indigo-300 text-base-content min-h-full w-80 p-4">
                    <li>
                      <div className="font-bold text-xl ml-4 text-sky-700 cursor-pointer">
                        <MdOutlineHome /> Home
                      </div>
                    </li>
                    <li>
                      <div className="font-bold text-xl ml-4 text-sky-700 cursor-pointer">
                        <IoMdLogIn onClick={() => navigate("/login")} /> Login
                      </div>
                    </li>
                    <li>
                      <div className="font-bold text-xl ml-4 text-sky-700 cursor-pointer">
                        <SiGnuprivacyguard
                          onClick={() => navigate("/register")}
                        />
                        Register
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => navigate("/login")}
                className="font-bold text-xl ml-4 text-sky-700 cursor-pointer hover:text-sky-600"
              >
                Home
              </div>
              <div
                onClick={() => navigate("/login")}
                className="font-bold text-xl ml-4 text-sky-700 cursor-pointer hover:text-sky-600"
              >
                Login
              </div>
              <div
                onClick={() => navigate("/register")}
                className="font-bold text-xl ml-4 text-sky-700 cursor-pointer hover:text-sky-600"
              >
                Register
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-16 text-center w-full">
        <div
          className={`${isMobile ? "text-xl" : "text-4xl"} font-bold text-logo`}
        >
          Hey ! <span className="text-sky-700">Wellcome to Chatty</span>{" "}
        </div>
        <div
          className={`${!isMobile ? "text-xl" : "text-sm"} mt-4 text-sky-800`}
        >
          Let's connect with each other so we can become a part of your life
        </div>
      </div>
      <div className="mt-4 flex justify-center items-center">
        <button
          onClick={() => navigate("/login")}
          className="btn sm:w-25 md:w-40 sm:text-md md:text-xl bg-gradient-to-r from-indigo-400 to-indigo-800 border-sky-300 text-slate-100"
        >
          Get started
        </button>
      </div>
    </div>
  );
};

export default WellCome;
