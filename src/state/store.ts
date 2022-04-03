import { configureStore } from '@reduxjs/toolkit'
import { signInReducer } from './slices/signInSlice'
import { signupReducer } from './slices/signUpSlice'
import { userReducer } from './slices/UserSlice'

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        signIn: signInReducer,
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
