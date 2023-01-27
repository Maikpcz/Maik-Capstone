import {useNavigate} from "react-router-dom";

export default function AddCustomersPage(){

    const navigate = useNavigate()

    return(
        <div>
            <h1>AddCustomersPage</h1>
            <button onClick={event => navigate("/")}>Homepage</button>
        </div>
    )
}