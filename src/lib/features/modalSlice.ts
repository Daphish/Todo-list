import { createSlice } from '@reduxjs/toolkit'
import type { Task } from '@/src/styles/types'

const initialState : Task = {
    value: false,
    name: '',
    description: '',
    deadline: '',
    taskState: true,
    id: ''
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        show: (state) => {
            state.value = true
        },
        unshow: (state) => {
            state.value = false
        }
    }
})

export const { show, unshow } = modalSlice.actions

export default modalSlice.reducer