import React, { useCallback, useEffect, useState } from "react";

export default function Card() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const apiCall = (Num) => {
    fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${Num}`)
      .then((response) => response.json())
      .then((data) => {setData(data.hits);});
      setCount((prev) => prev + 1);
  };

  const fn = function () {
    if (window.innerHeight + Math.floor(document.documentElement.scrollTop) === document.scrollingElement.scrollHeight) {
      apiCall(count + 1);
    }
  };

  useEffect(() => {
    apiCall(0);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div>
      {data.map((res) => {
        return (
          <div key={res.id}>
            <h4>{res.title}</h4>
            <p>{res.author}</p>
          </div>
        );
      })}
    </div>
  );
}
