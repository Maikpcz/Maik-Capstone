import {Box, Button, TextField, Typography} from "@mui/material";
import React, {FormEvent, useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Customers from "../models/Customers";

export default function OldCustomerForm(Customer : Customers){
    const navigate = useNavigate()

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

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setCustomer({...customer, [name]: value});
        },
        [customer, setCustomer]
    );
    const EditCustomer = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            await axios.put("/api/customers",customer);
            navigate("/");
        },
        [customer, navigate]
    );

    async function ChangeCustomerStatusAssumed() {
        await axios.post("/api/customers/status/assumed", customer);
    }
    async function ChangeCustomerStatusDeclined() {
        await axios.post("/api/customers/status/declined", customer);
    }

    async function deleteCustomer(){
        await axios.delete("/api/customers/" + customer.id)
    }
    return(
        <>
            <Box component={"form"}
             onSubmit={EditCustomer}
             sx=
                 {{display: "flex",
                 flexDirection: "column",}}>

                <Box display={"flex"}
                     flexDirection={"row"}
                     justifyContent={"space-around"}
                     border={"solid"}>

                    <TextField
                    variant={"outlined"}
                    label={"firstname"}
                    margin={"normal"}
                    value={customer.firstname}
                    required={true}
                    name={"firstname"}
                    onChange={handleChange}
                    />


                    <TextField
                    variant={"outlined"}
                    margin={"normal"}
                    label={"surname"}
                    value={customer.surname}
                    required={true}
                    name={"surname"}
                    onChange={handleChange}
                    />


                    <TextField
                    variant={"outlined"}
                    label={"address"}
                    margin={"normal"}
                    value={customer.address}
                    required={true}
                    name={"address"}
                    onChange={handleChange}
                    />


                    <TextField
                    variant={"outlined"}
                    margin={"normal"}
                    label={customer.postalCode}
                    value={customer.postalCode}
                    name={"postalCode"}
                    onChange={handleChange}
                    />


                    <TextField
                    variant={"outlined"}
                    label={"phonenumber"}
                    margin={"normal"}
                    value={customer.phonenumber}
                    required={true}
                    name={"phonenumber"}
                    onChange={handleChange}
                    />

                </Box>


            <Box display={"flex"}
                 justifyContent={"space-evenly"} >

                <TextField
                variant={"outlined"}
                label={"credit"}
                margin={"normal"}
                value={customer.credit}
                required={true}
                name={"credit"}
                onChange={handleChange}
                />

                <Typography mt={4}>Status = {customer.status}</Typography>

                <TextField
                variant={"outlined"}
                label={"reason"}
                margin={"normal"}
                value={customer.reason}
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
                value={customer.description}
                name={"description"}
                onChange={handleChange}/>

            </Box>

            <Box
                display={"flex"}
                flexDirection={"column"}>

                <TextField variant={"outlined"}
                multiline={true}
                rows={4}
                margin={"normal"}
                label={"notes"}
                value={customer.notes}
                name={"notes"}
                onChange={handleChange}
                />

            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly"
            }}>

            <Button variant={"contained"} type={"submit"}>Edit Customer</Button>

            <Button variant={"contained"} onClick={() => {
            ChangeCustomerStatusAssumed().then(() => navigate("/"))
            }}>Assumed</Button>

            <Button
            variant={"contained"} onClick={() => {
            ChangeCustomerStatusDeclined().then(() => navigate("/"))
            }}>Declined</Button>

            <Button variant={"contained"} onClick={() =>{
            deleteCustomer().then(() => navigate("/"));
            }}>Delete</Button>
            </Box>
        </Box>
        </>
    )
}