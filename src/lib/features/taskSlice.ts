'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Task, Taskdb } from '@/src/styles/types'

type initState = {
    taskList: Taskdb[],
    loadingGet: boolean,
    loadingAdd: boolean,
    error: null | string | unknown,
    finished: boolean,
}

const initialState : initState = {
    taskList: [],
    loadingGet: false,
    loadingAdd: false,
    error: null,
    finished: false,
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

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        finish: (state) => {
            state.finished = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getTasks.pending, (state) => {
            state.loadingGet = true;
            state.error = null;
        })
        .addCase(getTasks.fulfilled, (state, action) => {
            state.loadingGet = false;
            state.taskList = action.payload;
            state.finished = true;
        })
        .addCase(getTasks.rejected, (state, action) => {
            state.loadingGet = false;
            state.error = action.payload;
        })
        .addCase(addTask.pending, (state) => {
            state.loadingAdd = true;
            state.error = null;
        })
        .addCase(addTask.fulfilled, (state, action) => {
            state.loadingAdd = false;
            state.taskList.push(action.payload);
            state.finished = true;
        })
        .addCase(addTask.rejected, (state, action) => {
            state.loadingAdd = false;
            state.error = action.payload;
        })
    },
})

export { addTask, getTasks };
export const { finish } = taskSlice.actions;

export default taskSlice.reducer