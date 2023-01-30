import {useNavigate} from "react-router-dom";
import React, {FormEvent, useCallback, useState} from "react";
import Customers from "../models/Customers";
import axios from "axios";

export default function AddCustomersPage(){

    const navigate = useNavigate()

    const [credentials, setCredentials] = useState<Customers>({
        firstname: "",
        surname: "",
        address: "",
        postalCode: "",
        phonenumber: 0,
        status: "",
        credit: 0,
        reason: "",
        description: "",
        notes: ""
    });

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setCredentials({...credentials, [name]: value});
        },
        [credentials, setCredentials]
    );
    const AddCustomer = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            await axios.post("/api/customers",credentials);
            navigate("/");
        },
        [credentials, navigate]
    );

    return(
        <div>
            <h1>AddCustomersPage</h1>
            <form onSubmit={AddCustomer}>
                <div className={"KeyData"}>
                <input
                    placeholder={"firstname"}
                    value={credentials.firstname}
                    required={true}
                    name={"firstname"}
                    onChange={handleChange}
                    />
                <input
                placeholder={"surname"}
                value={credentials.surname}
                required={true}
                name={"surname"}
                onChange={handleChange}
                />
                <input
                    placeholder={"address"}
                    value={credentials.address}
                    required={true}
                    name={"address"}
                    onChange={handleChange}
                />
                <input
                placeholder={"postalCode"}
                value={credentials.postalCode}
                name={"postalCode"}
                onChange={handleChange}
                />
                    <input
                    placeholder={"phonenumber"}
                    value={credentials.phonenumber}
                    required={true}
                    name={"phonenumber"}
                    onChange={handleChange}
                    />
                </div>
                <div className={"creditInformation"}>
                    <input
                        placeholder={"credit"}
                        value={credentials.credit}
                        required={true}
                        name={"credit"}
                        onChange={handleChange}
                    />
                    <input
                    placeholder={"reason"}
                    value={credentials.reason}
                    required={true}
                    name={"reason"}
                    onChange={handleChange}
                    />
                </div>
                <div className={"descriptionTextfield"}>
                    <input
                    placeholder={"description"}
                    value={credentials.description}
                    name={"description"}
                    onChange={handleChange}
                    />
                </div>
                <div className={"notesTextfield"}>
                    <input
                    placeholder={"notes"}
                    value={credentials.notes}
                    name={"notes"}
                    onChange={handleChange}
                    />
                </div>
                <button>Add Customer</button>
            </form>
            <div>
                <button onClick={() => navigate("/")}>Homepage</button>
            </div>
        </div>
    )
}