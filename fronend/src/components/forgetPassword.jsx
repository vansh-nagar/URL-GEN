import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgetPassword = () => {
  const navigator = useNavigate();
  const handleGoBack = () => {
    navigator("/SignIn");
  };

  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [messsage, setmesssage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/api/v1/users/changePassword",
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data.message);
        if (response.data.status === 200) {
          navigator("/signIn");
        }
        setmesssage(response.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setmesssage(err.response.data.message);
      });
  };

  return (
    <div className="h-screen w-full flex flex-col gap-4 justify-center items-center">
      <div className="bg-neutral-100  px-5 py-12 rounded-md w-1/3 max-sm:w-full max-md:w-2/3">
        <form className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-start text-3xl font-semibold mb-5">
            Change Password
          </div>
          <input
            type="text"
            placeholder="Old password"
            onChange={(e) => {
              setoldPassword(e.target.value);
            }}
            className="w-full h-14 px-5   border border-black rounded-md mt-3 max-sm:h-14 max-sm:w-full"
          />
          <input
            type="text"
            placeholder="New password"
            onChange={(e) => {
              setnewPassword(e.target.value);
            }}
            className="w-full h-14 px-5   border border-black rounded-md mt-3 max-sm:h-14 max-sm:w-full"
          />
          <input
            type="text"
            placeholder="Confirm new password"
            onChange={(e) => {
              setconfirmPassword(e.target.value);
            }}
            className="w-full h-14 px-5   border border-black rounded-md mt-3 max-sm:h-14 max-sm:w-full"
          />
          <button
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
            className="w-full h-14 px-5  mt-10 border border-black rounded-md   bg-blue-500 text-white "
          >
            Change Password
          </button>
          <div
            onClick={handleGoBack}
            className="mt-3 text-blue-600 cursor-pointer "
          >
            Go back
          </div>
        </form>
      </div>
      <div className="text-red-600">{messsage}</div>
    </div>
  );
};

export default ForgetPassword;
