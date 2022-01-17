import React from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Authenticate from "./pages/Authenticate/Authenticate";
import Dashboard from "./pages/Dashboard/Dashboard";
import StoreHouse from "./pages/StoreHouse/StoreHouse";
import Resources from "./pages/Resources/Resources";
import Contact from "./pages/Contact/Contact";

//import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/authenticate" element={<Authenticate />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/storehouse" element={<StoreHouse />}></Route>
          <Route path="/resources" element={<Resources />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
