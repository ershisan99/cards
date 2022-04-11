import { createAsyncThunk } from '@reduxjs/toolkit'
import { CardsAPI, GetCardsType } from '../../API/cardsAPI'

export const getCards = createAsyncThunk(
    'cards/getCards',
    async (payload: GetCardsType) => {
        return await CardsAPI.getAllCards(payload)
    }
)
