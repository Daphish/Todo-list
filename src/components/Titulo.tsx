import { Typography, Divider, Box } from "@mui/material"

export default function Titulo() {
  return (
    <>
    <Typography variant= 'h1' align= 'center'>
          Lista de tareas
    </Typography>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Divider sx={{color: '#1b5e20', border: 1, borderRadius: 2, width: '80vw', maxWidth: 'md'}}></Divider>
        </Box>
    </>
  )
}
