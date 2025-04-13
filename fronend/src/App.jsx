import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [CloudUsername, setcloudUsername] = useState("");
  const [apiKey, setapiKey] = useState("");
  const [apiSecret, setapiSecret] = useState("");
  const [password, setpassword] = useState("");
  const [image, setimage] = useState(null);

  const [error, seterror] = useState("");

  const handleSubmit = (e) => {
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
        //headers tell server content is multipart/form-data not normal json - for image upload
      })
      .then((response) => {
        console.log(response.data.message);
        seterror(response.data.message);
      })
      .catch((err) => {
        console.log(err.response.data);
        seterror(err.response.data.message);
      });
  };

  return (
    <>
      <h1>{error}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="cloudUsername"
          onChange={(e) => {
            setcloudUsername(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Api Key"
          onChange={(e) => {
            setapiKey(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Api Secret"
          onChange={(e) => {
            setapiSecret(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <input
          type="file"
          placeholder="Image"
          onChange={(e) => {
            setimage(e.target.files[0]);
          }}
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default App;
