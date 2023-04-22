import React from "react";
import { BrowserRouter as BRouter, Route, Routes } from "react-router-dom";
import Login from './Screen/Login';
import Home from './Screen/Home';
import Register from './Screen/Register';
import License from "./Screen/License";
import Settings from "./Screen/Settings";
import Report from "./Screen/Report";
import Profile from "./Screen/Profile";
import Guiline from "./Screen/Guideline";
import Post from "./Screen/Post";
import CusGuideline from "./Screen/CusGuideline";





function App() {
  return (
    <BRouter>
      <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/license" element={<License />} />
      <Route exact path="/setting" element={<Settings />} />
      <Route exact path="/report" element={<Report />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/guidline" element={<Guiline />} />
      <Route exact path="/post" element={<Post />} />
      <Route exact path="/cusguidline" element={<CusGuideline />} />

      </Routes>
    </BRouter>
  );
}

export default App;
