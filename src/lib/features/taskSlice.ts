'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Task, Taskdb } from '@/src/styles/types'

type initState = {
    taskList: Taskdb[],
    loading: boolean,
    error: null | string | unknown,
    finished: boolean,
}

const initialState : initState = {
    taskList: [],
    loading: false,
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
        .addCase(addTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addTask.fulfilled, (state, action) => {
            state.loading = false;
            state.taskList.push(action.payload);
            state.finished = true;
        })
        .addCase(addTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    },
})

export { addTask };
export const { finish } = taskSlice.actions;

export default taskSlice.reducer