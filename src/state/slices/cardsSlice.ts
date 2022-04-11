import { createAsyncThunk } from '@reduxjs/toolkit'
import { CardsAPI, GetCardsType } from '../../API/cardsAPI'

export const getCards = createAsyncThunk(
    'cards/getCards',
    async (payload: GetCardsType) => {
        return await CardsAPI.getAllCards({
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
