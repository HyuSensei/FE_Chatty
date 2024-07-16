import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getData } from "../../helpers/localStorage";

const API_URL = import.meta.env.VITE_APP_API_URL;

export default function useCreateApi({ url = "", input = {} }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = getData("token");

  const createData = async () => {
    try {
      setLoading(true);
      const res = await axios.post(API_URL + url, input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setData(res.data);
      } else {
        toast.warning(res.data.message);
        setLoading(false);
        return;
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, createData };
}
