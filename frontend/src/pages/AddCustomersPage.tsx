import {useNavigate} from "react-router-dom";
import React, {FormEvent, useCallback, useState} from "react";
import Customers from "../models/Customers";
import axios from "axios";
import {Box, Button, TextField} from "@mui/material";

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
        <div>
            <h1>AddCustomersPage</h1>
            <Box component={"form"}
                 onSubmit={AddCustomer}
                 sx={{display: "flex",
                     flexDirection: "column"}}>

                <Box sx={{border: "solid",
                    display: "inline-grid",
                    marginBottom: 1}}>

                <TextField variant={"standard"} size={"small"}
                    placeholder={"firstname"}
                    value={credentials.firstname}
                    required={true}
                    name={"firstname"}
                    onChange={handleChange}
                    />

                <TextField variant={"standard"}
                placeholder={"surname"}
                value={credentials.surname}
                required={true}
                name={"surname"}
                onChange={handleChange}
                />

                <TextField variant={"standard"}
                    placeholder={"address"}
                    value={credentials.address}
                    required={true}
                    name={"address"}
                    onChange={handleChange}
                />

                <TextField variant={"standard"}
                placeholder={"postalCode"}
                value={credentials.postalCode}
                name={"postalCode"}
                onChange={handleChange}
                />

                    <TextField variant={"standard"}
                    placeholder={"phonenumber"}
                    value={credentials.phonenumber}
                    required={true}
                    name={"phonenumber"}
                    onChange={handleChange}
                    />

                </Box>

                    <TextField variant={"standard"}
                        placeholder={"credit"}
                        value={credentials.credit}
                        required={true}
                        name={"credit"}
                        onChange={handleChange}
                    />
                    <TextField variant={"standard"}
                    placeholder={"reason"}
                    value={credentials.reason}
                    required={true}
                    name={"reason"}
                    onChange={handleChange}
                    />


                    <TextField variant={"standard"} multiline={true}
                               rows={4}
                    placeholder={"description"}
                    value={credentials.description}
                    name={"description"}
                    onChange={handleChange}
                    />


                    <TextField variant={"standard"} multiline={true}
                               rows={4}
                    placeholder={"notes"}
                    value={credentials.notes}
                    name={"notes"}
                    onChange={handleChange}
                    />

                <Button variant={"contained"} type={"submit"}>Add Customer</Button>

                <Button variant={"contained"} onClick={() => navigate("/")}>Homepage</Button>

            </Box>
        </div>
    )
}