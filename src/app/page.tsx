import { Metadata } from "next";
import { Grid } from "@mui/material";
import SideMenu from "../components/SideMenu";
import MainContainer from "../components/MainContainer";
import RightContainer from "../components/RightContainer";

export const metadata : Metadata = {
  title: 'Todo-List',
}

export default function Home() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <SideMenu />
        </Grid>
        <Grid item xs={10}>
          <MainContainer />
        </Grid>
        <Grid item xs={1}>
          <RightContainer />
        </Grid>
      </Grid>
    </>
  );
}
