import axios from "axios";
import React, {useState} from "react";
import {Box, Button} from "@mui/material";
import FileMetadata from "../models/FileMetadata";

export default function FileUpload(){

    const [file, setFile] = React.useState<File | null>(null);
    const [imgPreview, setImgPreview] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const [picture, setPicture] = useState<string>()

    const [photo, setPhoto] = useState<FileMetadata>({
        id: "",
        name: "",
        contentType: "",
        size: 0,
        createdBy: ""
    })

    async function getPicture(){
        const response = await axios.get("/api/files/" + photo.id, {
            responseType: "blob"
        })
        const urlBla = window.URL.createObjectURL(new Blob([response.data]));
        setPicture(urlBla)
    }

    return (
        <>
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

            <Button onClick={getPicture}>Show Picture</Button>

            <form onSubmit={async (e) => {
                // FILE UPLOAD
                e.preventDefault();

                if (file) {
                    const formData = new FormData();
                    formData.append("file", file);

                    const res = await axios.post("/api/files", formData);
                    setPhoto(res.data)

                    alert(JSON.stringify(res.data, null, 2));
                }
            }}>

                <input
                    ref={fileInputRef}
                    type={"file"}
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
                <Button type={"submit"}>Submit</Button>
            </form>
        </>
    );
}