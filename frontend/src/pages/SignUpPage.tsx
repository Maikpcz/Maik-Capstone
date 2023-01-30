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
        <Box sx={{flexDirection: 'column', alignItems: 'center', width: 1, justifyContent: "center", height: "100%", display: "flex", mt: 16}} className={"SignUpPage"}>
            <h1 className={"title"}>SignUp</h1>

            {error && <div>{error}</div>}
            <Box sx={{display: "flex"}} maxWidth={"sm"}>
            <form onSubmit={signUp}>
            <TextField variant={"outlined"}
                placeholder={"username"}
                value={credentials.username}
                name={"username"}
                onChange={handleChange}
            />


                <div>
                    <TextField variant={"outlined"}
                    placeholder={"password"}
                    type={"password"}
                    name={"password"}
                    onChange={handleChange}
                    />
                </div>
                <Button variant={"contained"} size={"medium"}>Sign Up</Button>
            </form>
            </Box>
        </Box>
    )
}