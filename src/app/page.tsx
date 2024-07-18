import { Box, Typography } from "@mui/material";
import { Metadata } from "next";
import SideMenu from "../components/SideMenu";

export const metadata : Metadata = {
  title: 'Todo-list',
}

export default function Home() {
  return (
    <>
      <SideMenu />
    </>
  );
}
