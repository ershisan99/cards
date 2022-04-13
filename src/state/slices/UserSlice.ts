import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MeRes, UserAPI } from '../../API/userAPI'
import { RootState } from '../store'
import { sendSignInRequest } from './signInSlice'

export const getMe = createAsyncThunk('user/getMe', async () => {
    return await UserAPI.getMe()
})
export const signOut = createAsyncThunk('user/signOut', async () => {
    return await UserAPI.signOut()
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
            .addCase(sendSignInRequest.pending, (state) => {
                state.isLoading = false
            })
            .addCase(sendSignInRequest.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuth = !!state.user
                state.isLoading = false
            })
            .addCase(getMe.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMe.rejected, (state) => {
                state.isLoading = false
                state.isAuth = false
            })
    },
})

export const userReducer = signInSlice.reducer
export const userActions = signInSlice.actions
export const userThunks = { getMe, signOut }

export const selectUser = (state: RootState) => state.user
