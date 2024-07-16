import CryptoJS from 'crypto-js';

const CLOUDINARY_NAME = import.meta.env.VITE_APP_CLOUDINARY_NAME;
const API_KEY = import.meta.env.VITE_APP_CLOUDINARY_API_KEY;
const SECRET_KEY = import.meta.env.VITE_APP_CLOUDINARY_SECRET_KEY;

export const uploadFile = async (file) => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/auto/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "chat-app-file");
  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });
  return await res.json();
};

export const deleteFile = async (publicId) => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/destroy`;
  const timestamp = Math.floor(Date.now() / 1000);
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${SECRET_KEY}`;
  const signature = CryptoJS.SHA1(stringToSign).toString();
  
  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("signature", signature);
  formData.append("api_key", API_KEY);
  formData.append("timestamp", timestamp);

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  return await res.json();
};
