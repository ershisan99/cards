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
    },
    reducers: {
        setEmail: (state, action: PayloadAction<{ email: string }>) => {
            state.email = action.payload.email
        },
    },
})

export const resetPasswordReducer = resetPasswordSlice.reducer
export const resetPasswordActions = resetPasswordSlice.actions
export const resetPasswordThunks = { sendResetPasswordRequest }

export const selectResetPassword = (state: RootState) => state.resetPassword
