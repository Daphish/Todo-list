"use client";
import { Montserrat } from "next/font/google";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { green } from "@mui/material/colors"; 

const montserrat = Montserrat({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

let theme = createTheme({
    typography: {
        fontFamily: montserrat.style.fontFamily,
    },
    palette: {
        mode: "dark",
        primary: {
            main: green[300],
        },
        secondary: {
            main: green[900],
        },
    },
});

theme=responsiveFontSizes(theme);

export default theme;