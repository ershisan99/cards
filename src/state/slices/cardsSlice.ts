import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    AddCardType,
    CardsAPI,
    CardsType,
    DeleteCardType,
    GetCardType,
    UpdateCardType,
    UpdateGradeType,
} from '../../API/cardsAPI'
import { RootState } from '../store'

export const getCards = createAsyncThunk(
    'cards/getCards',
    async (payload: GetCardType, { getState }) => {
        const state = getState() as RootState
        const { pageCount, page } = state.cards
        const finalPayload = {
            pageCount,
            page,
            ...payload,
        }
        return await CardsAPI.getCards(finalPayload)
    }
)
export const addCard = createAsyncThunk(
    'cards/addCard',
    async (payload: AddCardType, { dispatch }) => {
        return await CardsAPI.addCard({ ...payload }).then(() =>
            dispatch(getCards({ cardsPack_id: payload.card.cardsPack_id }))
        )
    }
)
export const deleteCard = createAsyncThunk(
    'cards/deleteCard',
    async (payload: DeleteCardType) => {
        return await CardsAPI.deleteCard({ ...payload })
    }
)
export const updateCard = createAsyncThunk(
    'cards/updateCard',
    async (payload: UpdateCardType) => {
        return await CardsAPI.updateCard({ ...payload })
    }
)
export const updateGrade = createAsyncThunk(
    'cards/updateGrade',
    async (payload: UpdateGradeType) => {
        return await CardsAPI.updateCardGrade({ ...payload })
    }
)

type InitialStateType = {
    cards: Array<CardsType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    isLoading: boolean
    search: string
}

const cardsSlice = createSlice({
    name: 'cards',
    initialState: {
        isLoading: true,
        page: 1,
        pageCount: 10,
    } as InitialStateType,
    reducers: {
        updatedPage: (state, action: PayloadAction<{ page: number }>) => {
            state.page = action.payload.page
        },
        updatedPageCount: (
            state,
            action: PayloadAction<{ pageCount: number }>
        ) => {
            state.pageCount = action.payload.pageCount
        },
        updatedSearch: (state, action: PayloadAction<{ search: string }>) => {
            state.search = action.payload.search
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCards.fulfilled, (state, action) => {
            state.cards = action.payload.cards
            state.cardsTotalCount = action.payload.cardsTotalCount
            state.page = action.payload.page
            state.pageCount = action.payload.pageCount
            state.isLoading = false
            state.packUserId = action.payload.packUserId
        })
        builder.addCase(getCards.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCards.rejected, (state) => {
            state.isLoading = false
        })
    },
})

export const cardsReducer = cardsSlice.reducer
export const cardsActions = cardsSlice.actions
export const cardsThunks = {
    getCards,
    addCard,
    deleteCard,
    updateCard,
    updateGrade,
}
export const selectCards = (state: RootState) => state.cards
