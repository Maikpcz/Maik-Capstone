import React, {FormEvent, useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

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
        <div className={"SignUpPage"}>
            <h1>SignUp</h1>

            {error && <div>{error}</div>}

            <form onSubmit={signUp}>
                <div>
                    <input
                    placeholder={"username"}
                    value={credentials.username}
                    name={"username"}
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                    placeholder={"password"}
                    type={"password"}
                    name={"password"}
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <button>Sign Up</button>
                </div>
            </form>
        </div>
    )
}