import {useNavigate, useParams} from "react-router-dom";
import React, {FormEvent, useCallback, useEffect, useState} from "react";
import axios from "axios";
import Customers from "../models/Customers";
import {Box, Button, TextField, Typography} from "@mui/material";
import Toolbar from "../components/ToolbarComponent";
import FileMetadata from "../models/FileMetadata";

export default function CustomersPage() {

    const navigate = useNavigate()

    const [file, setFile] = React.useState<File | null>(null);

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const [picture, setPicture] = useState<string>()

    const [photo, setPhoto] = useState<FileMetadata>({
        id: "",
        name: "",
        contentType: "",
        size: 0,
        createdBy: ""
    })


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
        notes: "",
        imagesId: ""
    });

    const {id} = useParams();

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setCustomer({...customer, [name]: value});
        },
        [customer, setCustomer]
    );

    useEffect(() => {
        if (photo.id != null) {
            customer.imagesId = photo.id
        }
    }, [photo])


    const EditCustomer = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            await axios.put("/api/customers", customer);
            navigate("/");
        },
        [customer, navigate]
    );

    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/customers/" + id);
            setCustomer(response.data)
        })();
    }, [id]);


    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/files/" + customer.imagesId, {
                responseType: "blob"
            })
            const urlBla = window.URL.createObjectURL(new Blob([response.data]));
            setPicture(urlBla)
            console.log("hier wird das photo geladen")
        })();
    }, [customer.imagesId]);


    async function ChangeCustomerStatusAssumed() {
        await axios.post("/api/customers/status/assumed", customer);
    }

    async function ChangeCustomerStatusDeclined() {
        await axios.post("/api/customers/status/declined", customer);
    }

    async function deleteCustomer() {
        await axios.delete("/api/customers/" + customer.id)
    }

    return (
        <>
            <Box margin={"auto"}>
                <Toolbar/>
                <input
                    ref={fileInputRef}
                    type={"file"}
                    style={{display: "none"}}
                    onChange={(e) => {
                        // FILE CHANGE
                        if (!e.target.files || e.target.files.length < 1) {
                            setFile(null);
                            return;
                        }
                        setFile(e.target.files[0]);
                        setPicture(URL.createObjectURL(e.target.files[0]))

                    }}
                    accept={"image/png"}/>

                <Box component={"form"} onSubmit={EditCustomer} sx={{
                    display: "flex",
                    flexDirection: "column",
                    position: "static"}}>

                <Box display={"flex"}
                     flexDirection={"row"}
                     justifyContent={"space-around"}
                >
                    <Box display={"flex"}
                         flexDirection={"column"}
                         justifyContent={"space-around"}>
                        <TextField
                            variant={"outlined"}
                            size={"small"}
                            label={"firstname"}
                            margin={"normal"}
                            value={customer.firstname}
                            required={true}
                            name={"firstname"}
                            onChange={handleChange}/>

                        <TextField
                            variant={"outlined"}
                            size={"small"}
                            margin={"normal"}
                            label={"surname"}
                            value={customer.surname}
                            required={true}
                            name={"surname"}
                            onChange={handleChange}/>

                        <TextField
                            variant={"outlined"}
                            size={"small"}
                            label={"address"}
                            margin={"normal"}
                            value={customer.address}
                            required={true}
                            name={"address"}
                            onChange={handleChange}/>


                        <TextField
                            variant={"outlined"}
                            size={"small"}
                            margin={"normal"}
                            label={customer.postalCode}
                            value={customer.postalCode}
                            required={true}
                            name={"postalCode"}
                            onChange={handleChange}/>

                        <TextField
                            variant={"outlined"}
                            size={"small"}
                            label={"phonenumber"}
                            margin={"normal"}
                            value={customer.phonenumber}
                            required={true}
                            name={"phonenumber"}
                            onChange={handleChange}/>
                    </Box>
                    <Box sx={{
                        border: "solid",
                        mt: 2
                    }}
                         width={200}
                         height={200}
                    >
                        <img style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain"
                        }} src={picture} alt={picture}/>

                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>

                            <Button sx={{mt: 1}} variant={"contained"} onClick={async (e) => {
                                // FILE UPLOAD
                                e.preventDefault();

                                if (file) {
                                    const formData = new FormData();
                                    formData.append("file", file);

                                    const res = await axios.post("/api/files", formData);
                                    setPhoto(res.data);
                                    setPicture("/api/files/" + res.data.id)
                                    console.log("Hier ist der Post")
                                }
                            }}>Submit</Button>

                            <Button sx={{mt: 1, marginBottom: 1}} variant={"contained"} onClick={() => {
                                fileInputRef.current?.click();}}>save</Button>
                        </Box>


                    </Box>
                </Box>

                <Box display={"flex"}
                     justifyContent={"space-evenly"}>

                    <TextField
                        sx={{marginLeft: 6}}
                        variant={"outlined"}
                        label={"credit"}
                        margin={"normal"}
                        value={customer.credit}
                        required={true}
                        name={"credit"}
                        onChange={handleChange}/>

                    <Typography mt={4}>Status = {customer.status}</Typography>

                    <TextField
                        sx={{marginRight: 6}}
                        variant={"outlined"}
                        label={"reason"}
                        margin={"normal"}
                        value={customer.reason}
                        required={true}
                        name={"reason"}
                        onChange={handleChange}/>

                </Box>

                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                >

                    <TextField
                        sx={{width: 630}}
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
                    flexDirection={"column"}
                    alignItems={"center"}
                >

                    <TextField
                        sx={{width: 630}}
                        variant={"outlined"}
                        multiline={true}
                        rows={4}
                        margin={"normal"}
                        label={"notes"}
                        value={customer.notes}
                        name={"notes"}
                        onChange={handleChange}/>

                </Box>

                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                }}>

                    <Button variant={"contained"} sx={{marginRight: 5}} type={"submit"}>Edit Customer</Button>

                    <Button variant={"contained"} sx={{marginRight: 5}} onClick={() => {
                        ChangeCustomerStatusAssumed().then(() => navigate("/"));
                    }}>Assumed</Button>

                    <Button
                        variant={"contained"} sx={{marginRight: 5}} onClick={() => {
                        ChangeCustomerStatusDeclined().then(() => navigate("/"));
                    }}>Declined</Button>

                    <Button variant={"contained"} sx={{marginRight: 5}} onClick={() => {
                        deleteCustomer().then(() => navigate("/"));
                    }}>Delete</Button>
                </Box>
            </Box>
            </Box>
        </>

    )
}