import React, { useState } from "react";
import { useSelector } from "react-redux";
function useHttp(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const accessToken = useSelector((state) => state.auth.token);
  const sendRequest = async (requestConfig, callback) => {
    try {
      setIsLoading(true);
      setError(null);
      const respone = await fetch(requestConfig.url, {
        headers: requestConfig.headers
          ? requestConfig.headers 
          : {
              "Content-Type": "application/json",
              token: "Bearer " + accessToken,
            },
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        credentials: "include",
      });
      const data = await respone.json();
      if (respone.status >= 300) {
        setError(data);
      } else {
        callback(data);
      }
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    isLoading,
    error,
    setError,
    sendRequest,
  };
}

export default useHttp;
