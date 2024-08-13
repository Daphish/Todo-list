'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Task, Taskdb } from '@/src/styles/types'
import { sort, sortDesc } from '@/src/utils'

type initState = {
    taskList: Taskdb[],
    loading: boolean,
    error: null | string | unknown,
    finished: boolean,
    sorted: boolean,
}

const initialState : initState = {
    taskList: [],
    loading: false,
    error: null,
    finished: false,
    sorted: false,
}

const addTask = createAsyncThunk('task/addTask', async (task: Task, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:3000/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        const data : Taskdb =  await response.json();
        return data;
    } catch (error : any) {
        console.error('Error creating task:', error);
        return rejectWithValue(error.message);
    }
});

const getTasks = createAsyncThunk('task/getTasks', async (userId : string, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:3000/api/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data : Taskdb[] =  await response.json();
        return data;
    } catch (error : any) {
        console.error('Error creating task:', error);
        return rejectWithValue(error.message);
    }
});

const setComplete = createAsyncThunk('task/setComplete', async (id : number) => {
    try {
        const response = await fetch('http://localhost:3000/api', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id),
        });
        const data : Taskdb = await response.json();
        return data;
    } catch (error : any) {
        console.error(`Error updating task`, error);
        return error;
    }
})

const updateTask = createAsyncThunk('task/updateTask', async (task: Taskdb, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:3000/api', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        const data : Taskdb =  await response.json();
        return data;
    } catch (error : any) {
        console.error('Error updating task:', error);
        return rejectWithValue(error.message);
    }
});

const sortTasks = createAsyncThunk('task/sortTasks', async (tasks : Taskdb[]) => {
    let sortedTasks = tasks;
    return sort(sortedTasks);
});

const sortDescTasks = createAsyncThunk('task/sortDescTasks', async (tasks : Taskdb[]) => {
    let sortedTasks = tasks;
    return sortDesc(sortedTasks);
});

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        finish: (state) => {
            state.finished = false;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getTasks.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.taskList = action.payload;
            state.finished = true;
        })
        .addCase(getTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addTask.fulfilled, (state, action) => {
            state.loading = false;
            state.taskList.push(action.payload);
            state.sorted = false;
        })
        .addCase(addTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            const taskIndex = state.taskList.findIndex(task => task.id === action.payload.id);
            state.taskList[taskIndex] = action.payload;
            state.sorted = false;
        })
        .addCase(updateTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(setComplete.fulfilled, (state, action) => {
            const taskIndex = state.taskList.findIndex(task => task.id === action.payload.id);
            state.taskList[taskIndex].state = 'Completada';
            state.sorted=false;
        })
        .addCase(sortTasks.fulfilled, (state, action) => {
            state.taskList = action.payload;
            state.sorted = true;
        })
        .addCase(sortDescTasks.fulfilled, (state, action) => {
            state.taskList = action.payload;
            state.sorted = true;
        })
    },
})

export { addTask, getTasks, sortTasks, sortDescTasks, setComplete, updateTask };
export const { finish } = taskSlice.actions;

export default taskSlice.reducer