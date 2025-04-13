import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [image, setimage] = useState(null);
  const [messsage, setmesssage] = useState("");
  const [links, setlinks] = useState([]);

  const handleGetLinks = () => {
    axios
      .get("http://localhost:3000/api/v1/users/getLinks", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setlinks(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetLinks();
  }, []);

  const handleFileSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("image", image);

    axios
      .post("http://localhost:3000/api/v1/users/uploadFile", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, //let  server send / read cookies from frontend
      })
      .then((response) => {
        console.log(response.data.message);
        setmesssage(response.data.message);
        if (response.status === 200) {
          handleGetLinks();
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        if (!err.response.data.sucess) {
          setmesssage("file is required");
        }
      });
  };

  return (
    <>
      <h1>{messsage}</h1>
      <form onSubmit={handleFileSubmit}>
        <input
          type="file"
          onChange={(e) => {
            setimage(e.target.files[0]);
          }}
        />
        <button type="submit">submit</button>
      </form>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {links.map((e, index) => (
          <img
            style={{ width: "300px" }}
            key={index}
            src={`${e.link}`}
            alt=""
          />
        ))}
      </div>
    </>
  );
};

export default Home;
