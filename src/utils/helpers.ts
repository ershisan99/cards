import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit'
import { useEffect, useMemo, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../state/store'
import { CardsType } from '../API/cardsAPI'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type ActionCreatorResponse<T extends (...args: any[]) => any> =
    ReturnType<ReturnType<T>>
type IsValidArg<T> = T extends object
    ? keyof T extends never
        ? false
        : true
    : true
export type ReplaceReturnType<T, TNewReturn> = T extends (a: infer A) => infer R
    ? IsValidArg<A> extends true
        ? (a: A) => TNewReturn
        : () => TNewReturn
    : never
export type RemapActionCreators<T extends ActionCreatorsMapObject> = {
    [K in keyof T]: ReplaceReturnType<T[K], ActionCreatorResponse<T[K]>>
}

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
    const dispatch = useAppDispatch()
    return useMemo(
        () => bindActionCreators<T, RemapActionCreators<T>>(actions, dispatch),
        [actions, dispatch]
    )
}

export function useDebounce(value: any, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(handler)
    }, [value, delay])

    return debouncedValue
}

export const getRandomCard = (cards: Array<CardsType>) => {
    const sum = cards.reduce(
        (acc, card) => acc + (6 - card.grade) * (6 - card.grade),
        0
    )
    const rand = Math.random() * sum
    const res = cards.reduce(
        (acc: { sum: number; id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
            return { sum: newSum, id: newSum < rand ? i : acc.id }
        },
        { sum: 0, id: -1 }
    )
    return cards[res.id + 1]
}
