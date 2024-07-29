import * as React from 'react'
import { CircularProgress, Box, Typography, Stack, Fab, Dialog, DialogContent, DialogTitle, TextField, Button, DialogActions } from "@mui/material"
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase/config";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Titulo from "./Titulo";
import {useAppDispatch, useAppSelector} from '../lib/hooks'
import { show, unshow } from '../lib/features/modalSlice'
import { Task } from '../styles/types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MainContainer() {

  const initialTask : Task = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const [ user, loading ] = useAuthState(firebaseAuth);
  const [filter, setFilter] = React.useState<string | null>('pending');
  const [order, setOrder] = React.useState<string | null>('asc')

  function handleModal() {
    initialTask.value === true ? dispatch(unshow()) : dispatch(show());
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
                <ToggleButton value="desc" aria-label="desc order" sx={{ textTransform: 'none' }}>Descendente</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Stack>
          <Box
            sx={{
              height : 1,
              width : 1,
              justifyContent: 'center',
              display: 'flex',
              mt: 5
            }}
          >
            <Fab onClick={handleModal} color='secondary'>
              <AddCircleIcon />
            </Fab>
          </Box>
          <Typography variant= 'h5' align= 'center' sx={{margin: 2}}>
            No hay ninguna tarea pendiente.
          </Typography>
      </Box>
      <Dialog
        open={initialTask.value}
        onClose={handleModal}
      >
        <DialogTitle color={"primary"} sx={{ textAlign: 'center'}}>Nueva Tarea</DialogTitle>
        <DialogContent dividers sx={{'& .MuiFormControl-root': {mt: 1}}}>
          <TextField
            required
            id="taskName"
            label="Nombre de la tarea"
            fullWidth
            color="primary"
            variant='outlined'
          />
          <TextField
            required
            id="taskDescription"
            label="Descripción de la tarea"
            fullWidth
            color="primary"
            variant='outlined'
            multiline
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Día límite" />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions sx={{display: 'flex', justifyContent: "space-around"}}>
          <Button variant='contained' sx={{textTransform: 'none', fontSize: '1rem'}}>Agregar tarea</Button>
          <Button onClick={handleModal} variant='contained' sx={{textTransform: 'none', fontSize: '1rem'}}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}