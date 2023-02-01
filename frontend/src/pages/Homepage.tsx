import LogoutButton from "../components/LogoutButton";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Customers from "../models/Customers";
import {Box, Button, TextField} from "@mui/material";

export default function Homepage(){

    const navigate = useNavigate()

    const [customer, setCustomer] = useState<Customers[]>([])

    const [nameToFilter, setNameToFilter]= useState<string>("")

    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/customers");
            setCustomer(response.data);
        })();
    }, [])

    const filterList = customer.filter((customer) =>
    customer.surname.includes(nameToFilter))

    return(
        <>
        <Box sx={{
            flexDirection: 'column',
            alignItems: 'center',
            width: 1,
            justifyContent: "center",
            height: "100%",
            mt: 16,
            display: 'inline-grid',
            border: 'solid',
            justifyItems: "center"
        }}>
            <h1>Homepage</h1>
            <Button variant={"contained"} onClick={() => navigate("/add-customers")}>Add</Button>
            <div><TextField onChange={(e) => setNameToFilter(e.target.value)}/>
                {filterList.map(customer => {
                return(
                    <Box key={customer.id} sx={{
                        display: 'flex',
                        columnGap: 5,
                        rowGap: 1,
                        mt: 5,
                        marginBottom: 1,
                        marginLeft: 1
                        , border: "solid"
                        ,marginRight: 1
                    }}
                         onClick={() => navigate("/customers/" + customer.id)}>
                        <div>{customer.firstname}</div>
                        <div>{customer.surname}</div>
                        <div>{customer.status}</div>
                        <div>{customer.credit}</div>
                        <div>{customer.reason}</div>
                    </Box>
                )
            })}
            </div>
        </Box>
    <LogoutButton/>
    </>
    )
}