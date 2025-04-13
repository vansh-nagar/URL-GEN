import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiArrowDownSLine,
  RiDeleteBin6Line,
  RiFileCopyLine,
} from "@remixicon/react";

const Home = () => {
  const [image, setimage] = useState(null);
  const [messsage, setmesssage] = useState("");
  const [links, setlinks] = useState([]);

  const [toggleImage, settoggleImage] = useState(false);

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

  const handleImageToggle = (e) => {
    if (toggleImage) {
      console.log((e.target.style.position = ""));
      console.log((e.target.style.width = "56px"));
      console.log((e.target.style.height = "56px"));
      console.log((e.target.style.zIndex = "1"));
    } else {
      console.log((e.target.style.position = "absolute"));
      console.log((e.target.style.width = "300px"));
      console.log((e.target.style.height = "300px"));
      console.log((e.target.style.top = "0"));
      console.log((e.target.style.left = "-100px"));
      console.log((e.target.style.zIndex = "100"));
    }
  };

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="w-2/5 border flex justify-center items-center flex-col">
        <form
          onSubmit={handleFileSubmit}
          className="flex flex-col justify-center items-center"
        >
          <input
            type="file"
            onChange={(e) => {
              setimage(e.target.files[0]);
            }}
            className="h-96 w-96 border"
          />
          <button
            type="submit"
            className="w-full h-14 px-5  mt-10 border border-black rounded-md   bg-blue-500 text-white "
          >
            Upload
          </button>
        </form>
        <h1 className="text-red-600">{messsage}</h1>
      </div>

      {/* <div className="w-1/2">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {links.map((e, index) => (
            <img
              style={{ width: "30px" }}
              key={index}
              src={`${e.link}`}
              alt=""
            />
          ))}
        </div>
      </div> */}

      <div className="flex w-3/5  justify-center items-center p-16 ">
        <div className="bg-neutral-100 rounded-md p-5 h-full w-full">
          <div className="flex flex-row items-center justify-between border-b-2 border-gray-400 pb-5">
            <div className="flex flex-row items-center">
              <div className="mr-5 font-semibold">Links</div>
              <div className="relative">
                <div className="absolute right-4 top-3 pointer-events-none">
                  <RiArrowDownSLine
                    size={30} // set custom `width` and `height`
                  />
                </div>
                <select
                  name=""
                  id=""
                  className="appearance-none   rounded-md py-3 pl-6  "
                >
                  <option value="">Filter</option>
                  <option value="RecentlyCreated">Recently Created</option>
                  <option value="mostUsed">most Used</option>
                  <option value="image">image</option>
                  <option value="video">video</option>
                </select>
              </div>
            </div>
            <input type="checkbox" />
          </div>
          {/**/}
          <div className="my-5 ">
            {/*component*/}
            {links.map((e, index) => (
              <div className="flex  relative justify-between items-center  bg-neutral-300 py-[5px] rounded-md  shadow-xl mt-3 ">
                <div
                  className="flex justify-center items-center 
              "
                >
                  <img
                    src={`${e.link}`}
                    alt=""
                    className="w-14 h-14 object-cover ml-[5px] rounded-md shadow-2xl cursor-pointer"
                    onMouseEnter={(e) => {
                      settoggleImage(true);
                      handleImageToggle(e);
                    }}
                    onMouseLeave={(e) => {
                      settoggleImage(false);
                      handleImageToggle(e);
                    }}
                  />

                  <div className="m-4">{e.fileName}</div>
                </div>
                {/**/}
                <div className="flex justify-center items-center flex-row mr-6">
                  <RiDeleteBin6Line size={25} className="mr-6 cursor-pointer" />
                  <RiFileCopyLine size={25} className="cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
