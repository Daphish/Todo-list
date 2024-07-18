import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Typography } from '@mui/material';

export default function Signup() {
  return (
    <Container maxWidth="sm">
        <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { my: 1},
            marginTop: '30vh',
            backgroundColor: 'action.hover',
            border: '1px solid black',
            p: 1,
            borderRadius: 1,
            gap: 4,
            }}
        noValidate
        autoComplete="off"
        >
            <Typography variant="h2" sx={{textAlign: 'center', marginBottom: 2}}>
                Regístrate
            </Typography>
            <div>
                <TextField
                    required
                    id="username"
                    label="Nombre de usuario"
                    helperText="Ej. Daphish"
                    fullWidth
                />
            </div>
            <div>
                <TextField
                    required
                    id="pass"
                    label="Contraseña"
                    type="password"
                    helperText="Escoge una contraseña segura"
                    fullWidth
                />
            </div>
        </Box>
    </Container>
  );
}
