import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SignUpArgs, UserAPI } from '../../API/userAPI'
import { RootState } from '../store'

export const sendSignUpRequest = createAsyncThunk(
    'signup/send',
    async (payload: SignUpArgs) => {
        return await UserAPI.signUp({
            email: payload.email,
            password: payload.password,
        })
    }
)

const signupSlice = createSlice({
    name: 'signup',
    initialState: {
        email: '',
        errorPassword: false,
        errorEmail: false,
        errorPasswordText: '',
        password: '',
        confirmPassword: '',
        isLoading: false,
    },
    reducers: {
        setEmail: (state, action: PayloadAction<{ email: string }>) => {
            state.email = action.payload.email
            state.errorEmail = false
        },
        setPassword: (state, action: PayloadAction<{ password: string }>) => {
            state.password = action.payload.password
            state.errorPassword = false
        },
        setConfirmPassword: (
            state,
            action: PayloadAction<{ confirmPassword: string }>
        ) => {
            state.confirmPassword = action.payload.confirmPassword
            state.errorPassword = false
        },
        setErrorPassword: (
            state,
            action: PayloadAction<{ error: boolean }>
        ) => {
            state.errorPassword = action.payload.error
        },
        setErrorEmail: (state, action: PayloadAction<{ error: boolean }>) => {
            state.errorEmail = action.payload.error
        },
        setErrorPasswordText: (
            state,
            action: PayloadAction<{ errorText: string }>
        ) => {
            state.errorPasswordText = action.payload.errorText
        },
        setIsLoading: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isLoading = action.payload.value
        },
    },
})

export const signupReducer = signupSlice.reducer
export const signupActions = signupSlice.actions
export const signupThunks = { sendSignUpRequest }

export const selectSignup = (state: RootState) => state.signup
