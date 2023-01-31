import {useNavigate} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";

export default function ErrorPage(){
    const navigate = useNavigate();
    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", mt: 25}}>
            <Typography variant={"h2"}>Error</Typography>

            <Typography variant={"h4"}>Page not Found</Typography>

            <Button variant={"contained"} onClick={() => {
                navigate("/")
            }}>Homepage</Button>
        </Box>
    )

}