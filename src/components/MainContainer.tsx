'use client'

import { CircularProgress, Box, Typography, Divider } from "@mui/material"
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase/config";

export default function MainContainer() {

  const [ user, loading ] = useAuthState(firebaseAuth);


  if(loading){
    return (
    <>
      <Box
        sx={{
          height : 1,
          width : 1,
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant= 'h1' align= 'center'>
          Lista de tareas
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Divider sx={{color: '#1b5e20', border: 1, borderRadius: 2, width: '40vw'}}></Divider>
        </Box>
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <CircularProgress color="primary"/>
        </Box>
      </Box>
    </>
    )
  }

  return (
    <>
      <Box
        sx={{
          height : 1,
          width : 1,
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant= 'h1' align= 'center'>
          Lista de tareas
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Divider sx={{color: '#1b5e20', border: 1, borderRadius: 2, width: '40vw'}}></Divider>
        </Box>
        <Typography variant= 'h6' align= 'center' sx={{marginTop: 2}}>
          Inicia sesión para empezar a agregar tus tareas.
        </Typography>
      </Box>
    </>
  )
}
