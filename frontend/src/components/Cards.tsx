import {Box, Button, Card, CardActions, CardContent, Grid, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import Customers from "../models/Customers";
import {useNavigate} from "react-router-dom";

export default function Cards(){

    const [customer, setCustomer] = useState<Customers[]>([])

    const [nameToFilter, setNameToFilter] = useState<string>("")

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/customers");
            setCustomer(response.data);
        })();
    }, [])

    const filterList = customer.filter((customer) =>
        customer.surname.includes(nameToFilter))



    return (
        <>
            <Box sx={{
                mt: 5,
            }}>
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>

                    <TextField sx={{marginLeft: 1}} label={"surname"} onChange={(e) => setNameToFilter(e.target.value)}/>

                    <Button variant={"contained"} onClick={() => navigate("/add-customers")}>Add</Button>
                </Box>
                {filterList.map(customer => {
                    return (
                        <CardContent
                            key={customer.id} sx={{
                            display: 'flex',
                            columnGap: 5,
                            rowGap: 1,
                            mt: 3,
                            marginBottom: 1,
                            marginLeft: 1,
                            border: "solid",
                            marginRight: 1,
                            minWidth: 200,
                            alignItems: "stretch"
                        }}
                            onClick={() => navigate("/customers/" + customer.id)}>

                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{customer.firstname}</Typography>

                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{customer.surname}</Typography>

                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{customer.status}</Typography>

                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{customer.credit}</Typography>

                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> {customer.reason}</Typography>

                    </CardContent>
                    )
                })}
            </Box>

        </>
    )
}