import React, { useEffect, useState } from "react";
import axios from "axios";
import { getData } from "../../helpers/localStorage";

const API_URL = import.meta.env.VITE_APP_API_URL;

export default function useFetchApi({ url = "", isFetch = true }) {
  const token = getData("token");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [refesh, setRefesh] = useState(false);
  const fetchData = async () => {
    try {
      if (!isFetch) return;
      setLoading(true);
      const res = await axios.get(API_URL + url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setData(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url, refesh, isFetch]);
  return {
    loading,
    data,
    setData,
    setLoading,
    setRefesh,
  };
}
