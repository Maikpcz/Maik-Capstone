import LogoutButton from "../components/LogoutButton";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Customers from "../models/Customers";

export default function Homepage(){

    const navigate = useNavigate()

    const [customer, setCustomer] = useState<Customers[]>([])

    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/customers");
            setCustomer(response.data);
        })();
    }, []);


    return(
        <div>
            <h1>Homepage</h1>
            <LogoutButton/>
            <div><button onClick={() => navigate("/add-customers")}>Add</button>
            {customer.map(customer => {
                return(
                    <div className={"CustomerCard"}>
                        <div>{customer.firstname}</div>
                        <div>{customer.surname}</div>
                        <div>{customer.credit}</div>
                        <div>{customer.reason}</div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}