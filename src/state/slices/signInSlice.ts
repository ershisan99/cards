import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SignInArgs, UserAPI } from '../../API/userAPI'
import { RootState } from '../store'

export const sendSignInRequest = createAsyncThunk(
    'signIn/send',
    async (payload: SignInArgs) => {
        return await UserAPI.signIn({
            email: payload.email,
            password: payload.password,
            rememberMe: payload.rememberMe,
        })
    }
)

const signInSlice = createSlice({
    name: 'signIn',
    initialState: {
        email: '',
        password: '',
        rememberMe: true,
    },
    reducers: {
        setEmail: (state, action: PayloadAction<{ email: string }>) => {
            state.email = action.payload.email
        },
        setPassword: (state, action: PayloadAction<{ password: string }>) => {
            state.password = action.payload.password
        },
        setRememberMe: (
            state,
            action: PayloadAction<{ rememberMe: boolean }>
        ) => {
            state.rememberMe = action.payload.rememberMe
        },
    },
})

export const signInReducer = signInSlice.reducer
export const signInActions = signInSlice.actions
export const signInThunks = { sendSignInRequest }

export const selectSignIn = (state: RootState) => state.signIn
