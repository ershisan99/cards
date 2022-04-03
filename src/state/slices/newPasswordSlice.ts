import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SetNewPasswordArgs, UserAPI } from '../../API/userAPI'
import { RootState } from '../store'

export const sendNewPasswordRequest = createAsyncThunk(
    'newPassword/send',
    async (payload: SetNewPasswordArgs) => {
        return await UserAPI.setNewPassword({
            password: payload.password,
            resetPasswordToken: payload.resetPasswordToken,
        })
    }
)

const newPasswordSlice = createSlice({
    name: 'newPassword',
    initialState: {
        password: '',
    },
    reducers: {
        setPassword: (state, action: PayloadAction<{ password: string }>) => {
            state.password = action.payload.password
        },
    },
})

export const newPasswordReducer = newPasswordSlice.reducer
export const newPasswordActions = newPasswordSlice.actions
export const newPasswordThunks = { sendNewPasswordRequest }

export const selectNewPassword = (state: RootState) => state.newPassword
