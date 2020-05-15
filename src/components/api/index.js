import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageApi = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("images.json");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const requestImages = async () => {
      setError(false);
      setLoading(true);
      try {
        const result = await axios.get(url).then();
        setData(result.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    requestImages();
  }, [url]);
  return [{ data, loading, error }];
};
export default ImageApi;
