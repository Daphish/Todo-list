'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Stack, Typography, Divider, Button, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth'
import { firebaseAuth } from '@/src/firebase/config';
import { useRouter } from 'next/navigation';

export default function Login() {
  
    const router = useRouter()
    const [ user, loading ] = useAuthState(firebaseAuth)

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user]);

    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ found, setFound ] = useState<boolean>(true);

    const [ SignInWithEmailAndPassword ] = useSignInWithEmailAndPassword(firebaseAuth)
    
    const handleSignIn = async () => {
        try{

            const res = await SignInWithEmailAndPassword(email, password);
            if(typeof res === 'undefined'){
                setFound(false);

                setTimeout(() => {
                    setFound(true);
                }, 3000);
            }
            else{
                router.push('/')
            }
            setEmail('');
            setPassword('');
        } catch(e){
            console.log(e)
        }
    };
  
    const disabled = !email || !password || password.length < 6;

    if(loading){
        return (
            <Box sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Box>
                    <CircularProgress color='primary'></CircularProgress>
                </Box>
            </Box>
        )
    }

    if(!user){
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
            {!found && 
            <Box
            component='div'
            sx={{
                backgroundColor: '#d50000',
                border: '1px solid black',
                p: 1,
                borderRadius: 1,
            }}
            >
                <Typography align='center'>Datos incorrectos, intente de nuevo</Typography>
            </Box> 
        }
        </Container>
    </>
  );}
}