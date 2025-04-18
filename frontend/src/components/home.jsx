import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiArrowDownSLine,
  RiDeleteBin6Line,
  RiFileCopyLine,
  RiUploadCloud2Line,
} from "@remixicon/react";

const Home = () => {
  const [image, setimage] = useState(null);
  const [messsage, setmesssage] = useState("");
  const [links, setlinks] = useState([]);
  const [linkMessage, setlinkMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const [toggleImage, settoggleImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const apiURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    setTimeout(() => {
      setlinkMessage("");
    }, 3000);
  }, [linkMessage]);

  useEffect(() => {
    setTimeout(() => {
      setmesssage("");
    }, 3000);
  }, [messsage]);

  useEffect(() => {
    handleGetLinks();
  }, []);

  if (isLoading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
  }

  const handleGetLinks = () => {
    axios
      .get(`${apiURL}/api/v1/users/getLinks`, {
        withCredentials: true,
      })
      .then((response) => {
        setlinks(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("image", image);

    setisLoading(true);

    axios
      .post(`${apiURL}/api/v1/users/uploadFile`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, //let  server send / read cookies from frontend
      })
      .then((response) => {
        setmesssage(response.data.message);
        if (response.status === 200) {
          handleGetLinks();
          setPreviewUrl(null);
          setimage(null);
          setisLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        if (!err.response.data.sucess) {
          setmesssage("file is required");
          setisLoading(false);
        }
      });
  };

  const handleImageToggle = (e) => {
    if (toggleImage) {
      e.target.style.position = "";
      e.target.style.width = "56px";
      e.target.style.height = "56px";
      e.target.style.objectFit = "cover";

      e.target.style.zIndex = "1";
    } else {
      e.target.style.position = "absolute";
      e.target.style.objectFit = "contain";
      e.target.style.width = "400px";
      e.target.style.height = "400px";
      e.target.style.top = "5px";
      e.target.style.left = "-0";
      e.target.style.zIndex = "100";
    }
  };

  const handleDeleteButton = (publicId) => {
    axios
      .post(
        `${apiURL}/api/v1/users/deleteLinks`,
        {
          publicId,
        },
        { withCredentials: true }
      )
      .then((response) => {
        setlinkMessage(response.data.message);

        if (response.status === 200) {
          handleGetLinks();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCopyLink = (link, publicId) => {
    navigator.clipboard.writeText(link);

    axios
      .post(
        `${apiURL}/api/v1/users/copyLinks`,
        {
          publicId,
        },
        { withCredentials: true }
      )
      .then((response) => {
        setlinkMessage(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  {
    /** */
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setimage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };
  {
    /** */
  }

  const toggleDarkmode = () => {
    const body = document.body;
    body.classList.toggle("dark");
  };

  const handleFilter = (e) => {
    console.log(e.target.value);
    axios
      .get(`${apiURL}/api/v1/users/getFilterData/${e.target.value}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 200) {
          setlinks(response.data.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="flex max-sm:flex-col flex-row w-full h-screen  dark:bg-neutral-500 max-sm:rounded-b-md">
      <div className="w-2/5 max-sm:w-full flex justify-center items-center flex-col">
        <form
          onSubmit={handleFileSubmit}
          className="flex flex-col justify-center items-center max-sm:w-[95%] max-sm:h-screen"
        >
          <div className="flex flex-col items-center gap-4 mt-5 max-sm:w-full">
            <input
              type="file"
              id="fileUpload"
              onChange={handleFileChange}
              className="hidden "
              accept="image/*"
            />

            <label
              htmlFor="fileUpload"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`h-80 w-96 max-sm:w-full  border-4 dark:bg-black ${
                isDragging ? "border-gray-500 bg-gray-200" : ""
              } border-dotted rounded-xl flex justify-center items-center
        bg-neutral-100 border-r-pink-600 border-t-teal-600 border-b-blue-500 border-l-lime-400
        hover:border-gray-500 hover:bg-gray-100 transition-all cursor-pointer overflow-hidden`}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-full w-full object-cover rounded-xl"
                />
              ) : (
                <RiUploadCloud2Line
                  size={80}
                  className="text-gray-400  dark:text-white"
                />
              )}
            </label>
          </div>
          <button
            type="submit"
            className="w-full h-14 px-5  mt-10 border border-black rounded-md   bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600 dark:bg-neutral-300     max-sm:w-[95%] dark:text-black"
          >
            Upload
          </button>
        </form>
        <h1 className="text-red-600 dark:text-white">{messsage}</h1>
      </div>

      <div className="flex flex-col w-3/5  justify-center items-center p-16 max-sm:w-full max-sm:p-2">
        <div className=" bg-neutral-100 dark:bg-neutral-600 rounded-md p-5 h-full w-full overflow-hidden">
          <div className="flex flex-row items-center justify-between border-b-2 border-gray-400 pb-5">
            <div className="flex flex-row items-center">
              <div className="mr-5 font-semibold dark:text-white max-sm:hidden">
                Links
              </div>
              <div className="relative">
                <div className="absolute right-4 top-3 pointer-events-none">
                  <RiArrowDownSLine
                    size={30} // set custom `width` and `height`
                  />
                </div>
                <select
                  name=""
                  id=""
                  className="appearance-none w-[200px]   rounded-md py-3 pl-6  "
                  onChange={(e) => {
                    handleFilter(e);
                  }}
                >
                  <option value="">Filter</option>
                  <option value="RecentlyCreated">recently Created</option>
                  <option value="mostUsed">most Used</option>
                  <option value="image">image</option>
                  <option value="video">video</option>
                </select>
              </div>
            </div>
            <input
              type="checkbox"
              onClick={toggleDarkmode}
              className="relative w-12 h-6 bg-gray-300 dark:bg-neutral-400 rounded-full appearance-none cursor-pointer transition duration-300 
             before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:w-5 before:h-5 before:bg-white before:rounded-full 
             before:transition-transform before:duration-300 checked:before:translate-x-6"
            />
          </div>
          <div className="hide-scrollbar my-5 mb-5 overflow-y-auto h-[85%]  pb-[1000px] max-sm:pb-[350px] ">
            {/*component*/}
            {links.map((e, index) => (
              <div
                key={index}
                className="flex  relative justify-between items-center  bg-neutral-300 py-[5px] rounded-md  shadow  dark:shadow mt-3 "
              >
                <div
                  className="flex justify-center items-center overflow-hidden
              "
                >
                  <img
                    src={`${e.link}`}
                    alt=""
                    className="w-14 h-14 object-cover ml-[5px] rounded-md shadow-2xl cursor-pointer backdrop-blur-sm"
                    onMouseEnter={(e) => {
                      settoggleImage(true);
                      handleImageToggle(e);
                    }}
                    onMouseLeave={(e) => {
                      settoggleImage(false);
                      handleImageToggle(e);
                    }}
                  />

                  <div className="m-4 whitespace-nowrap overflow-hidden text-ellipsis ">
                    {e.fileName}
                  </div>
                </div>
                {/**/}
                <div className="flex justify-center items-center flex-row mr-6 ">
                  <RiDeleteBin6Line
                    size={25}
                    className="mr-6 cursor-pointer  hover:text-neutral-600 active:text-neutral-950 transition-all duration-100"
                    onClick={() => {
                      handleDeleteButton(e.publicId);
                    }}
                  />
                  <RiFileCopyLine
                    size={25}
                    className="cursor-pointer  hover:text-neutral-600 active:text-neutral-950"
                    onClick={() => {
                      handleCopyLink(e.link, e.publicId);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-red-600">{linkMessage}</div>
      </div>
    </div>
  );
};

export default Home;
