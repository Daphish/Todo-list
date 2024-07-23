'use client'

import { CircularProgress, Box, Typography } from "@mui/material"
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase/config";

export default function MainContainer() {

  const [ user, loading ] = useAuthState(firebaseAuth);




  return (
    <>
      <Box
        sx={{
          height : 1,
          width : 1,
          margin: 1
        }}
      >
        <Typography variant= 'h1' align= 'center'>
          Bienvenido
        </Typography>
        {loading && (
          <CircularProgress />
        )}
        {!user && (
          <Typography variant= 'h3' align= 'center'>
            Inicia sesión para empezar a agregar tus tareas.
          </Typography>
        )}
      </Box>
    </>
  )
}
