import React, {FormEvent, useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Box, Button, TextField} from "@mui/material";

export default function SignUpPage(){

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("")

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setCredentials({...credentials, [name]: value});
        },
        [credentials, setCredentials]
    );

    const navigate = useNavigate()

    const signUp = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            setError("");

            try {
                await axios.post("/api/app-users", credentials);
                navigate("/login");
            } catch (e) {
                setError("Username is Already exist");
            }
        },
        [credentials, navigate]
    );



    return(
        <Box component={"form"}
             onSubmit={signUp}
             sx={{
                 flexDirection: 'column',
                 alignItems: 'center',
                 justifyContent: "center",
                 display: "flex",
                 mt: 16,
        }}>

            <h1>SignUp</h1>

            {error && <div>{error}</div>}

            <TextField variant={"outlined"}
                placeholder={"username"}
                value={credentials.username}
                name={"username"}
                onChange={handleChange}
            />
            <TextField
                margin={"dense"}
                variant={"outlined"}
                 placeholder={"password"}
                 type={"password"}
                 name={"password"}
                 onChange={handleChange}
                 />

            <Button sx={{mt: 1, marginBottom: 1}} variant={"contained"} size={"medium"} type={"submit"}>Sign Up</Button>
        </Box>
    )
}