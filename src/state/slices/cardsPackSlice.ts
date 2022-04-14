import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
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
    cardsPackName: string
    isPersonalCardsPack: boolean
    isLoading: boolean
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
        cardsPackName: '',
        isPersonalCardsPack: false,
        isLoading: false,
    } as InitialStateType,
    reducers: {
        addCardsPackTitle: (
            state,
            action: PayloadAction<{ cardsPackName: string }>
        ) => {
            state.cardsPackName = action.payload.cardsPackName
        },
        getPersonalCardsPack: (
            state,
            action: PayloadAction<{ isPersonalCardsPack: boolean }>
        ) => {
            state.isPersonalCardsPack = action.payload.isPersonalCardsPack
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCardsPack.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCardsPack.fulfilled, (state, action) => {
                state.cardPacks = action.payload.cardPacks
                state.cardPacksTotalCount = action.payload.cardPacksTotalCount
                state.maxCardsCount = action.payload.maxCardsCount
                state.minCardsCount = action.payload.minCardsCount
                state.page = action.payload.page
                state.pageCount = action.payload.pageCount
                state.isLoading = false
            })
            .addCase(getCardsPack.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const cardsPackReducer = getCardsPackSlice.reducer
export const cardPackActions = getCardsPackSlice.actions
export const cardsPackThunks = {
    getCardsPack,
    setCardsPack,
    deleteCardsPack,
    updateCardsPack,
}
export const selectCardsPack = (state: RootState) => state.cardsPack
