import React from "react";
import { BrowserRouter as BRouter, Route, Routes } from "react-router-dom";
import Login from './Screen/Login';



function App() {
  return (
    <BRouter>
      <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/home" element={<Home />} />

      </Routes>
    </BRouter>
  );
}

export default App;
