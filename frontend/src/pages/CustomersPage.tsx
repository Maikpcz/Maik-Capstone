import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Customers from "../models/Customers";

export default function CustomersPage(){

    const navigate = useNavigate()

    const [cust, setCust] = useState<Customers>({
        id: "",
        firstname: "",
        surname: "",
        address: "",
        postalCode: "",
        phonenumber: 0,
        status: "",
        credit: 0,
        reason: "",
        description: "",
        notes: ""
    });

    const {id} = useParams();

    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/customers/" + id);
            setCust(response.data)
        })();
    }, []);

    async function deleteCustomer(){
        const response = await
            axios.delete("/api/customers/" + cust.id)
    }

    console.log(cust)
    return(
        <div>
            <h1>CustomerPage</h1>
            <button onClick={() => navigate("/")}>Homepage</button>
            <button onClick={() =>{
                deleteCustomer().then(() => navigate("/"));
            }}></button>
        </div>
    )
}