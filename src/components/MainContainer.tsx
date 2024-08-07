import * as React from 'react'
import { CircularProgress, Box, Typography, Stack, Fab, Dialog, DialogContent, DialogTitle, TextField, Button, DialogActions, Grid, Card, CardContent, Divider, CardActions } from "@mui/material"
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase/config";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Titulo from "./Titulo";
import {useAppDispatch, useAppSelector} from '../lib/hooks'
import { show, unshow } from '../lib/features/modalSlice'
import { getTasks, addTask, finish } from '../lib/features/taskSlice'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from 'react';
import { Task, Taskdb } from '../styles/types';
import dayjs, { Dayjs } from 'dayjs';

export default function MainContainer() {

  const value = useAppSelector((state) => state.modal.value);
  const taskState = useAppSelector ((state) => state.task);
  const dispatch = useAppDispatch();
  const [ user, loading ] = useAuthState(firebaseAuth);
  const [ filter, setFilter] = React.useState<string | null>('pending');
  const [ order, setOrder ] = React.useState<string | null>('asc')
  const [ taskName, setTaskName ] = useState('');
  const [ taskDescription, setTaskDescription ] = useState('');
  const [ taskDue, setTaskDue ] = useState<string | null>(null);
  const [ addErr, setAddErr ] = useState<boolean>(false);
  const [ addErr2, setAddErr2 ] = useState<boolean>(false);
  const [ pendingTasks, setPendingTasks ] = useState<Taskdb[]>([]);
  const [ completedTasks, setCompletedTasks ] = useState<Taskdb[]>([]);
  const [ tasksLoaded, setTasksLoaded ] = useState<boolean>(false);

  function handleModal() {
    value === true ? dispatch(unshow()) : dispatch(show());
  }

  function handleAddTask() {
    if(taskName && taskDescription){
      if(taskDue && dayjs(taskDue, 'DD/MM/YYYY', true).isValid()){
        const newTask : Task = {
          title: taskName,
          description: taskDescription,
          deadline: taskDue,
          state: 'Pendiente',
          userId: user!.uid,
        }
        dispatch(addTask(newTask));
        setTaskName('');
        setTaskDescription('');
        setTaskDue(null);
        if(taskState.finished){
          handleModal();
          dispatch(finish());
        }
      } else {
        setAddErr(true);
        setTimeout(() => {
          setAddErr(false);
      }, 3000);
      }
    } else {
      setAddErr(true);
      setTimeout(() => {
        setAddErr(false);
      }, 3000);
    }
  }

  useEffect(() => {
    if (user) {
      dispatch(getTasks(user.uid));
    }
  }, [user]);

  useEffect(() => {
    setPendingTasks(taskState.taskList.filter(task => task.state === "Pendiente"));
    setCompletedTasks(taskState.taskList.filter(task => task.state === "Completada"));
  }, [taskState.finished])

  useEffect(() => {
    setTasksLoaded(true);
  }, [pendingTasks, completedTasks])

  useEffect(() => {
    if (!taskState.loadingAdd && taskState.error) {
      setAddErr2(true);
      setTimeout(() => {
        setAddErr2(false);
      }, 3000);
    }
  }, [taskState.loadingAdd, taskState.error]);

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
          {tasksLoaded ? (filter === "pending" ? (pendingTasks.length === 0 ? (
            <Typography variant= 'h5' align= 'center' sx={{margin: 2}}>
              No hay ninguna tarea pendiente.
            </Typography>
          ) :
            <Box
              sx={{
                marginLeft: { xs: 3, sm: 1, md: 0},
                marginRight: { xs: 3, sm: 1, md: 0}
              }}
            >
              <Grid
                container
                justifyContent="flex-start"
                spacing={2}
                sx={{ mt: 2, mb: 2}}
              >
                {pendingTasks.map(task => (
                  <Grid item xs={12} sm={6} lg={3}  key={task.id}>
                    <Card sx={{background: 'linear-gradient(to bottom, #006405, #002803)', boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)'}}>
                      <CardContent>
                        {task.deadline ?
                            <Typography variant="h4" sx={{ m: 1 }}>{task.deadline}</Typography>
                            :
                            <Typography noWrap variant="h4" sx={{ m: 1 }}>Sin fecha límite</Typography>
                        }
                        <Divider sx={{borderColor: '#000000F0'}}></Divider>
                        <Typography noWrap variant="h6" sx={{ m: 1 }}>{task.title}</Typography>
                        <Typography noWrap variant="body1" sx={{ m: 1 }}>{task.description}</Typography>
                        <Divider sx={{borderColor: '#000000F0'}}></Divider>
                      </CardContent>
                      <CardActions sx={{ display: 'flex', justifyContent: 'space-around'}}>
                        <Button size="small" variant='contained' sx={{textTransform: 'none'}}>Editar</Button>
                        <Button size="small" variant='contained' color="info" sx={{textTransform: 'none'}}>Completada</Button>
                        <Button size="small" variant='contained' color="error" sx={{textTransform: 'none'}}>Eliminar</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (filter === "complete" ? (completedTasks.length === 0 ? (
            <Typography variant= 'h5' align= 'center' sx={{margin: 2}}>
              No hay ninguna tarea completada.
            </Typography>
          ) :
            <Box
              sx={{
                marginLeft: { xs: 3, sm: 1, md: 0},
                marginRight: { xs: 3, sm: 1, md: 0}
              }}
            >
              <Grid
                container
                justifyContent="flex-start"
                spacing={2}
                sx={{ mt: 2, mb: 2}}
              >
                {completedTasks.map(task => (
                  <Grid item xs={12} sm={6} lg={3}  key={task.id}>
                    <Card sx={{background: 'linear-gradient(to bottom, #006405, #002803)', boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)'}}>
                      <CardContent>
                        {task.deadline ?
                            <Typography variant="h4" sx={{ m: 1 }}>{task.deadline}</Typography>
                            :
                            <Typography noWrap variant="h4" sx={{ m: 1 }}>Sin fecha límite</Typography>
                        }
                        <Divider sx={{borderColor: '#000000F0'}}></Divider>
                        <Typography noWrap variant="h6" sx={{ m: 1 }}>{task.title}</Typography>
                        <Typography noWrap variant="body1" sx={{ m: 1 }}>{task.description}</Typography>
                        <Divider sx={{borderColor: '#000000F0'}}></Divider>
                      </CardContent>
                      <CardActions sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Button size="small" variant='contained' color="error" sx={{textTransform: 'none'}}>Eliminar</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (taskState.taskList.length === 0 ? (
            <Typography variant= 'h5' align= 'center' sx={{margin: 2}}>
              No hay ninguna tarea.
            </Typography>
          ) :
            <Box
              sx={{
                marginLeft: { xs: 3, sm: 1, md: 0},
                marginRight: { xs: 3, sm: 1, md: 0}
              }}
            >
              <Grid
                container
                justifyContent="flex-start"
                spacing={2}
                sx={{ mt: 2, mb: 2}}
              >
                {taskState.taskList.map(task => (
                  <Grid item xs={12} sm={6} lg={3}  key={task.id}>
                    <Card sx={{background: 'linear-gradient(to bottom, #006405, #002803)', boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)'}}>
                      <CardContent>
                        {task.deadline ?
                            <Typography variant="h4" sx={{ m: 1 }}>{task.deadline}</Typography>
                            :
                            <Typography noWrap variant="h4" sx={{ m: 1 }}>Sin fecha límite</Typography>
                        }
                        <Divider sx={{borderColor: '#000000F0'}}></Divider>
                        <Typography noWrap variant="h6" sx={{ m: 1 }}>{task.title}</Typography>
                        <Typography noWrap variant="body1" sx={{ m: 1 }}>{task.description}</Typography>
                        <Divider sx={{borderColor: '#000000F0'}}></Divider>
                      </CardContent>
                      {task.state === 'Pendiente' ?
                        <CardActions sx={{ display: 'flex', justifyContent: 'space-around'}}>
                          <Button size="small" variant='contained' sx={{textTransform: 'none'}}>Editar</Button>
                          <Button size="small" variant='contained' color="info" sx={{textTransform: 'none'}}>Completada</Button>
                          <Button size="small" variant='contained' color="error" sx={{textTransform: 'none'}}>Eliminar</Button>
                        </CardActions>
                        :
                        <CardActions sx={{ display: 'flex', justifyContent: 'center'}}>
                          <Button size="small" variant='contained' color="error" sx={{textTransform: 'none'}}>Eliminar</Button>
                        </CardActions>
                      }
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))) : 
          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <CircularProgress color="primary"/>
          </Box>
          }
      </Box>
      <Dialog
        open={value}
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
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <TextField
            required
            id="taskDescription"
            label="Descripción de la tarea"
            fullWidth
            color="primary"
            variant='outlined'
            value={taskDescription}
            multiline
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Día límite" onChange={(e) => setTaskDue(e ? e.format('DD/MM/YYYY') : null)}/>
            </DemoContainer>
          </LocalizationProvider>
          {addErr &&
            <Box
            component='div'
            sx={{
              backgroundColor: '#d50000',
              border: '1px solid black',
              p: 1,
              borderRadius: 1,
            }}
            >
              <Typography align='center'>Datos incompletos</Typography>
            </Box>
          }
          {taskState.loadingAdd &&
            <Box sx={{
              textAlign: 'center',
              p: 1,
            }}>
              <CircularProgress color='primary'></CircularProgress>
            </Box>
          }
          {addErr2 &&
            <Box
            component='div'
            sx={{
              backgroundColor: '#d50000',
              border: '1px solid black',
              p: 1,
              borderRadius: 1,
            }}
            >
              <Typography align='center'>Hubo un error</Typography>
            </Box>
          }
        </DialogContent>
        <DialogActions sx={{display: 'flex', justifyContent: "space-around"}}>
          <Button variant='contained' onClick={handleAddTask} sx={{textTransform: 'none', fontSize: '1rem'}}>Agregar tarea</Button>
          <Button onClick={handleModal} variant='outlined' color="error" sx={{textTransform: 'none', fontSize: '1rem'}}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}