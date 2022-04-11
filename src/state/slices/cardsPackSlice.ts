import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    CardsPackAPI,
    CardsPackType,
    GetCardsType,
} from '../../API/cardsPackAPI'

export const getCards = createAsyncThunk(
    'cards/getCards',
    async (payload: GetCardsType) => {
        return await CardsPackAPI.getAllCards({
            packName: payload?.packName,
            min: payload?.min,
            max: payload?.max,
            sortPacks: payload?.sortPacks,
            page: payload?.page,
            pageCount: payload?.pageCount,
            user_id: payload?.user_id,
        })
    }
)

type InitialStateType = {
    cardPacks: Array<CardsPackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

const getCardsPackSlice = createSlice({
    name: 'cards',
    initialState: {
        cardPacks: [],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 0,
        pageCount: 0,
    } as InitialStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCards.fulfilled, (state, action) => {
            state.cardPacks = action.payload.cardPacks
            state.cardPacksTotalCount = action.payload.cardPacksTotalCount
            state.maxCardsCount = action.payload.maxCardsCount
            state.minCardsCount = action.payload.minCardsCount
            state.page = action.payload.page
            state.pageCount = action.payload.pageCount
        })
    },
})

export const cardsReducer = getCardsPackSlice.reducer
