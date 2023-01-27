import React, {FormEvent, useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

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
        <div className={"LoginPage"}>
            <h1>LoginPage</h1>

            {error && <div>{error}</div>}

            <form onSubmit={login}>
                <div>
                    <input
                    placeholder={"username"}
                    value={username}
                    name={"username"}
                    onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <input
                    placeholder={"password"}
                    type={"password"}
                    name={"passwod"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                <button>Login</button>
                </div>
            </form>
        </div>
    )
}