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

        const {
            isPersonalCardsPack,
            pageCount,
            minCardsCount,
            maxCardsCount,
            page,
        } = state.cardsPack
        const [min, max] = [minCardsCount, maxCardsCount]
        const user_id = state.user.user._id
        const finalPayload = isPersonalCardsPack
            ? {
                  user_id,
                  pageCount,
                  min,
                  max,
                  page,
                  ...payload,
              }
            : { pageCount, min, max, page, ...payload }
        return await CardsPackAPI.getAllCards({
            ...finalPayload,
        })
    }
)
export const setCardsPack = createAsyncThunk(
    'cards/setCardsPack',
    async (payload: SetCardsPackType) => {
        return await CardsPackAPI.setCardsPack({ ...payload })
    }
)
export const deleteCardsPack = createAsyncThunk(
    'cards/deleteCardsPack',
    async (payload: DeleteCardsPackType) => {
        return await CardsPackAPI.deleteCardsPack({ ...payload })
    }
)
export const updateCardsPack = createAsyncThunk(
    'cards/updateCardsPack',
    async (payload: UpdateCardsPackType) => {
        return await CardsPackAPI.updateCardsPack({ ...payload })
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
    nameCards: string
    isLoading: boolean
    search?: string
}

const getCardsPackSlice = createSlice({
    name: 'cards',
    initialState: {
        cardPacks: [],
        cardPacksTotalCount: 0,
        maxCardsCount: 100,
        minCardsCount: 0,
        page: 1,
        pageCount: 10,
        cardsPackName: '',
        isPersonalCardsPack: null,
        nameCards: '',
        isLoading: false,
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
        setMinMax: (
            state,
            action: PayloadAction<{
                minCardsCount: number
                maxCardsCount: number
            }>
        ) => {
            state.minCardsCount = action.payload.minCardsCount
            state.maxCardsCount = action.payload.maxCardsCount
        },
        setPage: (state, action: PayloadAction<{ page: number }>) => {
            state.page = action.payload.page
        },
        setPageCount: (state, action: PayloadAction<{ pageCount: number }>) => {
            state.pageCount = action.payload.pageCount
        },
        setSearch: (state, action: PayloadAction<{ search: string }>) => {
            state.search = action.payload.search
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCardsPack.fulfilled, (state, action) => {
            state.cardPacks = action.payload.cardPacks
            state.cardPacksTotalCount = action.payload.cardPacksTotalCount
            state.page = action.payload.page
            state.pageCount = action.payload.pageCount
            state.isLoading = false
        })
        builder.addCase(getCardsPack.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCardsPack.rejected, (state) => {
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
