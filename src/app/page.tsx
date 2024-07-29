'use client'
import { useEffect } from 'react';
import Head from 'next/head';
import { Grid } from "@mui/material";
import SideMenu from "../components/SideMenu";
import MainContainer from "../components/MainContainer";

export default function Home() {

  useEffect(() => {
    document.title = 'Todo-List';
  }, []);
  
  return (
    <>
      <Head>
        <title>Todo-List</title>
      </Head>
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
