import LogoutButton from "../components/LogoutButton";
import {useNavigate} from "react-router-dom";

export default function Homepage(){
    const navigate = useNavigate()

    return(
        <div>
            <h1>Homepage</h1>
            <LogoutButton/>
            <button onClick={event => navigate("/add-customers")}>Add</button>
        </div>
    )
}