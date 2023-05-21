import React from "react";
import { BrowserRouter as BRouter, Route, Routes } from "react-router-dom";
import Login from './Screen/Login';
import Home from './Screen/Home';
import Register from './Screen/Register';
import License from "./Screen/License";
import Reports from "./Screen/Report";
import Settings from "./Screen/Settings";
import Vendorhome from "./ScreenVendor/Vendorhome";
import Invntory from "./ScreenVendor/Inventory";
import Sale from "./ScreenVendor/Sales";
import Chartnew from "./ScreenVendor/Chartnew";
import Products from "./ScreenVendor/Products";
import Support from "./ScreenVendor/Support";




function App() {
  return (
    <BRouter>
      <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/license" element={<License />} />
      <Route exact path="/report" element={<Reports />} />
      <Route exact path="/setting" element={<Settings />} />
      <Route exact path="/vhome" element={<Vendorhome />} />
      <Route exact path="/inventory" element={<Invntory />} />
      <Route exact path="/sales" element={<Sale />} />
      <Route exact path="/c" element={<Chartnew />} />
      <Route exact path="/products" element={<Products />} />
      <Route exact path="/support" element={<Support />} />

      </Routes>
    </BRouter>
  );
}

export default App;
