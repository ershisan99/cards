import { createSlice } from '@reduxjs/toolkit'
import { MeRes } from '../../API/userAPI'
import { RootState } from '../store'
import { sendSignInRequest } from './signInSlice'

const signInSlice = createSlice({
    name: 'user',
    initialState: {
        user: {} as MeRes,
        isAuth: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendSignInRequest.fulfilled, (state, action) => {
            state.user = action.payload
            state.isAuth = !!state.user
        })
    },
})

export const userReducer = signInSlice.reducer
export const userActions = signInSlice.actions
export const userThunks = {}

export const selectUser = (state: RootState) => state.user
