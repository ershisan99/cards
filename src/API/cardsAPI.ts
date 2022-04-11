import { instance } from './instance'

export type GetCardsType = {
    packName?: string // english - default value
    min?: number
    max?: number
    sortPacks?: number // wtf? =0updated,
    page?: number
    pageCount?: number
    user_id?: string
}
export type CardsPackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: Date
    updated: Date
}
export type GetCardsResponseType = {
    cardPacks: Array<CardsPackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export const CardsAPI = {
    getAllCards: (args: GetCardsType) => {
        return instance.get(
            '/cards/pack' +
                (args.packName === null ? '' : `&packName=${args.packName}`) +
                (args.min === null ? '' : `&min=${args.min}`) +
                (args.max === null ? '' : `&max=${args.max}`) +
                (args.sortPacks === null
                    ? ''
                    : `&sortPacks=${args.sortPacks}`) +
                (args.page === null ? '' : `&page=${args.page}`) +
                (args.pageCount === null
                    ? ''
                    : `&pageCount=${args.pageCount}`) +
                (args.user_id === null ? '' : `&user_id=${args.user_id}`)
        )
    },
}
