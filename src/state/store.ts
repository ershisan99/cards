import { configureStore } from '@reduxjs/toolkit'
import { signInReducer } from './slices/signInSlice'
import { signupReducer } from './slices/signUpSlice'

export const store = configureStore({
    reducer: { signup: signupReducer, signIn: signInReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
