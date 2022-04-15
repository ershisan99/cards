import { instance } from './instance'

export type GetCardsType = {
    packName?: string // english - default value
    min?: number
    max?: number
    sortPacks?: number // 0updated - default value,
    page?: number
    pageCount?: number
    user_id?: string
}
export type CardsPackType = {
    cardsCount: number
    created: Date
    deckCover: null | any
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: Date
    user_id: string
    user_name: string
    __v: number
    _id: string
}
export type GetCardsPackResponseType = {
    cardPacks: Array<CardsPackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type PostCardsPackType = {
    name?: string // если не отправить будет - "no Name"
    deckCover?: string // не обязателен
    private?: boolean // если не отправить будет - false
}
export type SetCardsPackType = {
    cardsPack: PostCardsPackType
}
export type DeleteCardsPackType = {
    id: string
}
export type PutCardsPackType = {
    _id: string
    name?: string
}
export type UpdateCardsPackType = {
    cardsPack: PutCardsPackType
}

export const CardsPackAPI = {
    getAllCards: (args: GetCardsType) => {
        return instance
            .get<GetCardsPackResponseType>('/cards/pack', {
                params: { ...args },
            })
            .then((res) => res.data)
    },
    setCardsPack: (args: SetCardsPackType) => {
        return instance.post('/cards/pack', args)
    },
    deleteCardsPack: (args: DeleteCardsPackType) => {
        return instance.delete(`cards/pack`, { params: { ...args } })
    },
    updateCardsPack: (args: UpdateCardsPackType) => {
        return instance.put('/cards/pack', args)
    },
}

// То, что приходит с бэка в результате setCardsPack, deleteCardsPack, updateCardsPack
// - игнорируем и перезапрашиваем колоды заново
