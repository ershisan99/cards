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
export type GetCardsResponseType = {
    cardPacks: Array<CardsPackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export const CardsAPI = {
    getAllCards: (args: GetCardsType) => {
        return instance
            .get<GetCardsResponseType>(
                '/cards/pack' +
                    (args.packName === undefined
                        ? ''
                        : `&packName=${args.packName}`) +
                    (args.min === undefined ? '' : `&min=${args.min}`) +
                    (args.max === undefined ? '' : `&max=${args.max}`) +
                    (args.sortPacks === undefined
                        ? ''
                        : `&sortPacks=${args.sortPacks}`) +
                    (args.page === undefined ? '' : `&page=${args.page}`) +
                    (args.pageCount === undefined
                        ? ''
                        : `&pageCount=${args.pageCount}`) +
                    (args.user_id === undefined
                        ? ''
                        : `&user_id=${args.user_id}`)
            )
            .then((res) => res.data)
    },
    setCardsPack: (args: SetCardsPackType) => {
        return instance.post('/cards/pack', { args })
    },
    deleteCardsPack: (args: DeleteCardsPackType) => {
        return instance.delete(`cards/pack?${args.id}`)
    },
    updateCardsPack: (args: UpdateCardsPackType) => {
        return instance.put('/cards/pack', { args })
    },
}
