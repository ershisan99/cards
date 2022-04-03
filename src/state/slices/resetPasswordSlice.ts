import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ForgotArgs, UserAPI } from '../../API/userAPI'
import { RootState } from '../store'

export const sendResetPasswordRequest = createAsyncThunk(
    'resetPassword/send',
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
        isLoading: false,
    },
    reducers: {
        setEmail: (state, action: PayloadAction<{ email: string }>) => {
            state.email = action.payload.email
        },
        setIsLoading: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isLoading = action.payload.value
        },
    },
})

export const resetPasswordReducer = resetPasswordSlice.reducer
export const resetPasswordActions = resetPasswordSlice.actions
export const resetPasswordThunks = { sendResetPasswordRequest }

export const selectResetPassword = (state: RootState) => state.resetPassword
