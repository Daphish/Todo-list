import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './features/modalSlice'
import taskReducer from './features/taskSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    task: taskReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>