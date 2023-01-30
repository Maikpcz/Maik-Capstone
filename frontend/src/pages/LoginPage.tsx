import React, {FormEvent, useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Box, Button, TextField} from "@mui/material";

export default function LoginPage(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [error, setErrors] = useState<string>("");

    const navigate = useNavigate()

    const login = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrors("");

        try {
            await axios.post("/api/app-users/login", null, {
                headers: {
                    "Authorization": "Basic " + window.btoa(
                        username + ":" + password
                    )
                }
            });

            navigate("/");
        } catch (e) {
            setErrors("Invalid username or password");
        }
    }, [navigate, password, username]);
    return(
        <>
        <Box component={"form"} onSubmit={login} sx={{flexDirection: 'column', alignItems: 'center', width: 1, justifyContent: "center", height: "100%", display: "flex", mt: 16}}>
            <h1>LoginPage</h1>

            {error && <div>{error}</div>}

                <div>
                    <TextField variant={"outlined"}
                    placeholder={"username"}
                    value={username}
                    name={"username"}
                    required={true}
                    onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <TextField variant={"outlined"}
                        placeholder={"password"}
                        type={"password"}
                        name={"passwod"}
                        value={password}
                        required={true}
                        onChange={e => setPassword(e.target.value)}
                        />
                </div>

                <Button variant={"contained"} type={"submit"}>Login</Button>

            <Button variant={"contained"} onClick={() => navigate("/signup")}>Sign up</Button>
        </Box>

        </>
    )
}