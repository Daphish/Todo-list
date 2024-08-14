import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addTaskVal: false,
    updateTaskVal: false,
    delTaskVal: false,
    card: false,
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
        },
        showDel: (state) => {
            state.delTaskVal = true
        },
        unshowDel: (state) => {
            state.delTaskVal = false
        },
        showCard: (state) => {
            state.card = true
        },
        unshowCard: (state) => {
            state.card = false
        }
    }
})

export const { showAdd, showUpdate, unshowAdd, unshowUpdate, showDel, unshowDel, showCard, unshowCard } = modalSlice.actions

export default modalSlice.reducer