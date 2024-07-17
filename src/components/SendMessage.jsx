import React, { useContext, useEffect, useRef, useState } from "react";
import { Image, Spin } from "antd";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import InputEmoji from "react-input-emoji";
import { deleteFile, uploadFile } from "../../helpers/uploadFile";
import axios from "axios";
import { getData } from "../../helpers/localStorage";
import { ChatContext } from "../context/ChatContext";
import { useSelector } from "react-redux";
import useScreen from "../hook/useScreen";

const API_URL = import.meta.env.VITE_APP_API_URL;

const SendMessage = () => {
  const { selected = {}, setDataMessage: setData } = useContext(ChatContext);
  const token = getData("token");
  const fileInputRef = useRef(null);
  const [input, setInput] = useState({
    message: "",
    imageUrl: "",
    videoUrl: "",
  });
  const [publicId, setPublicId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isNightMode } = useSelector((state) => state.user);
  const { isMobile } = useScreen();

  useEffect(() => {
    const element = document.querySelector(".react-emoji-picker--container");
    if (element) {
      element.style.right = isMobile ? "-60px" : "";
    }
  }, [isMobile]);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleChangeInput = (key, value) => {
    setInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        setIsLoading(true);
        const resUpload = await uploadFile(file);
        handleChangeInput("imageUrl", resUpload.url);
        setPublicId(resUpload.public_id);
        setIsLoading(false);
      }
      event.target.value = null;
    } catch (error) {
      console.log(error);
    }
  };

  const removeImage = async () => {
    try {
      await deleteFile(publicId);
      handleChangeInput("imageUrl", "");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!input.message && !input.imageUrl && !input.videoUrl) return;
      const res = await axios.post(
        API_URL + `/message/${selected?._id}`,
        input,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setData((prev) => {
          const previousData = prev || {};
          const previousMessages = previousData.messages || [];
          return {
            ...previousData,
            messages: [...previousMessages, res.data.data],
          };
        });
        setInput((prev) => ({
          ...prev,
          message: "",
          imageUrl: "",
          videoUrl: "",
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`py-2 px-6 w-full flex items-center ${
          isNightMode
            ? "bg-gradient-to-r from-slate-600 to-slate-900"
            : "bg-white border-t"
        }`}
      >
        {input.imageUrl && (
          <div className="px-2 gap-2 flex items-center">
            <Image className="rounded-md" width={90} src={input.imageUrl} />
            <button
              type="button"
              onClick={removeImage}
              className="btn btn-ghost btn-circle text-center bg-slate-100"
            >
              <DeleteOutlined style={{ fontSize: "20px", color: "#b55947" }} />
            </button>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {isLoading ? (
          <Spin indicator={<LoadingOutlined spin />} />
        ) : (
          <svg
            onClick={handleIconClick}
            className="cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M18.22 19.9628C17.8703 20 17.4213 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.7157 19.5903 4.40973 19.2843 4.21799 18.908C4.12583 18.7271 4.07264 18.5226 4.04193 18.2622M18.22 19.9628C18.5007 19.9329 18.7175 19.8791 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M18 9V6M18 6V3M18 6H21M18 6H15"
                stroke={isNightMode ? "#f5f5f5" : "#000000"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        )}
        <InputEmoji
          theme={isNightMode ? "dark" : "light"}
          fontSize={17}
          borderRadius={8}
          value={input.message}
          onChange={(text) => {
            handleChangeInput("message", text);
          }}
          placeholder="Write a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
          shouldReturn
        />
        <button type="submit" className="btn btn-ghost btn-circle">
          <svg
            className="cursor-pointer"
            width="35px"
            height="35px"
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
                d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z"
                stroke="#5bc0de"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SendMessage;
