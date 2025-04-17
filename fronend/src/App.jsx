import SignUp from "./components/signUp.jsx";
import SignIn from "./components/signIn.jsx";
import Home from "./components/home.jsx";
import ForgetPassword from "./components/forgetPassword.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
