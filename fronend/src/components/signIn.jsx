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
    <div className="h-screen w-full flex flex-col gap-4 justify-center items-center">
      <div className="bg-neutral-100  px-5 py-12 rounded-md w-1/3 max-sm:w-full max-md:w-2/3">
        <div className="flex flex-col items-start text-3xl font-semibold mb-5">
          Sign In
          <span
            onClick={() => {
              navigate("/");
            }}
            className="text-black text-xs "
          >
            or
            <span className="text-blue-600 text-xs underline cursor-pointer">
              create an account
            </span>
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center"
        >
          <input
            type="text"
            placeholder="Cloudinary Username"
            onChange={(e) => {
              setCloudUsername(e.target.value);
            }}
            className="w-full h-14 px-5   border border-black rounded-md mt-3 max-sm:h-14 max-sm:w-full"
          />
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className="w-full h-14 px-5   border border-black rounded-md mt-3 max-sm:h-14 max-sm:w-full"
          />
          <button
            type="submit"
            className="w-full h-14 px-5  mt-10 border border-black rounded-md   bg-blue-500 text-white "
          >
            LogIn
          </button>
        </form>
      </div>
      <div className="text-red-600">{errResp}</div>
    </div>
  );
};

export default SignIn;
