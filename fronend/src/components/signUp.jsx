import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [CloudUsername, setcloudUsername] = useState("");
  const [apiKey, setapiKey] = useState("");
  const [apiSecret, setapiSecret] = useState("");
  const [password, setpassword] = useState("");
  const [image, setimage] = useState(null);

  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    setisLoading(true);
    console.log("Form submitted"); // ✅ Add this

    e.preventDefault();

    // build in object method which allow to make a data object which seems like react form data
    // also handle files
    const formData = new FormData();
    formData.append("CloudUsername", CloudUsername);
    formData.append("apiKey", apiKey);
    formData.append("apiSecret", apiSecret);
    formData.append("password", password);
    formData.append("image", image);

    axios // ading normal json
      .post("http://localhost:3000/api/v1/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, //required to receive and send cookies
        //headers tell server content is multipart/form-data not normal json - for image upload
      })
      .then((response) => {
        console.log(response.data.message);
        seterror(response.data.message);
        if (response.data.status === 200) {
          navigate("/Home");
          setisLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        seterror(err.response.data.message);
        setisLoading(false);
      });
  };

  return (
    <div className="h-screen w-full flex flex-col gap-4 justify-center items-center">
      <div className="bg-neutral-100 p-5 rounded-md w-1/3 max-sm:w-full max-md:w-2/3">
        <div className="flex flex-col items-start text-3xl font-semibold  mb-5 mt-2">
          Sign Up
          <span
            onClick={() => {
              navigate("/signIn");
            }}
            className="text-black text-xs "
          >
            or
            <span className="text-blue-600 text-xs underline cursor-pointer">
              Sign in to your account
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
              setcloudUsername(e.target.value);
            }}
            className="w-full h-14 px-5   border border-black rounded-md mt-3 max-sm:h-14 max-sm:w-full"
          />
          <input
            type="text"
            placeholder="Api Key"
            onChange={(e) => {
              setapiKey(e.target.value);
            }}
            className="w-full h-14  px-5   border border-black rounded-md  mt-3 "
          />
          <input
            type="text"
            placeholder="Api Secret"
            onChange={(e) => {
              setapiSecret(e.target.value);
            }}
            className="w-full h-14  px-5   border border-black rounded-md  mt-3 "
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className="w-full h-14 px-5   border border-black rounded-md  mt-3 "
          />
          <input
            type="file"
            placeholder="Image"
            onChange={(e) => {
              setimage(e.target.files[0]);
            }}
            className=" w-full h-14  mt-3 "
          />
          <button
            type="submit "
            className="w-full h-14 px-5   border border-black rounded-md  mt-3 bg-blue-500 text-white "
          >
            Sign Up
          </button>
        </form>
      </div>
      <h1 className="text-red-600">{error}</h1>
    </div>
  );
}

export default SignUp;
