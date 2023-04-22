import React from "react";
import { BrowserRouter as BRouter, Route, Routes } from "react-router-dom";
import Login from './Screen/Login';
import Home from './Screen/Home';
import Register from './Screen/Register';
import Profile from "./Screen/Profile";
import Guiline from "./Screen/Guideline";

function App() {
  return (
    <BRouter>
      <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/guidline" element={<Guiline />} />
      <Route exact path="/cusguidline" element={<CusGuideline />} />
      </Routes>
    </BRouter>
  );
}

export default App;
