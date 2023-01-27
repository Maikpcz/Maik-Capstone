import {useNavigate} from "react-router-dom";

export default function CustomersPage(){

    const navigate = useNavigate()
    return(
        <div>
            <h1>CustomerPage</h1>
            <button onClick={event => navigate("/")}>Homepage</button>
        </div>
    )
}