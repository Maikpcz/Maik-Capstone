import {Box} from "@mui/material";
import Cards from "../components/Cards";
import Toolbar from "../components/Toolbar";
import "./global.css";

export default function Homepage() {

    return (
        <>
            <Toolbar/>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }} >

            <Cards/>

            </Box>

        </>
    )
}