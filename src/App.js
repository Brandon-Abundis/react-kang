import React from "react";
import Layout from "./page/Layout";
import Login from "./page/Login";
import MoreInfo from "./page/MoreInfo";
import Signup from "./page/Signup";
import Profile from "./page/Profile";
import Home from "./page/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(){
  return (
    <BrowserRouter>
      <Routes>
          <Route path = "/" element = { <Layout></Layout> }>
            <Route index element = { <Login></Login> }></Route>
            <Route path = "/moreinfo" element = { <MoreInfo></MoreInfo> }></Route>
            <Route path = "/signup" element = { <Signup></Signup> } ></Route>
            {/* <Route path = "/profile" element = { <Profile></Profile> }></Route> */}
            <Route path = "/home" element = { <Home></Home> }></Route>
          </Route>
          <Route path="/home" element={<Home></Home>}>
             <Route path = "./profile" element = { <Profile></Profile> }></Route>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App