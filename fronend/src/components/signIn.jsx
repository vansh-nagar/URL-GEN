import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [CloudUsername, setCloudUsername] = useState("");
  const [password, setpassword] = useState("");
  const [errResp, seterrRresp] = useState("second");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/api/v1/users/login",
        {
          CloudUsername,
          password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        seterrRresp(response.data.message);
        if (response.data.status === 200) {
          navigate("/Home");
        }
      })
      .catch((err) => {
        console.log(err);
        seterrRresp(err.response.data.message);
      });
  };
  return (
    <>
      <div>
        SignIn or
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          create an account
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Cloudinary Username"
          onChange={(e) => {
            setCloudUsername(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <button type="submit">LogIn</button>
      </form>
      <div>{errResp}</div>
    </>
  );
};

export default SignIn;
