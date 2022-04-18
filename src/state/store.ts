import { configureStore } from '@reduxjs/toolkit'
import { newPasswordReducer } from './slices/newPasswordSlice'
import { packsReducer } from './slices/packsSlice'
import { resetPasswordReducer } from './slices/resetPasswordSlice'
import { signInReducer } from './slices/signInSlice'
import { signupReducer } from './slices/signUpSlice'
import { userReducer } from './slices/UserSlice'

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        signIn: signInReducer,
        user: userReducer,
        newPassword: newPasswordReducer,
        resetPassword: resetPasswordReducer,
        packs: packsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
