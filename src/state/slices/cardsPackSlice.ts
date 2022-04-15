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
    async (payload: GetCardsType, { getState }) => {
        const state = getState() as RootState
        const isPersonalCardsPack = state.cardsPack.isPersonalCardsPack
        const user_id = state.user.user._id
        const finalPayload = isPersonalCardsPack
            ? { user_id, ...payload }
            : { ...payload }
        return await CardsPackAPI.getAllCards({
            ...finalPayload,
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
    isPersonalCardsPack: boolean | null
}

const getCardsPackSlice = createSlice({
    name: 'cards',
    initialState: {
        cardPacks: [],
        cardPacksTotalCount: 0,
        maxCardsCount: 10,
        minCardsCount: 0,
        page: 1,
        pageCount: 10,
        cardsPackName: '',
        isPersonalCardsPack: null,
        // search
        nameCards: '',
    } as InitialStateType,
    reducers: {
        addCardsPackTitle: (
            state,
            action: PayloadAction<{ cardsPackName: string }>
        ) => {
            state.cardsPackName = action.payload.cardsPackName
        },
        setPersonalCardsPack: (
            state,
            action: PayloadAction<{ isPersonalCardsPack: boolean }>
        ) => {
            state.isPersonalCardsPack = action.payload.isPersonalCardsPack
        },
    },
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
export const cardPackActions = getCardsPackSlice.actions
export const cardsPackThunks = {
    getCardsPack,
    setCardsPack,
    deleteCardsPack,
    updateCardsPack,
}
export const selectCardsPack = (state: RootState) => state.cardsPack
