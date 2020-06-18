import React, { useState, useEffect } from 'react';

const useFetch = (callApi, param = {}, initialData = []) => {
    const [data, setData] = useState(initialData);
    // const [url, setUrl] = useState(initialUrl);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
   
    useEffect(() => {
      const fetchData = async () => {
        setError("");
        setIsLoading(true);
   
        try {
          const result = await callApi(param);
   
        //   setData(result.data);
          setData(result);
        } catch (error) {
            setError(error || "Error occurred");
        }
   
        setIsLoading(false);
      };
   
      fetchData();
    }, []);
   
    return [ data, isLoading, error];
  };


  export default useFetch;