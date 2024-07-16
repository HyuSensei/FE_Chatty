import React, { useRef, useState } from "react";
import { Modal, Image, Button, Spin } from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import useScreen from "../hook/useScreen";
import { deleteFile, uploadFile } from "../../helpers/uploadFile";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

const ProfileModal = ({
  open = false,
  setOpen,
  save,
  handleChangeInput,
  input = {},
  loading = false,
}) => {
  const { isMobile } = useScreen();
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.user);
  const [publicId, setPublicId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        setIsLoading(true);
        const resUpload = await uploadFile(file);
        handleChangeInput("profileImage", resUpload.url);
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
      handleChangeInput("profileImage", user?.profileImage);
      setPublicId("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    await save();
    setPublicId("");
  };

  return (
    <Modal
      className={`${isMobile ? "px-4" : ""}`}
      width={!isMobile ? "600px" : "100%"}
      title="Profile"
      open={open}
      okText={"Save"}
      okButtonProps={{
        loading,
        disabled: loading,
      }}
      onOk={handleSave}
      onCancel={() => setOpen(false)}
    >
      <div className="px-2 py-4">
        <div className="avatar flex items-center justify-center">
          {!isLoading && input?.profileImage ? (
            <div className="ring-sky-400 ring-offset-base-100 w-20 rounded-full ring ring-offset-2">
              <Image src={input?.profileImage} />
            </div>
          ) : (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 48,
                  }}
                  spin
                />
              }
            />
          )}
        </div>
        {publicId && (
          <div className="flex items-center justify-center pt-4">
            <button
              type="button"
              onClick={removeImage}
              className="btn btn-ghost btn-circle text-center bg-slate-100"
            >
              <DeleteOutlined style={{ fontSize: "20px", color: "#b55947" }} />
            </button>
          </div>
        )}
        <div className="flex items-center justify-center pt-6">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            onClick={handleIconClick}
            className="text-base font-normal"
            type="primary"
            ghost
          >
            <UploadOutlined /> Upload
          </Button>
        </div>
        <div>
          <div className="py-6 w-full">
            <div className="py-3 text-base font-medium">Display name:</div>
            <input
              value={input?.name}
              type="text"
              className="input input-bordered w-full"
              onChange={(e) => handleChangeInput("name", e.target.value)}
            />
          </div>
          <div className="pt-4 flex justify-between gap-4">
            <div className="py-3 px-3 flex items-center gap-4 bg-slate-100 rounded-md w-1/2">
              <input
                defaultChecked={input?.gender === "male" ? true : false}
                value={"male"}
                type="radio"
                name="radio-gender"
                className="radio radio-accent"
                onChange={(e) => {
                  handleChangeInput("gender", e.target.value);
                }}
              />
              <div className="text-sm font-medium text-gray-700">Male</div>
            </div>
            <div className="py-3 px-3 flex items-center gap-4 bg-slate-100 rounded-md w-1/2">
              <input
                defaultChecked={input?.gender === "female" ? true : false}
                value={"female"}
                type="radio"
                name="radio-gender"
                className="radio radio-accent"
                onChange={(e) => {
                  handleChangeInput("gender", e.target.value);
                }}
              />
              <div className="text-sm font-medium text-gray-700">Female</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
