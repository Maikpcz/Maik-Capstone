import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


export default function Auth(
    {
        children,
    }: {
        children: React.ReactNode
    }
){
   const [isAuthenticated, setAuthenticated] = React.useState(false);

   const navigate = useNavigate();

   useEffect(() => {
       (async () => {
           try {
               await axios.get("/api/app-users/me");
               setAuthenticated(true)
           }catch (e){
               setAuthenticated(false);
               navigate("/login");
           }
       })();
   },[navigate])
    return(
        <>
            {isAuthenticated && children}
        </>
    );
}