'use client'
import * as React from 'react'
import { CircularProgress, Box, Typography, Stack, Fab } from "@mui/material"
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase/config";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Titulo from "./Titulo";
import {useAppDispatch, useAppSelector} from '../lib/hooks'
import { show, unshow } from '../lib/features/modalSlice'

export default function MainContainer() {

  const value = useAppSelector((state) => state.modal.value);
  const dispatch = useAppDispatch();
  const [ user, loading ] = useAuthState(firebaseAuth);
  const [filter, setFilter] = React.useState<string | null>('pending');
  const [order, setOrder] = React.useState<string | null>('asc')

  function handleModal() {
    value === true ? show() : unshow();
  }

  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string | null,
  ) => {
    setFilter(newFilter);
  };

  const handleOrder = (
    event: React.MouseEvent<HTMLElement>,
    newOrder: string | null,
  ) => {
    setOrder(newOrder);
  };


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
        <Titulo />
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <CircularProgress color="primary"/>
        </Box>
      </Box>
    </>
    )
  }

  if(!user){
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
        <Titulo />
        <Typography variant= 'h6' align= 'center' sx={{marginTop: 2}}>
          Inicia sesión para empezar a agregar tus tareas.
        </Typography>
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
        <Titulo />
          <Stack
            justifyContent="space-around"
            alignItems="center"
            direction={{ xs: 'column', sm: 'row' }}
            mt={2}
            spacing={{xs: 2}}
          >
            <Stack spacing={1}>
              <Typography variant="h6" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>Filtrar tareas</Typography>
              <ToggleButtonGroup
                color="primary"
                exclusive
                value = {filter}
                onChange = {handleFilter}
                aria-label = "task filter"
              >
                <ToggleButton value="pending" aria-label="pending filter" sx={{ textTransform: 'none' }}>Pendientes</ToggleButton>
                <ToggleButton value="complete" aria-label="complete filter" sx={{ textTransform: 'none' }}>Completadas</ToggleButton>
                <ToggleButton value="all" aria-label="all filter" sx={{ textTransform: 'none' }}>Todas</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="h6" sx={{ textAlign: { xs: 'center', sm: 'right' } }}>Ordenar por fecha</Typography>
              <ToggleButtonGroup
                color="primary"
                exclusive
                value = {order}
                onChange = {handleOrder}
                aria-label="task order"
              >
                <ToggleButton value="asc" aria-label="asc order" sx={{ textTransform: 'none' }}>Ascendente</ToggleButton>
                <ToggleButton value="desc" aria-label="desc order" sx={{ textTransform: 'none' }}>Descendiente</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Stack>
          <Fab color='secondary'>
            <AddCircleIcon />
          </Fab>
          <Typography variant= 'h5' align= 'center' sx={{margin: 2}}>
            Inicia sesión para empezar a agregar tus tareas.
          </Typography>
      </Box>
    </>
  )
}