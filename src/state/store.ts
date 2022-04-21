import { configureStore } from '@reduxjs/toolkit'
import { loadState } from '../utils/localstorage'
import { cardsReducer } from './slices/cardsSlice'
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
        cards: cardsReducer,
    },
    preloadedState: loadState(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
