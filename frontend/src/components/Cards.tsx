import {Box, Button} from "@mui/material";

import React, {useEffect, useState} from "react";
import axios from "axios";
import Customers from "../models/Customers";
import {useNavigate} from "react-router-dom";
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid";


export default function Cards(){

    const [customers, setCustomers] = useState<Customers[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/customers");
            setCustomers(response.data);
        })();
    }, [])

    const columns: GridColDef[] = [
        {
            field: 'firstname',
            headerName: 'First name',
            width: 150,
            editable: true,
        },
        {
            field: 'surname',
            headerName: 'Last name',
            width: 150,
            editable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 110,
            editable: true,
        },
        {
            field: 'reason',
            headerName: 'Reason',
            width: 110,
            editable: true,
        },
        {
            field: 'credit',
            headerName: 'Credit',
            width: 110,
            editable: true,
        }
    ];

    return (
        <>
            <Box sx={{
                mt: 5,
            }}>

                <Button sx={{marginLeft: 61}} variant={"contained"} onClick={() => navigate("/add-customers")}>Add</Button>

            </Box>
                    <Box sx={{ height: 400 ,width: "65%"}}>
                        <DataGrid onRowClick={({id}) => navigate("/customers/" + id)}
                                  rows={customers}
                                  columns={columns}
                                  pageSize={5}
                                  rowsPerPageOptions={[5]}
                                  checkboxSelection
                                  disableSelectionOnClick
                                  experimentalFeatures={{ newEditingApi: true }}

                                  components={{
                                      Toolbar: GridToolbar
                                  }}
                        />
                    </Box>
        </>
    )
}