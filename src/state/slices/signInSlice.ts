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
        error: false,
        errorEmail: false,
        isLoading: false,
    },
    reducers: {
        setEmail: (state, action: PayloadAction<{ email: string }>) => {
            state.error = false
            state.errorEmail = false
            state.email = action.payload.email
        },
        setPassword: (state, action: PayloadAction<{ password: string }>) => {
            state.error = false
            state.errorEmail = false
            state.password = action.payload.password
        },
        setRememberMe: (
            state,
            action: PayloadAction<{ rememberMe: boolean }>
        ) => {
            state.error = false
            state.errorEmail = false
            state.rememberMe = action.payload.rememberMe
        },
        setError: (state, action: PayloadAction<{ value: boolean }>) => {
            state.error = action.payload.value
        },
        setErrorEmail: (state, action: PayloadAction<{ value: boolean }>) => {
            state.errorEmail = action.payload.value
        },
        setIsLoading: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isLoading = action.payload.value
        },
    },
})

export const signInReducer = signInSlice.reducer
export const signInActions = signInSlice.actions
export const signInThunks = { sendSignInRequest }

export const selectSignIn = (state: RootState) => state.signIn
