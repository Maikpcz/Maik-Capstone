import {useNavigate} from "react-router-dom";
import React, {FormEvent, useCallback, useState} from "react";
import Customers from "../models/Customers";
import axios from "axios";
import {Box, Button, TextField} from "@mui/material";
import Toolbar from "../components/Toolbar";
import "./global.css";

export default function AddCustomersPage(){

    const navigate = useNavigate()

    const [credentials, setCredentials] = useState<Customers>({
        firstname: "",
        surname: "",
        address: "",
        postalCode: "",
        phonenumber: 0,
        status: "",
        credit: 0,
        reason: "",
        description: "",
        imagesId: "",
        notes: ""
    });

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setCredentials({...credentials, [name]: value});
        },
        [credentials, setCredentials]
    );
    const AddCustomer = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            await axios.post("/api/customers",credentials);
            navigate("/");
        },
        [credentials, navigate]
    );

    return(
        <Box margin={"auto"}>
            <Box>
                <Toolbar/>
            </Box>
            <Box component={"form"}
                 onSubmit={AddCustomer}
                 sx={{
                     display: "flex",
                     flexDirection: "column"}}>

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginRight: 54
                    }}>

                <TextField
                    margin={"normal"}
                    size={"small"}
                    variant={"outlined"}
                    label={"firstname"}
                    value={credentials.firstname}
                    required={true}
                    name={"firstname"}
                    onChange={handleChange}
                    />

                <TextField
                    margin={"normal"}
                    size={"small"}
                    variant={"outlined"}
                    label={"surname"}
                    value={credentials.surname}
                    required={true}
                    name={"surname"}
                    onChange={handleChange}
                />

                <TextField
                    margin={"normal"}
                    size={"small"}
                    variant={"outlined"}
                    label={"address"}
                    value={credentials.address}
                    required={true}
                    name={"address"}
                    onChange={handleChange}
                />

                <TextField
                    margin={"normal"}
                    size={"small"}
                    variant={"outlined"}
                    label={"postalCode"}
                    value={credentials.postalCode}
                    required={true}
                    name={"postalCode"}
                    onChange={handleChange}
                />

                <TextField
                    margin={"normal"}
                    size={"small"}
                    variant={"outlined"}
                    label={"phonenumber"}
                    value={credentials.phonenumber}
                    required={true}
                    name={"phonenumber"}
                    onChange={handleChange}
                />

                </Box>

                <Box display={"flex"}
                     justifyContent={"space-around"}
                >
                    <TextField
                    variant={"outlined"}
                    sx={{marginRight: 2}}
                    label={"credit"}
                    value={credentials.credit}
                    required={true}
                    name={"credit"}
                    onChange={handleChange}
                    />

                    <TextField
                    variant={"outlined"}
                    label={"reason"}
                    value={credentials.reason}
                    required={true}
                    name={"reason"}
                    onChange={handleChange}
                    />
                </Box>
                <Box display={"flex"}
                     flexDirection={"column"}
                     alignItems={"center"}>
                    <TextField
                    sx={{mt: 1,width: 630}}
                    variant={"outlined"}
                    multiline={true}
                    rows={4}
                    label={"description"}
                    value={credentials.description}
                    name={"description"}
                    onChange={handleChange}
                    />
                </Box>

                <Box display={"flex"}
                     flexDirection={"column"}
                     alignItems={"center"}>

                    <TextField
                    sx={{mt: 1, width: 630}}
                    variant={"outlined"}
                    multiline={true}
                    rows={4}
                    label={"notes"}
                    value={credentials.notes}
                    name={"notes"}
                    onChange={handleChange}
                    />
                </Box>
                <Box display={"flex"} justifyContent={"center"} mt={1}>
                <Button variant={"contained"} type={"submit"}>Add Customer</Button>
                </Box>
            </Box>
        </Box>
    )
}