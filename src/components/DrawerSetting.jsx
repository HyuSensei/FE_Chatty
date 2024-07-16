import React from "react";
import { useDispatch } from "react-redux";
import { logout, setNightMode, setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Switch } from "antd";
import ProfileModal from "./ProfileModal";
import { useState } from "react";
import axios from "axios";
import { getData } from "../../helpers/localStorage";

const API_URL = import.meta.env.VITE_APP_API_URL;

const DrawerSetting = () => {
  const token = getData("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    name: user?.name,
    profileImage: user?.profileImage,
    gender: user?.gender,
  });
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (key, value) => {
    setInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/wellcome");
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axios.put(API_URL + `/user/${user?._id}`, input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        message.success("Update profile successfully");
        dispatch(
          setUser({
            name: input.name,
            profileImage: input.profileImage,
            gender: input.gender,
          })
        );
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      message.error(
        error.response ? error.response.data.message : error.message
      );
    }
  };

  const handleChangeNightMode = (checked) => {
    dispatch(setNightMode(checked));
  };
  return (
    <>
      <ProfileModal
        {...{
          open,
          setOpen,
          save: handleSave,
          handleChangeInput,
          input,
          loading,
        }}
      />
      <div className="drawer z-20 ">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className="btn drawer-button btn-ghost btn-circle"
          >
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
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div
            className={`${
              user?.isNightMode
                ? "bg-gradient-to-r from-slate-600 to-slate-900 text-slate-50"
                : "bg-white text-base-content"
            } min-h-full w-64 py-4 px-4`}
          >
            <div className="avatar">
              <div className="ring-sky-400 ring-offset-base-100 w-20 rounded-full ring ring-offset-2">
                <img src={user?.profileImage} />
              </div>
            </div>
            <div className="py-2 text-base font-bold truncate">
              {user?.name}
            </div>
            <div className="text-base font-medium truncate">{user?.email}</div>
            <div className="divider"></div>
            <div
              onClick={() => setOpen(true)}
              className={`${
                user?.isNightMode
                  ? "hover:bg-slate-700 bg-slate-600 "
                  : "hover:bg-gray-100 bg-gray-50"
              } flex gap-3 items-center cursor-pointer py-4 px-2 rounded-md mb-3`}
            >
              <svg
                width="25px"
                height="25px"
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
                    d="M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z"
                    stroke="#989898"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    opacity="0.34"
                    d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z"
                    stroke="#989898"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#989898"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
              <div className="text-sm font-medium">Profile</div>
            </div>
            <div
              className={`${
                user?.isNightMode
                  ? "hover:bg-slate-700 bg-slate-600 "
                  : "hover:bg-gray-100 bg-gray-50"
              } flex gap-3 items-center cursor-pointer py-4 px-2 rounded-md mb-3`}
            >
              <svg
                fill="#989898"
                height="22px"
                width="22px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 501.882 501.882"
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
                      <path d="M491.375,277.883c-7.467-4.267-16-4.267-23.467,1.067c-39.467,28.8-86.4,44.8-131.2,44.8s-85.333-16-114.133-44.8 c-59.733-60.8-59.733-163.2,0-245.333c5.333-6.4,5.333-16,1.067-23.467s-12.8-11.733-21.333-9.6 c-49.067,10.667-92.8,34.133-128,69.333c-46.933,48-73.6,112-73.6,179.2s26.667,131.2,73.6,179.2c48,46.933,112,73.6,179.2,73.6 c68.267,0,131.2-26.667,178.133-74.667c35.2-35.2,59.733-78.933,69.333-128C502.041,290.683,498.841,282.149,491.375,277.883z M402.841,398.416c-39.467,39.467-92.8,61.867-149.333,61.867s-109.867-22.4-149.333-61.867 c-39.467-39.466-61.867-92.8-61.867-149.333s22.4-109.867,61.867-149.333c17.067-17.067,36.267-29.867,56.533-40.533 c-40.533,88.533-28.8,186.667,33.067,248.533c37.333,37.333,88.533,57.6,144,57.6c35.2,0,71.467-8.533,105.6-23.467 C432.708,363.216,419.908,381.349,402.841,398.416z"></path>{" "}
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M488.175,94.416c-2.133-7.467-8.533-13.867-17.067-14.933l-60.8-10.667l-25.6-56.533 c-3.2-6.4-10.667-11.733-18.133-11.733c-1.067,0-1.067,0-1.067,0c-7.467,0-14.933,4.267-18.133,10.667l-28.8,54.4l-61.867,7.467 c-7.467,1.067-13.867,6.4-17.067,13.867c-3.2,7.467-1.067,16,4.267,21.333l42.667,44.8l-11.733,60.8 c-2.133,7.467,1.067,14.933,7.467,20.267c6.4,4.267,14.933,5.333,22.4,2.133l55.467-26.667l54.4,29.867 c3.2,2.133,7.467,3.2,10.667,3.2c11.733,0,20.267-9.6,20.267-21.333c0-1.067,0-3.2-1.067-5.333l-8.533-58.667l45.867-41.6 C488.175,110.416,490.308,101.883,488.175,94.416z M400.707,134.949c-5.333,4.267-7.467,11.733-6.4,18.133l4.267,29.867 l-26.667-14.933c-3.2-2.133-7.467-3.2-10.667-3.2c-3.2,0-6.4,1.067-7.467,2.133l-27.733,13.867l6.4-29.867 c1.067-6.4-1.067-12.8-5.333-18.133l-21.333-22.4l29.867-3.2c6.4,0,12.8-4.267,16-10.667l13.867-26.667l12.8,27.733 c2.133,6.4,8.533,10.667,14.933,11.733l29.867,5.333L400.707,134.949z"></path>{" "}
                    </g>
                  </g>
                </g>
              </svg>
              <div className="text-sm font-medium pr-6">Night Mode</div>
              <Switch
                value={user?.isNightMode}
                onChange={handleChangeNightMode}
              />
            </div>
            <div
              onClick={handleLogout}
              className={`${
                user?.isNightMode
                  ? "hover:bg-slate-700 bg-slate-600 "
                  : "hover:bg-gray-100 bg-gray-50"
              } cursor-pointer flex gap-3 items-center py-4 px-2 rounded-md`}
            >
              <svg
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="27px"
                height="27px"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M31.52 8.55103C25.6805 8.55573 20.0548 10.7487 15.7526 14.6973C11.4504 18.6458 8.78426 24.0633 8.28 29.881H29.34L27.45 28.001C27.2634 27.8159 27.1151 27.5959 27.0136 27.3535C26.9121 27.111 26.8594 26.8509 26.8584 26.5881C26.8575 26.3253 26.9084 26.0648 27.0082 25.8217C27.108 25.5785 27.2547 25.3575 27.44 25.1711C27.6251 24.9844 27.8451 24.8361 28.0876 24.7346C28.33 24.6331 28.5901 24.5804 28.8529 24.5795C29.1158 24.5785 29.3762 24.6294 29.6194 24.7292C29.8625 24.829 30.0836 24.9757 30.27 25.161L35.6 30.461V30.471C35.7103 30.5794 35.8076 30.7002 35.89 30.831C35.9444 30.9168 35.9913 31.0071 36.03 31.101C36.04 31.121 36.05 31.131 36.05 31.151C36.0924 31.2581 36.1259 31.3685 36.15 31.481V31.501C36.1786 31.6256 36.1921 31.7532 36.19 31.881C36.1921 32.0089 36.1786 32.1365 36.15 32.261C36.1387 32.3645 36.1118 32.4657 36.07 32.561C36.061 32.596 36.0476 32.6296 36.03 32.661C36.0218 32.6851 36.0118 32.7085 36 32.731C35.9749 32.7953 35.9413 32.8558 35.9 32.911C35.877 32.9565 35.8503 33 35.82 33.041C35.7614 33.1274 35.6944 33.2078 35.62 33.281L35.6 33.301L30.27 38.661C30.0854 38.8473 29.8658 38.9953 29.6238 39.0966C29.3819 39.1978 29.1223 39.2503 28.86 39.251C28.5977 39.2503 28.3382 39.1978 28.0962 39.0966C27.8542 38.9953 27.6347 38.8473 27.45 38.661C27.2629 38.4773 27.114 38.2582 27.0121 38.0166C26.9102 37.7749 26.8573 37.5154 26.8563 37.2531C26.8554 36.9908 26.9065 36.731 27.0067 36.4886C27.1069 36.2462 27.2542 36.0261 27.44 35.841L29.39 33.881H8.28C8.78426 39.6987 11.4504 45.1162 15.7526 49.0648C20.0548 53.0134 25.6805 55.2063 31.52 55.211C37.7069 55.2063 43.6393 52.7471 48.0151 48.3732C52.3909 43.9993 54.8526 38.068 54.86 31.881C54.8526 25.6941 52.3909 19.7628 48.0151 15.3889C43.6393 11.015 37.7069 8.55579 31.52 8.55103Z"
                    fill="#989898"
                  ></path>
                </g>
              </svg>
              <div className="text-sm font-medium">Logout</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawerSetting;
