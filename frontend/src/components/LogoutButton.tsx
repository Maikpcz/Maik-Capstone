import {useNavigate} from "react-router-dom";
import {useCallback} from "react";
import axios from "axios";

export default  function LogoutButton(){
    const navigate = useNavigate();

    const logout = useCallback(async () =>{
        await axios.get("api/app-users/logout");
        navigate("/login")
        window.document.cookie ="";
        window.localStorage.clear();
    },[navigate]
    )

    return(
        <button onClick={logout}>logout</button>
    )
}