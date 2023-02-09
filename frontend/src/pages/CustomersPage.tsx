import {useNavigate, useParams} from "react-router-dom";
import React, {FormEvent, useCallback, useEffect, useState} from "react";
import axios from "axios";
import Customers from "../models/Customers";
import {Box, Button, TextField, Typography} from "@mui/material";
import Toolbar from "../components/Toolbar";
import FileMetadata from "../models/FileMetadata";

export default function CustomersPage(){

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

    const [imgPreview, setImgPreview] = React.useState<string | null>("/api/files/" + customer.imagesId);

    const EditCustomer = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            await axios.put("/api/customers",customer);
            navigate("/");
        },
        [customer, navigate]
    );

    useEffect( () => {
        if (photo.id != null) {
            customer.imagesId = photo.id
        }
    }, [photo.id])

    async function getPicture(){
        const response = await axios.get("/api/files/" + customer.imagesId, {
            responseType: "blob"
        })
        const urlBla = window.URL.createObjectURL(new Blob([response.data]));

        setPicture(urlBla)
    }

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
        <Box margin={"auto"}>
            <Toolbar/>

            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} sx={{mt: 1}}>
                {imgPreview && (
                    <img
                        src={imgPreview}
                        alt={"preview"}
                    />
                )}

                <Box sx={{
                    border: "solid"}}
                     width={200}
                     height={200}
                >
                    <img style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain"
                    }} src={picture} alt={picture}/>
                </Box>

                <form onSubmit={async (e) => {
                    // FILE UPLOAD
                    e.preventDefault();

                    if (file) {
                        const formData = new FormData();
                        formData.append("file", file);

                        const res = await axios.post("/api/files", formData);
                        setPhoto(res.data)
                        console.log(photo.id ,"photo id before")
                        console.log(customer.imagesId, " images id before")

                        alert(JSON.stringify(res.data, null, 2));

                    }
                    if (photo.id!= null)
                        customer.imagesId = photo.id

                }}>
                    <input
                        ref={fileInputRef}
                        type={"file"}
                        style={{ display: "none"}}
                        onChange={(e) => {
                            // FILE CHANGE
                            if (!e.target.files || e.target.files.length < 1) {
                                setFile(null);
                                setImgPreview(null);
                                return;
                            }

                            setFile(e.target.files[0]);

                        }}
                        accept={"image/png"}
                    />
                    <Button sx={{mt: 1}} variant={"contained"} type={"submit"} onClick={getPicture}>Submit</Button>
                </form>

                <Button sx={{mt: 1 , marginBottom: 1}} variant={"contained"} type={"submit"} onClick={() =>
                {fileInputRef.current?.click()}}>save</Button>

            </Box>

            <Box component={"form"}
                 onSubmit={EditCustomer}
                 sx=
                     {{
                         display: "flex",
                         flexDirection: "column",
                     }}>

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
        </Box>
    )
}