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
        password: '',
        confirmPassword: '',
    },
    reducers: {
        setEmail: (state, action: PayloadAction<{ email: string }>) => {
            state.email = action.payload.email
        },
        setPassword: (state, action: PayloadAction<{ password: string }>) => {
            state.password = action.payload.password
        },
        setConfirmPassword: (
            state,
            action: PayloadAction<{ confirmPassword: string }>
        ) => {
            state.confirmPassword = action.payload.confirmPassword
        },
    },
})

export const signupReducer = signupSlice.reducer
export const signupActions = signupSlice.actions
export const signupThunks = { sendSignUpRequest }

export const selectSignup = (state: RootState) => state.signup
