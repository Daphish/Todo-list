'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Stack, Typography, Divider, Button } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { firebaseAuth } from '@/src/firebase/config';

export default function Login() {
  
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    const [ SignInWithEmailAndPassword ] = useSignInWithEmailAndPassword(firebaseAuth)
    
    const handleSignIn = async () => {
        try{

            const res = await SignInWithEmailAndPassword(email, password);
            setEmail('');
            setPassword('');
        } catch(e){
            console.log(e)
        }
    };
  
    const disabled = !email || !password || password.length < 6;

    return (
    <>
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
                    Inicio de sesión
                </Typography>
                <div>
                    <TextField
                        required
                        id="mail"
                        label="Correo electrónico"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        color="primary"
                        variant='outlined'
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="pass"
                        label="Contraseña"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        onClick={handleSignIn}
                        size='large'
                    >
                        Iniciar Sesión
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
    </>
  );
}