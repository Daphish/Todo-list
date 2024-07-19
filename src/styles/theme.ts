"use client";
import { Montserrat } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { cyan } from "@mui/material/colors"; 

const montserrat = Montserrat({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

const theme = createTheme({
    typography: {
        fontFamily: montserrat.style.fontFamily,
    },
    palette: {
        mode: "dark",
        primary: {
            main: cyan[200],
        },
        secondary: {
            main: cyan[800],
        },
    },
});

export default theme;