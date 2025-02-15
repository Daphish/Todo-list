import * as React from 'react'
import { CircularProgress, Box, Typography, Stack, Fab, Dialog, DialogContent, DialogTitle, TextField, Button, DialogActions, Grid, Card, CardContent, Divider, CardActions, DialogContentText, CardActionArea, Modal, TextareaAutosize } from "@mui/material"
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase/config";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Titulo from "./Titulo";
import {useAppDispatch, useAppSelector} from '../lib/hooks'
import { showAdd, showUpdate, unshowAdd, unshowUpdate, showDel, unshowDel, showCard, unshowCard } from '../lib/features/modalSlice'
import { getTasks, addTask, finish, sortTasks, sortDescTasks, setComplete, updateTask, deleteTask } from '../lib/features/taskSlice'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from 'react';
import { Task, Taskdb } from '../styles/types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { sort, sortDesc } from '@/src/utils'
dayjs.extend(customParseFormat)

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  background: 'linear-gradient(to bottom, #006405, #002803)',
  border: '2px solid #000',
  boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)',
  p: 2,
}

export default function MainContainer() {

  const addTaskVal = useAppSelector((state) => state.modal.addTaskVal);
  const updateTaskVal = useAppSelector((state) => state.modal.updateTaskVal);
  const delTaskVal = useAppSelector((state) => state.modal.delTaskVal);
  const card = useAppSelector((state) => state.modal.card);
  const taskState = useAppSelector ((state) => state.task);
  const dispatch = useAppDispatch();
  const [ user, loading ] = useAuthState(firebaseAuth);
  const [ filter, setFilter] = useState<string | null>('pending');
  const [ order, setOrder ] = useState<string | null>('asc')
  const [ taskName, setTaskName ] = useState('');
  const [ taskDescription, setTaskDescription ] = useState('');
  const [ taskDue, setTaskDue ] = useState<string | null>(null);
  const [ taskID, setTaskID ] = useState<number>(0);
  const [ addErr, setAddErr ] = useState<boolean>(false);
  const [ addErr2, setAddErr2 ] = useState<boolean>(false);
  const [ pendingTasks, setPendingTasks ] = useState<Taskdb[]>([]);
  const [ completedTasks, setCompletedTasks ] = useState<Taskdb[]>([]);
  const [ tasksLoaded, setTasksLoaded ] = useState<boolean>(false);

  function handleCardInfo(task : Taskdb){
    handleCardModal();
    setTaskDue(task.deadline);
    setTaskName(task.title);
    setTaskDescription(task.description);
  }

  function handleCardModal(){
    card === true ? dispatch(unshowCard()) : dispatch(showCard());
    setTaskDue(null);
    setTaskName('');
    setTaskDescription('');
  }

  function handleDeleteModal(){
    delTaskVal === true ? dispatch(unshowDel()) : dispatch(showDel());
    setTaskID(0);
  }

  function handleDelete(id: number){
    handleDeleteModal()
    setTaskID(id);
  }

  function handleDeleteTask(){
    dispatch(deleteTask(taskID));
    handleDeleteModal()
  }

  function handleAddModal() {
    addTaskVal === true ? dispatch(unshowAdd()) : dispatch(showAdd());
    setTaskName('');
    setTaskDescription('');
    setTaskDue(null);
  }

  function handleUpdateModal() {
    updateTaskVal === true ? dispatch(unshowUpdate()) : dispatch(showUpdate());
    setTaskName('');
    setTaskDescription('');
    setTaskDue(null);
  }

  function handleUpdate(task : Taskdb){
    handleUpdateModal();
    setTaskName(task.title);
    setTaskDescription(task.description);
    setTaskDue(task.deadline);
    setTaskID(task.id);
  }

  function handleUpdateTask() {
    if(taskName && taskDescription){
      if(!taskDue){
        const updatedTask : Taskdb = {
          id: taskID,
          title: taskName,
          description: taskDescription,
          deadline: taskDue,
          state: 'Pendiente',
          userId: user!.uid,
        }
        dispatch(updateTask(updatedTask));
        handleUpdateModal();
      } else{
        if(dayjs(taskDue, 'DD/MM/YYYY', true).isValid()){
          const updatedTask : Taskdb = {
            id: taskID,
            title: taskName,
            description: taskDescription,
            deadline: taskDue,
            state: 'Pendiente',
            userId: user!.uid,
          }
          dispatch(updateTask(updatedTask));
          handleUpdateModal();
      } else {
        setAddErr(true);
        setTimeout(() => {
          setAddErr(false);
      }, 3000);
      }
    } } else {
      setAddErr(true);
      setTimeout(() => {
        setAddErr(false);
      }, 3000);
    }
  }

  function handleAddTask() {
    if(taskName && taskDescription){
      if(!taskDue){
        const newTask : Task = {
          title: taskName,
          description: taskDescription,
          deadline: taskDue,
          state: 'Pendiente',
          userId: user!.uid,
        }
        dispatch(addTask(newTask));
        handleAddModal();
      } else{
        if(dayjs(taskDue, 'DD/MM/YYYY', true).isValid()){
          const newTask : Task = {
            title: taskName,
            description: taskDescription,
            deadline: taskDue,
            state: 'Pendiente',
            userId: user!.uid,
          }
          dispatch(addTask(newTask));
          handleAddModal();
      } else {
        setAddErr(true);
        setTimeout(() => {
          setAddErr(false);
      }, 3000);
      }
    } } else {
      setAddErr(true);
      setTimeout(() => {
        setAddErr(false);
      }, 3000);
    }
  }

  useEffect(() => {
    if (user) {
      const gettingTasks = async () => {
        await dispatch(getTasks(user.uid));
      }
      gettingTasks();
    } else {
      setTasksLoaded(false);
    }
  }, [user]);

  useEffect(() => {
    if(taskState.finished){
      setPendingTasks(taskState.taskList.filter(task => task.state === "Pendiente"));
      setCompletedTasks(taskState.taskList.filter(task => task.state === "Completada"));
      setTasksLoaded(true);
      dispatch(finish());
    } else {
      if(!taskState.sorted){
        if(order === 'asc'){
          dispatch(sortTasks(taskState.taskList));
          setPendingTasks(sort(taskState.taskList.filter(task => task.state === "Pendiente")));
          setCompletedTasks(sort(taskState.taskList.filter(task => task.state === "Completada")));
        } else {
          dispatch(sortDescTasks(taskState.taskList));
          setPendingTasks(sortDesc(taskState.taskList.filter(task => task.state === "Pendiente")));
          setCompletedTasks(sortDesc(taskState.taskList.filter(task => task.state === "Completada")));

        }
      }
    }
  }, [taskState.taskList])

  useEffect(() => {
    if (!taskState.loading && taskState.error) {
      setAddErr2(true);
      setTimeout(() => {
        setAddErr2(false);
      }, 3000);
    }
  }, [taskState.loading, taskState.error]);

  useEffect(() => {
    if(tasksLoaded){
      if(order === 'asc'){
        dispatch(sortTasks(taskState.taskList));
        setPendingTasks(sort(pendingTasks));
        setCompletedTasks(sort(completedTasks));
      } else {
        dispatch(sortDescTasks(taskState.taskList));
        setPendingTasks(sortDesc(pendingTasks));
        setCompletedTasks(sortDesc(completedTasks));
      }
    }
  }, [order])

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
            <Fab onClick={handleAddModal} color='secondary'>
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
                      <CardActionArea
                        onClick={() => handleCardInfo(task)}
                      >
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
                      </CardActionArea>
                      <CardActions sx={{ display: 'flex', justifyContent: 'space-around'}}>
                        <Button size="small" variant='contained' onClick={() => handleUpdate(task)} sx={{textTransform: 'none'}}>Editar</Button>
                        <Button size="small" variant='contained' onClick={() => dispatch(setComplete(task.id))} color="info" sx={{textTransform: 'none'}}>Completada</Button>
                        <Button size="small" variant='contained' onClick={() => handleDelete(task.id)} color="error" sx={{textTransform: 'none'}}>Eliminar</Button>
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
                      <CardActionArea
                        onClick={() => handleCardInfo(task)}
                      >
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
                      </CardActionArea>
                      <CardActions sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Button size="small" variant='contained' onClick={() => handleDelete(task.id)} color="error" sx={{textTransform: 'none'}}>Eliminar</Button>
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
                      <CardActionArea
                        onClick={() => handleCardInfo(task)}
                      >
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
                      </CardActionArea>
                      {task.state === 'Pendiente' ?
                        <CardActions sx={{ display: 'flex', justifyContent: 'space-around'}}>
                          <Button size="small" variant='contained' onClick={() => handleUpdate(task)} sx={{textTransform: 'none'}}>Editar</Button>
                          <Button size="small" variant='contained' onClick={() => dispatch(setComplete(task.id))} color="info" sx={{textTransform: 'none'}}>Completada</Button>
                          <Button size="small" variant='contained' onClick={() => handleDelete(task.id)} color="error" sx={{textTransform: 'none'}}>Eliminar</Button>
                        </CardActions>
                        :
                        <CardActions sx={{ display: 'flex', justifyContent: 'center'}}>
                          <Button size="small" variant='contained' onClick={() => handleDelete(task.id)} color="error" sx={{textTransform: 'none'}}>Eliminar</Button>
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
        open={addTaskVal}
        onClose={handleAddModal}
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
          {taskState.loading &&
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
          <Button onClick={handleAddModal} variant='outlined' color="error" sx={{textTransform: 'none', fontSize: '1rem'}}>Cancelar</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={updateTaskVal}
        onClose={handleUpdateModal}
      >
        <DialogTitle color={"primary"} sx={{ textAlign: 'center'}}>Actualizando Tarea</DialogTitle>
        <DialogContent dividers sx={{'& .MuiFormControl-root': {mt: 1}}}>
          <TextField
            required
            id="taskNameU"
            label="Nombre de la tarea"
            fullWidth
            color="primary"
            variant='outlined'
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <TextField
            required
            id="taskDescriptionU"
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
              <DatePicker value={taskDue ? dayjs(taskDue, "DD/MM/YYYY") : null} label="Día límite" onChange={(e) => setTaskDue(e ? e.format('DD/MM/YYYY') : null)}/>
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
          {taskState.loading &&
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
          <Button variant='contained' onClick={handleUpdateTask} sx={{textTransform: 'none', fontSize: '1rem'}}>Actualizar tarea</Button>
          <Button onClick={handleUpdateModal} variant='outlined' color="error" sx={{textTransform: 'none', fontSize: '1rem'}}>Cancelar</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={delTaskVal}
        onClose={handleDeleteModal}
      >
        <DialogTitle color={"primary"} sx={{ textAlign: 'center'}}>¿Eliminar?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿De verdad quiere eliminar esta tarea?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display: 'flex', justifyContent: "space-around"}}>
          <Button variant='contained' color="error" onClick={handleDeleteTask} sx={{textTransform: 'none', fontSize: '1rem'}}>Sí</Button>
          <Button variant='contained' onClick={handleDeleteModal} sx={{textTransform: 'none', fontSize: '1rem'}}>No</Button>
        </DialogActions>
      </Dialog>

      <Modal
        open={card}
        onClose={handleCardModal}
      >
        <Box sx={style}>
          <Typography variant='h6' sx={{ m: 1, textAlign: 'center', overflowWrap: 'break-word' }}>Fecha límite: {taskDue ? taskDue : "Sin fecha límite"}</Typography>
          <Divider sx={{borderColor: '#000000F0'}}></Divider>
          <Typography variant='subtitle2' sx={{ m: 1, textAlign: 'center', overflowWrap: 'break-word' }}>{taskName}</Typography>
          <Typography variant='body2' sx={{ m: 1, overflowWrap: 'break-word'}}>{taskDescription}</Typography>
        </Box>
      </Modal>
    </>
  )
}