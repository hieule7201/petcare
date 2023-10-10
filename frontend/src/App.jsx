import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:8081/");
      setData(res.data);
    };
    getData();
  }, []);

  console.log(data);
  return (
    <div>
      {data.map((params, index) => {
        return (
          <div key={index}>
            <p>{params.name}</p>
            <span>{params.value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default App;
