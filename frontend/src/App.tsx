import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import CustomersPage from "./pages/CustomersPage";
import AddCustomersPage from "./pages/AddCustomersPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/signup"} element={<SignUpPage/>}/>
        <Route path={"/login"} element={<LoginPage/>}/>
        <Route path={"/"} element={<Homepage/>}/>
        <Route path={"/customers"} element={<CustomersPage/>}/>
        <Route path={"/add-customers"} element={<AddCustomersPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
