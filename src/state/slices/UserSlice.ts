import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MeRes, UserAPI } from '../../API/userAPI'
import { RootState } from '../store'
import { sendSignInRequest } from './signInSlice'

export const GetMe = createAsyncThunk('user/getMe', async () => {
    return await UserAPI.getMe()
})

const signInSlice = createSlice({
    name: 'user',
    initialState: {
        user: {} as MeRes,
        isAuth: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendSignInRequest.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuth = !!state.user
            })
            .addCase(GetMe.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuth = !!state.user
            })
    },
})

export const userReducer = signInSlice.reducer
export const userActions = signInSlice.actions
export const userThunks = { GetMe }

export const selectUser = (state: RootState) => state.user
