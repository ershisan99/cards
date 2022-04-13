import { configureStore } from '@reduxjs/toolkit'
import { signInReducer } from './slices/signInSlice'
import { signupReducer } from './slices/signUpSlice'
import { userReducer } from './slices/UserSlice'
import { resetPasswordReducer } from './slices/resetPasswordSlice'
import { newPasswordReducer } from './slices/newPasswordSlice'
import { cardsPackReducer } from './slices/cardsPackSlice'

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        signIn: signInReducer,
        user: userReducer,
        newPassword: newPasswordReducer,
        resetPassword: resetPasswordReducer,
        cardsPack: cardsPackReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
