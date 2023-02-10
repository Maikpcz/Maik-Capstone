import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import LogoutButton from "./LogoutButton";
import {useNavigate} from "react-router-dom";


export default function (){

    const navigate = useNavigate()

    return(
        <AppBar style={{margin: 0}} sx={{backgroundColor: "#1976d2", margin: "none"}} position="static">
            <Toolbar sx={{display: "flex", justifyContent: "space-around", flexDirection: "row-reverse", margin: "none" }} variant="dense">
                <IconButton sx={{ mr: 2 }} color="inherit">
                    <LogoutButton/>
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    Credit for you?
                </Typography>
                <IconButton sx={{ mr: 2 }} color="inherit">
                    <Button variant={"outlined"} onClick={() => navigate("/")} color="inherit"> Homepage</Button>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}