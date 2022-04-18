import { instance } from './instance'

export type GetCardType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: string
    pageCount?: string
}
export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: Date
    updated: Date
    _id: string
}
export type GetCardsResponseType = {
    card: Array<CardsType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type PostCardType = {
    cardsPack_id: string
    question?: string // если не отправить будет таким "no question"
    answer?: string // если не отправить будет таким 'no answer'
    grade?: number // 0..5, не обязателен
    shots?: number // не обязателен
    answerImg?: string // не обязателен
    questionImg?: string // не обязателен
    questionVideo?: string // не обязателен
    answerVideo?: string // не обязателен
}
export type SetCardType = {
    card: PostCardType
}
export type DeleteCardType = {
    id: string
}
export type PutCardType = {
    _id: string
    name?: string
    comments?: string
}
export type UpdateCardType = {
    card: PutCardType
}

export const CardsAPI = {
    getCard: (args: GetCardType) => {
        return instance
            .get<GetCardsResponseType>('/cards/card', { params: args })
            .then((res) => res.data)
    },
    setCard: (args: SetCardType) => {
        return instance.post('/cards/card', args)
    },
    deleteCard: (args: DeleteCardType) => {
        return instance.delete(`/cards/card`, { params: args })
    },
    updateCard: (args: UpdateCardType) => {
        return instance.put('/cards/card', args)
    },
}

// То, что приходит с бэка в результате setCard, deleteCard, updateCard - игнорируем
// и перезапрашиваем карточки заново
