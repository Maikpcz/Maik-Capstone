import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import CustomersPage from "./pages/CustomersPage";
import AddCustomersPage from "./pages/AddCustomersPage";
import Auth from "./components/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/signup"} element={<SignUpPage/>}/>
        <Route path={"/login"} element={<LoginPage/>}/>
        <Route path={"/"} element={<Auth><Homepage/></Auth>}/>
        <Route path={"/customers"} element={<Auth><CustomersPage/></Auth>}/>
        <Route path={"/add-customers"} element={<Auth><AddCustomersPage/></Auth>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
