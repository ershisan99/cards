import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ForgotArgs, UserAPI } from '../../API/userAPI'
import { RootState } from '../store'

export const sendResetPasswordRequest = createAsyncThunk(
    'signIn/send',
    async (payload: ForgotArgs) => {
        return await UserAPI.forgotPassword({
            email: payload.email,
            from: payload.from,
            message: payload.message,
        })
    }
)

const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState: {
        email: '',
        isMessageSent: false,
        isLoading: false,
    },
    reducers: {
        setEmail: (state, action: PayloadAction<{ email: string }>) => {
            state.email = action.payload.email
        },
        setIsMessageSent: (
            state,
            action: PayloadAction<{ isMessageSent: boolean }>
        ) => {
            state.isMessageSent = action.payload.isMessageSent
        },
        setIsLoading: (
            state,
            action: PayloadAction<{ isLoading: boolean }>
        ) => {
            state.isLoading = action.payload.isLoading
        },
    },
})

export const resetPasswordReducer = resetPasswordSlice.reducer
export const resetPasswordActions = resetPasswordSlice.actions
export const resetPasswordThunks = { sendResetPasswordRequest }

export const selectResetPassword = (state: RootState) => state.resetPassword
