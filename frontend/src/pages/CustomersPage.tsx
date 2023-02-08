import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Customers from "../models/Customers";
import {Box} from "@mui/material";
import FileUpload from "../components/FileUpload";
import Toolbar from "../components/Toolbar";
import OldCustomerForm from "../components/OldCustomerForm";

export default function CustomersPage(){

    const [custemor, setCustemor] = useState<Customers>({
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
            setCustemor(response.data)
        })();
    }, []);


    console.log(custemor)
    return(
        <Box margin={"auto"}>
            <Toolbar/>

            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} sx={{mt: 1}}>
                <FileUpload/>
            </Box>

            <OldCustomerForm firstname={custemor.firstname}
                             surname={custemor.surname}
                             address={custemor.address}
                             postalCode={custemor.postalCode}
                             phonenumber={custemor.phonenumber}
                             status={custemor.status}
                             credit={custemor.credit}
                             reason={custemor.reason}
                             description={custemor.description}
                             notes={custemor.notes}/>
        </Box>
    )
}