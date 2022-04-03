import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MeRes, UserAPI } from '../../API/userAPI'
import { RootState } from '../store'
import { sendSignInRequest } from './signInSlice'

export const GetMe = createAsyncThunk('user/getMe', async () => {
    return await UserAPI.getMe()
})

type InitialState = {
    user: MeRes
    isAuth: boolean
    isLoading: boolean
}
const signInSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: false,
        isLoading: true,
    } as InitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendSignInRequest.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuth = !!state.user
                state.isLoading = false
            })
            .addCase(GetMe.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuth = !!state.user
                state.isLoading = false
            })
            .addCase(sendSignInRequest.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(GetMe.pending, (state, action) => {
                state.isLoading = true
            })
    },
})

export const userReducer = signInSlice.reducer
export const userActions = signInSlice.actions
export const userThunks = { GetMe }

export const selectUser = (state: RootState) => state.user
