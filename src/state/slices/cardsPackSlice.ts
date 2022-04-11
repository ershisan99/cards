import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    CardsPackAPI,
    CardsPackType,
    DeleteCardsPackType,
    GetCardsType,
    SetCardsPackType,
    UpdateCardsPackType,
} from '../../API/cardsPackAPI'
import { RootState } from '../store'

export const getCardsPack = createAsyncThunk(
    'cards/getCardsPack',
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
export const setCardsPack = createAsyncThunk(
    'cards/setCardsPack',
    async (payload: SetCardsPackType) => {
        return await CardsPackAPI.setCardsPack({
            cardsPack: payload.cardsPack,
        })
    }
)
export const deleteCardsPack = createAsyncThunk(
    'cards/deleteCardsPack',
    async (payload: DeleteCardsPackType) => {
        return await CardsPackAPI.deleteCardsPack({
            id: payload.id,
        })
    }
)
export const updateCardsPack = createAsyncThunk(
    'cards/updateCardsPack',
    async (payload: UpdateCardsPackType) => {
        return await CardsPackAPI.updateCardsPack({
            cardsPack: payload.cardsPack,
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
        builder.addCase(getCardsPack.fulfilled, (state, action) => {
            state.cardPacks = action.payload.cardPacks
            state.cardPacksTotalCount = action.payload.cardPacksTotalCount
            state.maxCardsCount = action.payload.maxCardsCount
            state.minCardsCount = action.payload.minCardsCount
            state.page = action.payload.page
            state.pageCount = action.payload.pageCount
        })
    },
})

export const cardsPackReducer = getCardsPackSlice.reducer
export const selectCardsPack = (state: RootState) => state.cardsPack
