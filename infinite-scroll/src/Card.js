import React, { useCallback, useEffect, useState } from "react";

export default function Card() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const apiCall = useCallback(() => {
    fetch(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData((prevData) => [...prevData, ...data.hits]);
      });
  }, [count]);

  const fn = useCallback(() => {
    if (
      window.innerHeight + Math.floor(document.documentElement.scrollTop) ===
      document.scrollingElement.scrollHeight
    ) {
      setCount((prev) => prev + 1);
    }
  }, [count]);

  useEffect(() => {
    apiCall();
  }, [apiCall]);

  useEffect(() => {
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, [fn]);

  return (
    <div>
      {data.map((res) => {
        return (
          <div key={res.objectID}>
            <h4>{res.title}</h4>
            <p>{res.author}</p>
          </div>
        );
      })}
    </div>
  );
}
