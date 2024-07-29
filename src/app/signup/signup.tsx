'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Stack, Typography, Divider, Button, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth'
import { firebaseAuth } from '@/src/firebase/config';
import { useRouter } from 'next/navigation'

export default function Signup() {
  
    const router = useRouter()
    const [ user, loading ] = useAuthState(firebaseAuth);

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user]);

    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ exists, setExists ] = useState<boolean>(false);

    const [ createUserWithEmailAndPassword ] = useCreateUserWithEmailAndPassword(firebaseAuth)
    const [ SignInWithEmailAndPassword ] = useSignInWithEmailAndPassword(firebaseAuth)

    const handleSignUp = async () => {
        try{
            const res = await createUserWithEmailAndPassword(email, password);
            console.log(res)
            if(typeof res === 'undefined'){
                setExists(true);

                setTimeout(() => {
                    setExists(false);
                }, 3000);
            }
            else {
                const ses = await SignInWithEmailAndPassword(email, password)
                router.push('/')
            }
        } catch(e){
            console.log(e)
        }
        setEmail('');
        setPassword('');
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
            <Typography variant="h2" color={'primary'} sx={{textAlign: 'center', marginBottom: 2}}>
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
                    helperText="Debe de tener al menos 6 caracteres"
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
                    onClick={handleSignUp}
                    size='large'
                    sx={{textTransform: 'none', fontSize: '1rem'}}
                >
                    Registrarse
                </Button>
                <Button
                    variant="contained"
                    size='large'
                    sx={{textTransform: 'none', fontSize: '1rem'}}
                >
                    <Link legacyBehavior href="/">
                        <a style={{ textDecoration: 'none', color: 'inherit' }}>
                            Regresar
                        </a>
                    </Link>
                </Button>
            </Stack>
        </Box>
        {exists && 
            <Box
            component='div'
            sx={{
                backgroundColor: '#d50000',
                border: '1px solid black',
                p: 1,
                borderRadius: 1,
            }}
            >
                <Typography align='center'>Este correo electrónico ya ha sido usado, prueba con otro.</Typography>
            </Box> 
        }
    </Container>
  );}
}