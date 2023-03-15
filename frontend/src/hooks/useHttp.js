import React, { useState } from "react";

function useHttp(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (requestConfig, callback) => {
    try {
      setIsLoading(true);
      setError(null);
      const respone = await fetch(requestConfig.url, {
        headers: requestConfig.headers
          ? requestConfig.headers
          : { "Content-Type": "application/json" },
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        credentials: "include",
      });
      if (respone.status >= 300) {
        setError(respone.statusText);
      } else {
        const data = await respone.json();
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
