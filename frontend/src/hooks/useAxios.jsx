import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from "../../config";

const useAxios = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const baseUrl = 'http://127.0.0.1:8000/';
  // const baseUrl = 'https://gemreytest.pythonanywhere.com/';
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${API_URL}${url}`);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useAxios;
