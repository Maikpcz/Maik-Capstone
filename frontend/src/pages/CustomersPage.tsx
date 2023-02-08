import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Customers from "../models/Customers";
import {Box} from "@mui/material";
import FileUpload from "../components/FileUpload";
import Toolbar from "../components/Toolbar";
import OldCustomerForm from "../components/OldCustomerForm";

export default function CustomersPage(){

    const [customer, setCustomer] = useState<Customers>({
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
            setCustomer(response.data)
        })();
    }, []);

    console.log(customer)
    return(
        <Box margin={"auto"}>
            <Toolbar/>

            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} sx={{mt: 1}}>
                <FileUpload/>
            </Box>

            <OldCustomerForm firstname={customer.firstname}
                             surname={customer.surname}
                             address={customer.address}
                             postalCode={customer.postalCode}
                             phonenumber={customer.phonenumber}
                             status={customer.status}
                             credit={customer.credit}
                             reason={customer.reason}
                             description={customer.description}
                             notes={customer.notes}/>
        </Box>
    )
}