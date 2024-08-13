import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addTaskVal: false,
    updateTaskVal: false,
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        showAdd: (state) => {
            state.addTaskVal = true
        },
        unshowAdd: (state) => {
            state.addTaskVal = false
        },
        showUpdate: (state) => {
            state.updateTaskVal = true
        },
        unshowUpdate: (state) => {
            state.updateTaskVal = false
        }
    }
})

export const { showAdd, showUpdate, unshowAdd, unshowUpdate } = modalSlice.actions

export default modalSlice.reducer