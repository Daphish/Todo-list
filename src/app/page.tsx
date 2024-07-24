import { Metadata } from "next";
import { Grid } from "@mui/material";
import SideMenu from "../components/SideMenu";
import MainContainer from "../components/MainContainer";
import dayjs from "dayjs";


export const metadata : Metadata = {
  title: 'Todo-List',
}

export default function Home() {
  
  dayjs.locale('es')

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md='auto'>
          <SideMenu />
        </Grid>
        <Grid item xs={12} md={10} lg={11}>
          <MainContainer />
        </Grid>
      </Grid>
    </>
  );
}
