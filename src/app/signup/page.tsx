'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Stack, Typography, Divider, Button } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { firebaseAuth } from '@/src/firebase/config';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Signup() {
  
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    const [ createUserWithEmailAndPassword ] = useCreateUserWithEmailAndPassword(firebaseAuth)

    const handleMailChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    
    const handleSignUp = () => {
        console.log('User Signed Up:', { email, password });
    };
  
    const disabled = !email || !password;

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
                    id="mail"
                    label="Correo electrónico"
                    helperText="Ej. Daphish@gmail.com"
                    fullWidth
                    value={email}
                    onChange={handleMailChange}
                    color="primary"
                    variant='outlined'
                />
            </div>
            <div>
                <TextField
                    required
                    id="pass"
                    label="Contraseña"
                    helperText="Escoge una contraseña segura"
                    fullWidth
                    value={password}
                    onChange={handlePassChange}
                    type="password"
                    color="primary"
                    variant='outlined'
                />
            </div>
            <Stack
                direction="row"
                justifyContent="center"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx = {{
                    my: 1
                }}
            >
                <Button
                    variant="contained"
                    disabled={disabled}
                    onClick={handleSignUp}
                    size='large'
                >
                    Registrarse
                </Button>
                <Button
                    variant="contained"
                    size='large'
                >
                    <Link legacyBehavior href="/">
                        <a style={{ textDecoration: 'none', color: 'inherit' }}>
                            Regresar
                        </a>
                    </Link>
                </Button>
            </Stack>
        </Box>
    </Container>
  );
}
