import {useNavigate, useParams} from "react-router-dom";
import React, {FormEvent, useCallback, useEffect, useState} from "react";
import axios from "axios";
import Customers from "../models/Customers";
import {Box, Button, TextField} from "@mui/material";
import FileUpload from "../components/FileUpload";
import Toolbar from "../components/Toolbar";

export default function CustomersPage(){

    const navigate = useNavigate()

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

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setCustemor({...custemor, [name]: value});
        },
        [custemor, setCustemor]
    );
    const EditCustomer = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            await axios.post("/api/customers",custemor);
            navigate("/");
        },
        [custemor, navigate]
    );

    async function ChangeCustomerStatusAssumed() {
        await axios.post("/api/customers/status/assumed", custemor);
    }

    async function ChangeCustomerStatusDeclined() {
        await axios.post("/api/customers/status/declined", custemor);
    }

    async function deleteCustomer(){
        await axios.delete("/api/customers/" + custemor.id)
    }

    console.log(custemor)
    return(
        <Box margin={"auto"}>
            <Toolbar/>

            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} sx={{mt: 1}}>
                <FileUpload/>
            </Box>

            <Box component={"form"}
                 onSubmit={EditCustomer}
                 sx=
                     {{display: "flex",
                     flexDirection: "column",}}>
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-around"} border={"solid"}>
                    <TextField
                        variant={"outlined"}
                        label={"firstname"}
                        margin={"normal"}
                        value={custemor.firstname}
                        required={true}
                        name={"firstname"}
                        onChange={handleChange}
                    />

                    <TextField
                        variant={"outlined"}
                        margin={"normal"}
                        label={"surname"}
                        value={custemor.surname}
                        required={true}
                        name={"surname"}
                        onChange={handleChange}
                    />

                    <TextField
                        variant={"outlined"}
                        label={"address"}
                        margin={"normal"}
                        value={custemor.address}
                        required={true}
                        name={"address"}
                        onChange={handleChange}
                    />

                    <TextField
                        variant={"outlined"}
                        margin={"normal"}
                        label={custemor.postalCode}
                        value={custemor.postalCode}
                        name={"postalCode"}
                        onChange={handleChange}
                    />

                    <TextField
                        variant={"outlined"}
                        label={"phonenumber"}
                        margin={"normal"}
                        value={custemor.phonenumber}
                        required={true}
                        name={"phonenumber"}
                        onChange={handleChange}
                    />
                    </Box>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} >
                    <TextField
                    variant={"outlined"}
                    label={"credit"}
                    margin={"normal"}
                    value={custemor.credit}
                    required={true}
                    name={"credit"}
                    onChange={handleChange}
                    />
                    <TextField
                    variant={"outlined"}
                    label={"reason"}
                    margin={"normal"}
                    value={custemor.reason}
                    required={true}
                    name={"reason"}
                    onChange={handleChange}
                />
                </Box>

                <Box display={"flex"}
                     flexDirection={"column"}>

                <TextField
                    variant={"outlined"}
                    multiline={true}
                    rows={4}
                    margin={"normal"}
                    label={"description"}
                    value={custemor.description}
                    name={"description"}
                    onChange={handleChange}
                />
                </Box>

                <Box
                    display={"flex"}
                     flexDirection={"column"}>
                <TextField variant={"outlined"}
                           multiline={true}
                           rows={4}
                           margin={"normal"}
                           label={"notes"}
                           value={custemor.notes}
                           name={"notes"}
                           onChange={handleChange}
                />
                </Box>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Button variant={"contained"} type={"submit"}>Edit Customer</Button>

            <Button variant={"contained"} onClick={() =>{
                deleteCustomer().then(() => navigate("/"));
            }}>Delete</Button>

            <Button variant={"contained"} onClick={() => {
                ChangeCustomerStatusAssumed().then(() => navigate("/"))
            }}>Assumed</Button>

            <Button
                variant={"contained"} onClick={() => {
                ChangeCustomerStatusDeclined().then(() => navigate("/"))
            }}>Declined</Button>
                </Box>
        </Box>
    )
}